export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export type LotteryType = 'traditional' | 'baloto' | 'astro';

export interface LotteryResult {
  id: string;
  lotteryId: string;
  date: string;
  numbers: number[];  // Solo números principales (5 para Baloto)
  series?: string;
  prize?: string;
  createdAt: string;
  drawNumber?: string;
  // Campos específicos para Baloto/Revancha
  superbalota?: number;
  revancha?: number;
}

export interface Lottery {
  id: string;
  name: string;
  slug: string;
  shortName?: string;
  description: string;
  color: string;
  region: string;
  drawDays: string[];
  drawTime: string;
  numbersCount: number;
  hasSeries: boolean;
  isActive?: boolean;
  lotteryType?: LotteryType;
}

export interface LotteryWithResult extends Lottery {
  latestResult?: LotteryResult;
}
