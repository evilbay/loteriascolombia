import { LotteryResult, LotteryWithResult } from '@/types/lottery';
import { lotteries, getLotteryBySlug } from './lotteries';

// Mock data - En producción esto vendría de una API/base de datos
const mockResults: Record<string, LotteryResult> = {
  'loteria-de-bogota': { id: '1', lotteryId: 'loteria-de-bogota', date: new Date().toISOString().split('T')[0], numbers: [4, 5, 6, 7], series: '123', prize: '$12.000.000.000', createdAt: new Date().toISOString() },
  'loteria-de-medellin': { id: '2', lotteryId: 'loteria-de-medellin', date: new Date().toISOString().split('T')[0], numbers: [8, 9, 0, 1], series: '456', prize: '$8.000.000.000', createdAt: new Date().toISOString() },
  'baloto': { id: '3', lotteryId: 'baloto', date: new Date().toISOString().split('T')[0], numbers: [5, 12, 23, 34, 41, 43], prize: '$45.000.000.000', createdAt: new Date().toISOString() },
};

export async function getLatestResult(lotteryId: string): Promise<LotteryResult | null> {
  await new Promise(r => setTimeout(r, 50));
  return mockResults[lotteryId] || null;
}

export async function getLatestResults(): Promise<LotteryWithResult[]> {
  const results: LotteryWithResult[] = [];
  for (const lottery of lotteries) {
    const result = await getLatestResult(lottery.id);
    results.push({ ...lottery, latestResult: result || undefined });
  }
  return results;
}

export async function getLotteryWithResults(slug: string): Promise<LotteryWithResult | null> {
  const lottery = getLotteryBySlug(slug);
  if (!lottery) return null;
  const result = await getLatestResult(lottery.id);
  return { ...lottery, latestResult: result || undefined };
}

export async function getResultHistory(lotteryId: string): Promise<LotteryResult[]> {
  const latest = await getLatestResult(lotteryId);
  return latest ? [latest] : [];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatLotteryNumber(num: number): string {
  return num.toString().padStart(2, '0');
}
