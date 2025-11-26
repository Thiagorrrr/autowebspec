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