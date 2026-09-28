import {
  FoodProperties,
  StorageConditions,
  PackagingRequirements,
  RecommendationResult,
  MaterialScore,
  PackagingMaterial
} from '../types/packaging';
import { PACKAGING_MATERIALS } from '../data/materials';

export function runRecommendationEngine(
  foodProps: FoodProperties,
  storageProps: StorageConditions,
  requirements: PackagingRequirements
): RecommendationResult {
  const isFreshProduce =
    foodProps.category === 'Fruits' ||
    foodProps.category === 'Vegetables' ||
    foodProps.respirationRate === 'High';

  // Evaluate candidate materials
  const scoredMaterials: MaterialScore[] = PACKAGING_MATERIALS.map((mat) => {
    let score = 50;
    let moistureScore = 50;
    let oxygenScore = 50;
    let respirationScore = 50;
    let strengthScore = 50;
    let costScore = 50;
    let sustainabilityScore = 50;
    const matchReasons: string[] = [];

    // 1. Respiration & Breathability Match
    if (isFreshProduce && foodProps.respirationRate === 'High') {
      if (mat.breathability === 'Controlled' || mat.breathability === 'High') {
        respirationScore += 45;
        score += 35;
        matchReasons.push('Optimized controlled breathability for high produce respiration');
      } else if (mat.breathability === 'None') {
        respirationScore -= 30;
        score -= 25;
      }
    } else {
      if (mat.breathability === 'None') {
        respirationScore += 30;
        score += 15;
      } else {
        respirationScore -= 20;
        score -= 15;
      }
    }

    // 2. Moisture Barrier Match
    if (foodProps.moistureContent < 10) {
      // Dry product needs strong moisture barrier
      if (mat.moistureBarrier === 'High' || mat.moistureBarrier === 'Excellent') {
        moistureScore += 35;
        score += 25;
        matchReasons.push('High moisture barrier prevents sogginess in dry commodities');
      } else {
        moistureScore -= 25;
        score -= 20;
      }
    } else if (foodProps.moistureContent > 60) {
      if (mat.moistureBarrier === 'High' || mat.moistureBarrier === 'Excellent' || mat.moistureBarrier === 'Moderate') {
        moistureScore += 25;
        score += 15;
      }
    }

    // 3. Oil/Fat Content & Oxygen Barrier
    if (foodProps.oilFatContent > 10) {
      if (mat.oxygenBarrier === 'High' || mat.oxygenBarrier === 'Excellent') {
        oxygenScore += 35;
        score += 25;
        matchReasons.push('Superior oxygen barrier protects high-fat content from oxidative rancidity');
      } else {
        oxygenScore -= 25;
        score -= 20;
      }
    }

    // 4. Category Alignment
    if (mat.recommendedFoodTypes.includes(foodProps.category) || mat.recommendedFoodTypes.includes(foodProps.commodityName)) {
      score += 15;
      matchReasons.push(`Direct material match for ${foodProps.category}`);
    }

    // 5. Storage & Transportation Intensity
    if (storageProps.storageType === 'Frozen') {
      if (mat.tempSuitability.includes('-18') || mat.tempSuitability.includes('-20') || mat.tempSuitability.includes('-40')) {
        strengthScore += 25;
        score += 15;
      } else {
        score -= 30;
      }
    }

    if (storageProps.transportDuration > 48 || storageProps.handling === 'High') {
      if (mat.mechanicalStrength === 'High' || mat.mechanicalStrength === 'Very High') {
        strengthScore += 30;
        score += 20;
        matchReasons.push('High mechanical strength withstands long transport and rough handling');
      }
    }

    // 6. User Priority Weighting
    if (requirements.priority === 'Sustainability') {
      sustainabilityScore = mat.recyclabilityScore;
      score += (mat.recyclabilityScore - 50) * 0.4;
      if (mat.biodegradability) score += 15;
    } else if (requirements.priority === 'Shelf Life') {
      if (mat.oxygenBarrier === 'Excellent' || mat.moistureBarrier === 'Excellent' || mat.MAPSuitability) {
        score += 20;
      }
    } else if (requirements.priority === 'Cost') {
      if (mat.costLevel === 'Low') {
        costScore = 90;
        score += 25;
      } else if (mat.costLevel === 'Premium') {
        costScore = 30;
        score -= 20;
      }
    }

    // 7. Sustainability Preference
    if (requirements.sustainabilityPref === 'Biodegradable' || requirements.sustainabilityPref === 'Compostable') {
      if (mat.biodegradability) {
        score += 25;
        matchReasons.push('Fully satisfies biodegradable / compostable preference');
      }
    }

    // Clamp score between 45 and 98
    const finalScore = Math.min(98, Math.max(45, Math.round(score)));

    return {
      material: mat,
      compatibilityScore: finalScore,
      moistureScore: Math.min(100, Math.max(30, moistureScore)),
      oxygenScore: Math.min(100, Math.max(30, oxygenScore)),
      respirationScore: Math.min(100, Math.max(30, respirationScore)),
      strengthScore: Math.min(100, Math.max(30, strengthScore)),
      costScore: Math.min(100, Math.max(30, costScore)),
      sustainabilityScore: mat.recyclabilityScore,
      matchReason: matchReasons.length > 0 ? matchReasons.join('. ') + '.' : 'Good overall parameter alignment with product requirements.'
    };
  });

  // Sort by compatibility score
  scoredMaterials.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  const primary = scoredMaterials[0].material;
  const confidence = scoredMaterials[0].compatibilityScore;
  const alternatives = scoredMaterials.slice(1, 5);

  // Generate explainable AI text
  let whyText = '';
  if (isFreshProduce && foodProps.respirationRate === 'High') {
    whyText = `High-moisture and respiration-sensitive ${foodProps.commodityName} requires controlled gas exchange and moisture management. A ${primary.name} with micro-perforation or engineered breathability helps maintain the optimum equilibrium modified atmosphere (EMA) while reducing condensation and extending shelf life.`;
  } else if (foodProps.oilFatContent > 15) {
    whyText = `${foodProps.commodityName} has a high oil/fat content (${foodProps.oilFatContent}%), making it extremely vulnerable to oxygen oxidation and rancidity. ${primary.name} was selected because of its high oxygen barrier and light shielding properties, protecting taste and crispness.`;
  } else if (foodProps.moistureContent < 10) {
    whyText = `With a low moisture content of ${foodProps.moistureContent}%, ${foodProps.commodityName} requires high water vapor barrier packaging to prevent moisture uptake and textural degradation. ${primary.name} provides an optimal moisture barrier while supporting efficient sealing.`;
  } else {
    whyText = `${primary.name} provides the optimal balance of barrier properties, mechanical integrity, and thermal stability required for ${foodProps.commodityName} under ${storageProps.storageType.toLowerCase()} storage conditions.`;
  }

  // Generate Packaging Structure
  const packagingStructure = {
    outerLayer: primary.category.includes('Paper') ? 'FSC Kraft Paper (40 gsm)' : primary.category.includes('Biopolymer') ? 'Bio-PLA Print Layer' : 'Reverse Printed PET / BOPP',
    coreLayer: primary.breathability !== 'None' ? `${primary.name} (Micro-perforated)` : primary.moistureBarrier === 'Excellent' ? 'Metallized / Foil Barrier Core' : 'Polymer Barrier Co-extrusion',
    innerLayer: primary.biodegradability ? 'Bio-PE Sealant Layer' : 'Food-Grade Heat Sealable LLDPE',
    specialFeatures: isFreshProduce ? 'Laser Micro-perforations (100–150 μm diameter)' : 'Anti-fog & High Seal Integrity',
    thickness: primary.defaultThicknessMicrons,
    sealability: primary.sealability,
    mechanicalStrength: primary.mechanicalStrength,
    MAPSuitability: primary.MAPSuitability ? 'Recommended (O₂/CO₂ Tailored)' : 'Optional / Standard Flush'
  };

  // Technical Specs
  const specs = {
    OTR: isFreshProduce ? 'Controlled / Breathable (800–2,500 cc/m²/24h)' : foodProps.oilFatContent > 10 ? 'Ultra-Low (< 1.5 cc/m²/24h)' : 'Low–Moderate (20–50 cc/m²/24h)',
    WVTR: foodProps.moistureContent < 10 ? 'Ultra-Low (< 0.5 g/m²/24h)' : 'Low–Moderate (3–8 g/m²/24h)',
    thickness: primary.defaultThicknessMicrons,
    gasPermeability: primary.breathability === 'Controlled' || primary.breathability === 'High' ? 'Breathable / EMA Compatible' : 'High Barrier / Low Permeability',
    sealability: primary.sealability,
    mechanicalStrength: primary.mechanicalStrength,
    MAPSuitability: primary.MAPSuitability ? 'Recommended' : 'Optional'
  };

  // Decision Factors
  const decisionFactors = [
    { factor: 'Moisture Barrier Requirement', percentage: Math.min(95, Math.max(60, foodProps.moistureContent > 60 || foodProps.moistureContent < 10 ? 90 : 70)) },
    { factor: 'Breathability & Respiration Balance', percentage: isFreshProduce ? 92 : 35 },
    { factor: 'Shelf-Life Extension Target', percentage: Math.min(95, Math.round((foodProps.targetShelfLife / Math.max(1, foodProps.initialShelfLife)) * 45)) },
    { factor: 'Sustainability & Eco Impact', percentage: requirements.sustainabilityPref !== 'No preference' ? 88 : 65 },
    { factor: 'Mechanical & Transport Protection', percentage: storageProps.transportDuration > 36 ? 85 : 60 }
  ];

  // Key Drivers
  const keyDrivers = [
    `${foodProps.respirationRate} respiration rate commodity`,
    `${storageProps.storageType} storage condition (${storageProps.temperature}°C, ${storageProps.relativeHumidity}% RH)`,
    `Moisture level of ${foodProps.moistureContent}% and oil level of ${foodProps.oilFatContent}%`,
    `Priority focus on ${requirements.priority} and ${requirements.sustainabilityPref} packaging`
  ];

  // Shelf-Life Calculation
  const initial = foodProps.initialShelfLife;
  const factor = isFreshProduce ? 1.8 : foodProps.oilFatContent > 10 ? 2.5 : 2.0;
  const recommendedDays = Math.round(initial * factor);
  const percentageImprovement = Math.round(((recommendedDays - initial) / initial) * 100);

  // Sustainability Analysis
  const sScore = primary.recyclabilityScore;
  const sAnalysis = {
    overallScore: sScore,
    recyclability: `${primary.recyclabilityScore}% Recyclable Index`,
    biodegradability: primary.biodegradability ? '100% Industrial Compostable' : 'Non-biodegradable (Mechanical Recycling)',
    materialWeightEstimate: isFreshProduce ? '14.2 g / pack' : '18.5 g / pack',
    estimatedImpact: primary.biodegradability ? 'Low Carbon Footprint (-42% CO2e)' : 'Standard Carbon Footprint',
    plasticReductionPotential: primary.biodegradability ? 'High (Virgin Petroleum Plastic Eliminated)' : 'Moderate (Optimized Film Gauge)'
  };

  // Cost Analysis
  const baseCost = foodProps.category === 'Dairy' || foodProps.category === 'Meat' ? 6.5 : 4.2;
  const recommendedCostPerUnit = +(baseCost * (primary.costLevel === 'Low' ? 0.85 : primary.costLevel === 'Moderate' ? 1.0 : 1.25)).toFixed(2);
  const currentCostPerUnit = +(baseCost * 1.15).toFixed(2);
  const ecoAlternativeCostPerUnit = +(baseCost * 1.1).toFixed(2);
  const monthlySavings = Math.round((currentCostPerUnit - recommendedCostPerUnit) * 10000);

  const result: RecommendationResult = {
    id: 'REC-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString(),
    foodProperties: foodProps,
    storageConditions: storageProps,
    packagingRequirements: requirements,
    primaryRecommendation: primary,
    confidenceScore: confidence,
    alternativeRecommendations: alternatives,
    whyThisMaterial: whyText,
    packagingStructure,
    specs,
    decisionFactors,
    keyDrivers,
    freshProduceMode: isFreshProduce,
    freshProduceDetails: isFreshProduce
      ? {
          respiration: foodProps.respirationRate,
          packagingApproach: 'Breathable / Micro-perforated Equilibrium Modified Atmosphere',
          MAPRecommended: 'Recommended',
          illustrativeO2: '3–5% O₂',
          illustrativeCO2: '5–8% CO₂',
          illustrativeN2: 'Balance N₂ (~88%)'
        }
      : undefined,
    shelfLifePrediction: {
      currentDays: initial,
      recommendedDays,
      percentageImprovement
    },
    sustainabilityAnalysis: sAnalysis,
    costAnalysis: {
      currentCostPerUnit,
      recommendedCostPerUnit,
      ecoAlternativeCostPerUnit,
      monthlyEstimatedSavings: Math.max(1200, monthlySavings)
    }
  };

  return result;
}
