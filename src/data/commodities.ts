import { FoodProperties, StorageConditions, PackagingRequirements } from '../types/packaging';

export interface CommodityPreset {
  id: string;
  name: string;
  category: any;
  defaultFoodProps: FoodProperties;
  defaultStorageProps: StorageConditions;
  defaultRequirements: PackagingRequirements;
  description: string;
  iconName: string;
}

export const COMMODITY_PRESETS: CommodityPreset[] = [
  {
    id: 'alphonso-mango',
    name: 'Alphonso Mango',
    category: 'Fruits',
    description: 'High-value seasonal fresh mango with active respiration and high moisture sensitivity.',
    iconName: 'Apple',
    defaultFoodProps: {
      commodityName: 'Alphonso Mango',
      category: 'Fruits',
      moistureContent: 83,
      oilFatContent: 0.5,
      pH: 4.0,
      respirationRate: 'High',
      initialShelfLife: 10,
      targetShelfLife: 18
    },
    defaultStorageProps: {
      storageType: 'Chilled',
      temperature: 13,
      relativeHumidity: 90,
      transportDuration: 48,
      transportCondition: 'Cold Chain',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Balanced',
      preferredType: 'Film',
      sustainabilityPref: 'Biodegradable'
    }
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'Vegetables',
    description: 'Perishable fresh vegetable highly prone to moisture loss and chilling injury.',
    iconName: 'Carrot',
    defaultFoodProps: {
      commodityName: 'Tomato',
      category: 'Vegetables',
      moistureContent: 94,
      oilFatContent: 0.2,
      pH: 4.3,
      respirationRate: 'High',
      initialShelfLife: 7,
      targetShelfLife: 15
    },
    defaultStorageProps: {
      storageType: 'Chilled',
      temperature: 12,
      relativeHumidity: 88,
      transportDuration: 24,
      transportCondition: 'Refrigerated',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Shelf Life',
      preferredType: 'Film',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'Vegetables',
    description: 'Starchy tuber requiring light barrier to prevent greening and moisture management against rotting.',
    iconName: 'Sparkles',
    defaultFoodProps: {
      commodityName: 'Potato',
      category: 'Vegetables',
      moistureContent: 79,
      oilFatContent: 0.1,
      pH: 5.6,
      respirationRate: 'Medium',
      initialShelfLife: 30,
      targetShelfLife: 90
    },
    defaultStorageProps: {
      storageType: 'Ambient',
      temperature: 20,
      relativeHumidity: 75,
      transportDuration: 72,
      transportCondition: 'Normal',
      handling: 'High'
    },
    defaultRequirements: {
      priority: 'Cost',
      preferredType: 'Bag',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'basmati-rice',
    name: 'Basmati Rice',
    category: 'Grains',
    description: 'Aromatic long-grain dry rice vulnerable to moisture absorption, pests, and loss of aroma.',
    iconName: 'Wheat',
    defaultFoodProps: {
      commodityName: 'Basmati Rice',
      category: 'Grains',
      moistureContent: 12,
      oilFatContent: 0.8,
      pH: 6.5,
      respirationRate: 'Low',
      initialShelfLife: 180,
      targetShelfLife: 365
    },
    defaultStorageProps: {
      storageType: 'Ambient',
      temperature: 25,
      relativeHumidity: 60,
      transportDuration: 120,
      transportCondition: 'Normal',
      handling: 'High'
    },
    defaultRequirements: {
      priority: 'Balanced',
      preferredType: 'Pouch',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'wheat',
    name: 'Wheat Grain',
    category: 'Grains',
    description: 'Staple cereal grain requiring robust insect-proof moisture barrier during storage.',
    iconName: 'Wheat',
    defaultFoodProps: {
      commodityName: 'Wheat Grain',
      category: 'Grains',
      moistureContent: 11,
      oilFatContent: 1.5,
      pH: 6.2,
      respirationRate: 'Low',
      initialShelfLife: 180,
      targetShelfLife: 365
    },
    defaultStorageProps: {
      storageType: 'Ambient',
      temperature: 28,
      relativeHumidity: 55,
      transportDuration: 96,
      transportCondition: 'Normal',
      handling: 'High'
    },
    defaultRequirements: {
      priority: 'Cost',
      preferredType: 'Bag',
      sustainabilityPref: 'No preference'
    }
  },
  {
    id: 'milk',
    name: 'Fresh Pasteurized Milk',
    category: 'Dairy',
    description: 'Highly perishable liquid dairy product susceptible to light degradation and bacterial growth.',
    iconName: 'Milk',
    defaultFoodProps: {
      commodityName: 'Fresh Pasteurized Milk',
      category: 'Dairy',
      moistureContent: 88,
      oilFatContent: 3.8,
      pH: 6.7,
      respirationRate: 'Low',
      initialShelfLife: 2,
      targetShelfLife: 7
    },
    defaultStorageProps: {
      storageType: 'Chilled',
      temperature: 4,
      relativeHumidity: 85,
      transportDuration: 12,
      transportCondition: 'Cold Chain',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Shelf Life',
      preferredType: 'Container',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'paneer',
    name: 'Fresh Paneer (Cottage Cheese)',
    category: 'Dairy',
    description: 'Moist Indian cottage cheese requiring strict oxygen exclusion and chilled supply chain.',
    iconName: 'Package',
    defaultFoodProps: {
      commodityName: 'Fresh Paneer',
      category: 'Dairy',
      moistureContent: 54,
      oilFatContent: 22,
      pH: 5.8,
      respirationRate: 'Low',
      initialShelfLife: 5,
      targetShelfLife: 15
    },
    defaultStorageProps: {
      storageType: 'Chilled',
      temperature: 4,
      relativeHumidity: 85,
      transportDuration: 24,
      transportCondition: 'Cold Chain',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Shelf Life',
      preferredType: 'Flexible',
      sustainabilityPref: 'Balanced' as any
    }
  },
  {
    id: 'potato-chips',
    name: 'Fried Potato Chips',
    category: 'Snacks',
    description: 'High-fat crispy snack susceptible to rancidity from oxygen and sogginess from moisture.',
    iconName: 'Cookie',
    defaultFoodProps: {
      commodityName: 'Potato Chips',
      category: 'Snacks',
      moistureContent: 2,
      oilFatContent: 35,
      pH: 6.0,
      respirationRate: 'Low',
      initialShelfLife: 60,
      targetShelfLife: 180
    },
    defaultStorageProps: {
      storageType: 'Ambient',
      temperature: 28,
      relativeHumidity: 65,
      transportDuration: 48,
      transportCondition: 'Normal',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Shelf Life',
      preferredType: 'Pouch',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'biscuits',
    name: 'Butter Biscuits',
    category: 'Bakery',
    description: 'Dry baked snack vulnerable to moisture absorption, breakage, and fat oxidation.',
    iconName: 'Cookie',
    defaultFoodProps: {
      commodityName: 'Butter Biscuits',
      category: 'Bakery',
      moistureContent: 3.5,
      oilFatContent: 18,
      pH: 6.8,
      respirationRate: 'Low',
      initialShelfLife: 90,
      targetShelfLife: 180
    },
    defaultStorageProps: {
      storageType: 'Ambient',
      temperature: 25,
      relativeHumidity: 60,
      transportDuration: 72,
      transportCondition: 'Normal',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Balanced',
      preferredType: 'Flexible',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'fish',
    name: 'Fresh Marine Fish Fillet',
    category: 'Fish',
    description: 'Ultra-perishable high-protein seafood requiring sub-zero temperature control and gas barrier.',
    iconName: 'Fish',
    defaultFoodProps: {
      commodityName: 'Fresh Marine Fish Fillet',
      category: 'Fish',
      moistureContent: 78,
      oilFatContent: 4.5,
      pH: 6.4,
      respirationRate: 'Low',
      initialShelfLife: 3,
      targetShelfLife: 12
    },
    defaultStorageProps: {
      storageType: 'Chilled',
      temperature: 1,
      relativeHumidity: 92,
      transportDuration: 36,
      transportCondition: 'Cold Chain',
      handling: 'High'
    },
    defaultRequirements: {
      priority: 'Shelf Life',
      preferredType: 'Tray',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'chicken',
    name: 'Fresh Dressed Chicken',
    category: 'Meat',
    description: 'Perishable poultry meat vulnerable to microbial proliferation, lipid oxidation, and drip loss.',
    iconName: 'Drumstick',
    defaultFoodProps: {
      commodityName: 'Fresh Dressed Chicken',
      category: 'Meat',
      moistureContent: 75,
      oilFatContent: 8.0,
      pH: 6.1,
      respirationRate: 'Low',
      initialShelfLife: 4,
      targetShelfLife: 10
    },
    defaultStorageProps: {
      storageType: 'Chilled',
      temperature: 2,
      relativeHumidity: 90,
      transportDuration: 24,
      transportCondition: 'Cold Chain',
      handling: 'High'
    },
    defaultRequirements: {
      priority: 'Shelf Life',
      preferredType: 'Tray',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'spices',
    name: 'Ground Red Chili Powder',
    category: 'Processed Foods',
    description: 'Volatile spice powder sensitive to aroma loss, moisture caking, and color oxidation.',
    iconName: 'Flame',
    defaultFoodProps: {
      commodityName: 'Ground Red Chili Powder',
      category: 'Processed Foods',
      moistureContent: 8.5,
      oilFatContent: 12,
      pH: 5.4,
      respirationRate: 'Low',
      initialShelfLife: 180,
      targetShelfLife: 365
    },
    defaultStorageProps: {
      storageType: 'Ambient',
      temperature: 26,
      relativeHumidity: 60,
      transportDuration: 96,
      transportCondition: 'Normal',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Shelf Life',
      preferredType: 'Pouch',
      sustainabilityPref: 'Recyclable'
    }
  },
  {
    id: 'groundnuts',
    name: 'Roasted Groundnuts (Peanuts)',
    category: 'Pulses',
    description: 'Oil-rich nut susceptible to rancidity and moisture uptake during extended storage.',
    iconName: 'Nut',
    defaultFoodProps: {
      commodityName: 'Roasted Groundnuts',
      category: 'Pulses',
      moistureContent: 4.0,
      oilFatContent: 48,
      pH: 6.3,
      respirationRate: 'Low',
      initialShelfLife: 90,
      targetShelfLife: 180
    },
    defaultStorageProps: {
      storageType: 'Ambient',
      temperature: 25,
      relativeHumidity: 55,
      transportDuration: 48,
      transportCondition: 'Normal',
      handling: 'Medium'
    },
    defaultRequirements: {
      priority: 'Balanced',
      preferredType: 'Pouch',
      sustainabilityPref: 'Recyclable'
    }
  }
];
