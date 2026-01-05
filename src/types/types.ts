export type StageType = 'stock' | 'stage1' | 'stage2' | 'stage3';

export interface Participant {
  tempId: number;
  id: string;
  stage: StageType;
}

export interface RaceResult extends Participant {
  name: string;
  version: string;
  time: number;
  speed: number;
}

export type EquipmentItems = Record<string, boolean>;

export type EquipmentCategoryKey =
  | "Tecnologia e Conectividade"
  | "Assistentes de Condução (ADAS)"
  | "Segurança"
  | "Conforto"
  | "Visibilidade"
  | "Exterior"
  | "Performance"
  | "Itens Gerais";

export type CarEquipment = Record<EquipmentCategoryKey, EquipmentItems>;


export interface CarSpecsData {
  hp: number;
  torque: number;
  zeroToHundred: number;
}

interface CarSpecs {
  stock: CarSpecsData;
  stage1: CarSpecsData;
  stage2: CarSpecsData;
  stage3: CarSpecsData;
}


export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  category: 'Lançamento' | 'Review' | 'Tech' | 'Mercado';
  image: string;
  author: string;
  authorRole: string;
  readTime: string;
}


export interface CarEngine {
  displacement: string | null;
  cylinders: number | null;
  aspiration: string | null;
  powerHp: number | null;
  torqueKgfM: number | null;
  injection: string | null;
  valves: number | null;
  powerRpm: string | null;
  torqueRpm: string | null;
  engineCode: string | null;
}

export interface CarTransmissionDetails {
  type: string | null;
  gears: string | null;
  traction: string | null;
}

export interface CarDimensions {
  length: number | null;
  width: number | null;
  height: number | null;
  wheelbase: number | null;
  trunkCapacity: number | null;
}

export interface CarCapacity {
  fuelTank: number | null;
  payload: number | null;
}


export interface CarConsumption {
  cityGasoline: string | null;
  highwayGasoline: string | null;
  cityEthanol: string | null;
  highwayEthanol: string | null;
}

export interface CarEmissions {
  standard: string | null;
  co2: string | null;
}

export interface CarWarranty {
  manufacturer: string | null;
  drivetrain: string | null;
}

export interface CarPerformance {
  traction: string | null;
  zeroToHundred: number | null;
  topSpeed: number | null;
  powerToWeight: number | null;
  torqueToWeight: number | null;
}
export interface CarSuspension {
  front: string | null;
  rear: string | null;
}

export interface CarBreaks {
  front: string | null;
  rear: string | null;
}
export interface CarTires {
  front: string | null;
  rear: string | null;
  wheelSize: number | null;
}

export interface Car {
  id: string;

  // Identidade
  make: string;
  model: string;
  version: string;
  year: number;
  category: string;

  // Mercado
  price: number;
  fipe: string;

  // Gerais
  weight: number;
  fuel?: string;
  doors?: number;
  seats?: number;
  origin?: string;
  assembly?: string;
  description?: string;
  releaseDate?: string;
  status?: 'active' | 'inactive';
  schemaType?: 'Car';

  // Mídia
  image: string;
  photos: string[];

  // Performance / Tuning
  specs: CarSpecs;

  //  Performance dinâmica 
  performance?: CarPerformance;

  // Novos blocos técnicos
  engine?: CarEngine;
  transmissionDetails?: CarTransmissionDetails;
  dimensions?: CarDimensions;
  capacity?: CarCapacity;
  consumption?: CarConsumption;
  emissions?: CarEmissions;
  warranty?: CarWarranty;
  suspension?: CarSuspension;
  brakes?: CarBreaks;
  tires?: CarTires;

  // Conteúdo
  equipment: CarEquipment;
  chronic: string[];
  colors?: string[];
}
