export interface LotteryResult {
  id: string;
  lotteryId: string;
  date: string;
  numbers: number[];
  series?: string;
  prize?: string;
  createdAt: string;
  drawNumber?: string;
}

export type LotteryType = 'traditional' | 'baloto' | 'astro';

export interface Lottery {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  description: string;
  drawDays: DayOfWeek[];
  drawTime: string;
  color: string;
  region: string;
  numbersCount: number;
  hasSeries: boolean;
  isActive: boolean;
  lotteryType?: LotteryType; // Nuevo campo para determinar el tipo de visualización
}

export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export interface LotteryWithResult extends Lottery {
  latestResult?: LotteryResult;
}
