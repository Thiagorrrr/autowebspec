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


export interface Car {
  id: string;
  make: string;
  model: string;
  version: string;
  year: number;
  category: string;
  price: number;
  fipe: string;
  weight: number;
  specs: CarSpecs;
  equipment: CarEquipment;
  chronic: string[];
  image: string;
  photos: string[];
}