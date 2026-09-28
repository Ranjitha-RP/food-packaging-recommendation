export type RespirationRate = 'Low' | 'Medium' | 'High';
export type StorageType = 'Ambient' | 'Chilled' | 'Frozen';
export type TransportCondition = 'Normal' | 'Refrigerated' | 'Cold Chain' | 'Frozen Chain';
export type HandlingType = 'Low' | 'Medium' | 'High';
export type PackagingPriority = 'Shelf Life' | 'Cost' | 'Sustainability' | 'Balanced';
export type PackagingType = 'Flexible' | 'Rigid' | 'Tray' | 'Pouch' | 'Film' | 'Bag' | 'Container';
export type SustainabilityPreference = 'No preference' | 'Recyclable' | 'Biodegradable' | 'Compostable' | 'Maximum sustainability';

export type FoodCategory =
  | 'Fruits'
  | 'Vegetables'
  | 'Dairy'
  | 'Meat'
  | 'Fish'
  | 'Grains'
  | 'Pulses'
  | 'Bakery'
  | 'Snacks'
  | 'Processed Foods'
  | 'Custom Product';

export interface FoodProperties {
  commodityName: string;
  category: FoodCategory;
  moistureContent: number; // %
  oilFatContent: number; // %
  pH: number;
  respirationRate: RespirationRate;
  initialShelfLife: number; // days
  targetShelfLife: number; // days
}

export interface StorageConditions {
  storageType: StorageType;
  temperature: number; // °C
  relativeHumidity: number; // %
  transportDuration: number; // hours
  transportCondition: TransportCondition;
  handling: HandlingType;
}

export interface PackagingRequirements {
  priority: PackagingPriority;
  preferredType: PackagingType;
  sustainabilityPref: SustainabilityPreference;
}

export interface PackagingMaterial {
  id: string;
  name: string;
  category: string;
  description: string;
  moistureBarrier: 'Low' | 'Moderate' | 'High' | 'Excellent';
  oxygenBarrier: 'Low' | 'Moderate' | 'High' | 'Excellent';
  breathability: 'None' | 'Low' | 'Controlled' | 'High';
  mechanicalStrength: 'Low' | 'Medium' | 'High' | 'Very High';
  sealability: 'Fair' | 'Good' | 'Excellent';
  sustainability: 'Low' | 'Medium' | 'High' | 'Very High';
  costLevel: 'Low' | 'Moderate' | 'High' | 'Premium';
  tempSuitability: string;
  MAPSuitability: boolean;
  recommendedFoodTypes: string[];
  defaultThicknessMicrons: string;
  recyclabilityScore: number; // 0 - 100
  biodegradability: boolean;
  barrierNotes: string;
}

export interface MaterialScore {
  material: PackagingMaterial;
  compatibilityScore: number; // 0 - 100
  moistureScore: number;
  oxygenScore: number;
  respirationScore: number;
  strengthScore: number;
  costScore: number;
  sustainabilityScore: number;
  matchReason: string;
}

export interface PackagingStructure {
  outerLayer: string;
  coreLayer: string;
  innerLayer: string;
  specialFeatures: string;
  thickness: string;
  sealability: string;
  mechanicalStrength: string;
  MAPSuitability: string;
}

export interface TechnicalSpecs {
  OTR: string;
  WVTR: string;
  thickness: string;
  gasPermeability: string;
  sealability: string;
  mechanicalStrength: string;
  MAPSuitability: string;
}

export interface DecisionFactor {
  factor: string;
  percentage: number;
}

export interface FreshProduceDetails {
  respiration: string;
  packagingApproach: string;
  MAPRecommended: string;
  illustrativeO2: string;
  illustrativeCO2: string;
  illustrativeN2: string;
}

export interface ShelfLifePrediction {
  currentDays: number;
  recommendedDays: number;
  percentageImprovement: number;
}

export interface SustainabilityAnalysis {
  overallScore: number;
  recyclability: string;
  biodegradability: string;
  materialWeightEstimate: string;
  estimatedImpact: string;
  plasticReductionPotential: string;
}

export interface CostAnalysis {
  currentCostPerUnit: number;
  recommendedCostPerUnit: number;
  ecoAlternativeCostPerUnit: number;
  monthlyEstimatedSavings: number;
}

export interface RecommendationResult {
  id: string;
  timestamp: string;
  foodProperties: FoodProperties;
  storageConditions: StorageConditions;
  packagingRequirements: PackagingRequirements;
  primaryRecommendation: PackagingMaterial;
  confidenceScore: number;
  alternativeRecommendations: MaterialScore[];
  whyThisMaterial: string;
  packagingStructure: PackagingStructure;
  specs: TechnicalSpecs;
  decisionFactors: DecisionFactor[];
  keyDrivers: string[];
  freshProduceMode: boolean;
  freshProduceDetails?: FreshProduceDetails;
  shelfLifePrediction: ShelfLifePrediction;
  sustainabilityAnalysis: SustainabilityAnalysis;
  costAnalysis: CostAnalysis;
}

export interface HistoryRecord {
  id: string;
  productName: string;
  category: FoodCategory;
  storageType: StorageType;
  recommendedMaterial: string;
  shelfLife: string;
  sustainability: 'High' | 'Medium' | 'Low';
  confidence: number;
  date: string;
  fullRecommendation?: RecommendationResult;
}
