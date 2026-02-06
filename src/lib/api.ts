import { LotteryResult, LotteryWithResult } from '@/types/lottery';
import { lotteries, getLotteryBySlug } from './lotteries';
import { supabase, DbResult } from './supabase';

// Mapeo de IDs del frontend a IDs de la base de datos
const frontendToDbMapping: Record<string, string[]> = {
  'baloto': ['baloto'],
  'baloto-revancha': ['baloto-revancha'],
  'loteria-de-bogota': ['loteria-bogota', 'bogota'],
  'loteria-de-medellin': ['loteria-medellin', 'medellin'],
  'loteria-de-cundinamarca': ['loteria-cundinamarca', 'cundinamarca'],
  'loteria-cruz-roja': ['cruz-roja'],
  'loteria-del-valle': ['loteria-valle', 'valle'],
  'loteria-de-boyaca': ['loteria-boyaca', 'boyaca'],
  'loteria-de-santander': ['loteria-santander', 'santander'],
  'loteria-del-cauca': ['loteria-cauca', 'cauca'],
  'loteria-del-huila': ['loteria-huila', 'huila'],
  'loteria-de-manizales': ['loteria-manizales', 'manizales'],
  'loteria-del-meta': ['loteria-meta', 'meta'],
  'loteria-del-quindio': ['loteria-quindio', 'quindio'],
  'loteria-de-risaralda': ['loteria-risaralda', 'risaralda'],
  'loteria-del-tolima': ['loteria-tolima', 'tolima'],
};

function convertDbResultToLotteryResult(dbResult: DbResult, frontendLotteryId: string): LotteryResult {
  // Números principales (sin superbalota/revancha)
  const numbers = [...(dbResult.numbers.main || [])];
  
  return {
    id: dbResult.id.toString(),
    lotteryId: frontendLotteryId,
    date: dbResult.draw_date,
    numbers,  // Solo los 5 números principales
    series: dbResult.numbers.series,
    prize: undefined,
    createdAt: dbResult.created_at,
    drawNumber: dbResult.draw_number,
    // Campos específicos para Baloto/Revancha
    superbalota: dbResult.numbers.superbalota,
    revancha: dbResult.numbers.revancha,
  };
}

export async function getLatestResult(lotteryId: string): Promise<LotteryResult | null> {
  try {
    // Obtener los posibles IDs de base de datos para este ID de frontend
    const dbIds = frontendToDbMapping[lotteryId] || [lotteryId];
    
    // Buscar en Supabase
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .in('lottery_id', dbIds)
      .order('draw_date', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.log(`No result found for ${lotteryId}:`, error?.message);
      return null;
    }

    return convertDbResultToLotteryResult(data as DbResult, lotteryId);
  } catch (err) {
    console.error(`Error fetching result for ${lotteryId}:`, err);
    return null;
  }
}

export async function getLatestResults(): Promise<LotteryWithResult[]> {
  const results: LotteryWithResult[] = [];
  
  // Obtener todos los resultados más recientes de Supabase
  const { data: dbResults, error } = await supabase
    .from('results')
    .select('*')
    .order('draw_date', { ascending: false });

  if (error) {
    console.error('Error fetching results:', error);
    // Retornar loterías sin resultados en caso de error
    return lotteries.map(lottery => ({ ...lottery, latestResult: undefined }));
  }

  // Crear un mapa de resultados más recientes por lottery_id de DB
  const latestByDbId = new Map<string, DbResult>();
  for (const result of (dbResults || [])) {
    if (!latestByDbId.has(result.lottery_id)) {
      latestByDbId.set(result.lottery_id, result);
    }
  }

  // Mapear cada lotería del frontend a su resultado
  for (const lottery of lotteries) {
    const dbIds = frontendToDbMapping[lottery.id] || [lottery.id];
    let latestResult: LotteryResult | undefined;

    // Buscar el resultado más reciente entre los posibles IDs de DB
    for (const dbId of dbIds) {
      const dbResult = latestByDbId.get(dbId);
      if (dbResult) {
        latestResult = convertDbResultToLotteryResult(dbResult, lottery.id);
        break;
      }
    }

    results.push({ ...lottery, latestResult });
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
  try {
    const dbIds = frontendToDbMapping[lotteryId] || [lotteryId];
    
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .in('lottery_id', dbIds)
      .order('draw_date', { ascending: false })
      .limit(30);

    if (error || !data) {
      return [];
    }

    return data.map(dbResult => convertDbResultToLotteryResult(dbResult as DbResult, lotteryId));
  } catch (err) {
    console.error(`Error fetching history for ${lotteryId}:`, err);
    return [];
  }
}

export async function getFullResultHistory(lotteryId: string): Promise<LotteryResult[]> {
  try {
    const dbIds = frontendToDbMapping[lotteryId] || [lotteryId];
    
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .in('lottery_id', dbIds)
      .order('draw_date', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map(dbResult => convertDbResultToLotteryResult(dbResult as DbResult, lotteryId));
  } catch (err) {
    console.error(`Error fetching full history for ${lotteryId}:`, err);
    return [];
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CO', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function formatLotteryNumber(num: number): string {
  return num.toString().padStart(2, '0');
}
// Force redeploy Sat Jan 31 23:20:50 UTC 2026
// force deploy Sat Jan 31 23:23:17 UTC 2026
