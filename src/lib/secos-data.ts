// Datos mock para desarrollo - Serán reemplazados por Supabase
import { Seco, Aproximacion, PlanPremios, SecoNivel, TipoAproximacion } from '@/types/secos';

// Plan de premios por defecto para loterías tradicionales
export const planPremiosDefault: Omit<PlanPremios, 'lotteryId' | 'lotteryName'> = {
  precioBillete: 15000,
  fraccionMinima: 3000,
  premioMayor: 8000000000, // $8 mil millones
  secos: [
    { nivel: 'super_seco', nombre: 'Super Seco', cantidad: 1, premio: 1000000000 },
    { nivel: 'seco_700', nombre: 'Secos $700M', cantidad: 2, premio: 700000000 },
    { nivel: 'seco_500', nombre: 'Secos $500M', cantidad: 3, premio: 500000000 },
    { nivel: 'seco_300', nombre: 'Secos $300M', cantidad: 5, premio: 300000000 },
    { nivel: 'seco_200', nombre: 'Secos $200M', cantidad: 10, premio: 200000000 },
    { nivel: 'seco_100', nombre: 'Secos $100M', cantidad: 20, premio: 100000000 },
  ],
  aproximaciones: [
    { tipo: 'tres_ultimas', descripcion: 'Tres últimas cifras iguales', premio: 70000, coincidencias: 'XXX' },
    { tipo: 'dos_ultimas', descripcion: 'Dos últimas cifras iguales', premio: 7000, coincidencias: 'XX' },
    { tipo: 'ultima_cifra', descripcion: 'Última cifra igual', premio: 700, coincidencias: 'X' },
  ],
};

// Planes de premios específicos por lotería
export const planesPremios: Record<string, PlanPremios> = {
  'loteria-de-bogota': {
    lotteryId: 'loteria-de-bogota',
    lotteryName: 'Lotería de Bogotá',
    precioBillete: 18000,
    fraccionMinima: 3000,
    premioMayor: 12000000000,
    secos: [
      { nivel: 'super_seco', nombre: 'Super Seco', cantidad: 1, premio: 1500000000 },
      { nivel: 'seco_700', nombre: 'Secos Mayores', cantidad: 2, premio: 800000000 },
      { nivel: 'seco_500', nombre: 'Secos Intermedios', cantidad: 4, premio: 500000000 },
      { nivel: 'seco_300', nombre: 'Secos Menores', cantidad: 6, premio: 300000000 },
      { nivel: 'seco_200', nombre: 'Mini Secos', cantidad: 12, premio: 200000000 },
      { nivel: 'seco_100', nombre: 'Micro Secos', cantidad: 25, premio: 100000000 },
    ],
    aproximaciones: [
      { tipo: 'tres_ultimas', descripcion: 'Tres últimas cifras', premio: 80000, coincidencias: 'XXX' },
      { tipo: 'dos_ultimas', descripcion: 'Dos últimas cifras', premio: 8000, coincidencias: 'XX' },
      { tipo: 'ultima_cifra', descripcion: 'Última cifra', premio: 800, coincidencias: 'X' },
    ],
  },
  'loteria-de-medellin': {
    lotteryId: 'loteria-de-medellin',
    lotteryName: 'Lotería de Medellín',
    precioBillete: 15000,
    fraccionMinima: 2500,
    premioMayor: 10000000000,
    secos: [
      { nivel: 'super_seco', nombre: 'Super Seco', cantidad: 1, premio: 1200000000 },
      { nivel: 'seco_700', nombre: 'Secos $700M', cantidad: 2, premio: 700000000 },
      { nivel: 'seco_500', nombre: 'Secos $500M', cantidad: 3, premio: 500000000 },
      { nivel: 'seco_300', nombre: 'Secos $300M', cantidad: 5, premio: 300000000 },
      { nivel: 'seco_200', nombre: 'Secos $200M', cantidad: 10, premio: 200000000 },
      { nivel: 'seco_100', nombre: 'Secos $100M', cantidad: 20, premio: 100000000 },
    ],
    aproximaciones: [
      { tipo: 'tres_ultimas', descripcion: 'Tres últimas cifras', premio: 70000, coincidencias: 'XXX' },
      { tipo: 'dos_ultimas', descripcion: 'Dos últimas cifras', premio: 7000, coincidencias: 'XX' },
      { tipo: 'ultima_cifra', descripcion: 'Última cifra', premio: 700, coincidencias: 'X' },
    ],
  },
};

// Precios aproximados por lotería (para mostrar en tarjetas)
export const preciosLoterias: Record<string, { billete: number; fraccion: number }> = {
  'baloto': { billete: 5700, fraccion: 5700 },
  'baloto-revancha': { billete: 2850, fraccion: 2850 },
  'loteria-de-bogota': { billete: 18000, fraccion: 3000 },
  'loteria-de-medellin': { billete: 15000, fraccion: 2500 },
  'loteria-de-cundinamarca': { billete: 15000, fraccion: 3000 },
  'loteria-del-valle': { billete: 15000, fraccion: 2500 },
  'loteria-cruz-roja': { billete: 15000, fraccion: 3000 },
  'loteria-de-boyaca': { billete: 12000, fraccion: 2000 },
  'loteria-de-santander': { billete: 12000, fraccion: 2000 },
  'loteria-del-cauca': { billete: 12000, fraccion: 2000 },
  'loteria-del-huila': { billete: 10000, fraccion: 2000 },
  'loteria-de-manizales': { billete: 12000, fraccion: 2000 },
  'loteria-del-meta': { billete: 10000, fraccion: 2000 },
  'loteria-del-quindio': { billete: 10000, fraccion: 2000 },
  'loteria-de-risaralda': { billete: 12000, fraccion: 2000 },
  'loteria-del-tolima': { billete: 12000, fraccion: 2000 },
  'super-astro': { billete: 3000, fraccion: 3000 },
};

// Datos mock de secos para un resultado específico
export function getMockSecos(resultadoId: string, numeroGanador: string): Seco[] {
  // Genera secos aleatorios pero consistentes basados en el resultadoId
  const hash = resultadoId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const secos: Seco[] = [
    // Super Seco
    {
      id: `${resultadoId}-ss`,
      resultadoId,
      lotteryId: '',
      numero: String((hash * 7) % 10000).padStart(4, '0'),
      serie: String((hash * 3) % 1000).padStart(3, '0'),
      nivel: 'super_seco',
      premio: 1000000000,
      fecha: new Date().toISOString(),
    },
    // Secos $700M
    {
      id: `${resultadoId}-700-1`,
      resultadoId,
      lotteryId: '',
      numero: String((hash * 11) % 10000).padStart(4, '0'),
      serie: String((hash * 5) % 1000).padStart(3, '0'),
      nivel: 'seco_700',
      premio: 700000000,
      fecha: new Date().toISOString(),
    },
    {
      id: `${resultadoId}-700-2`,
      resultadoId,
      lotteryId: '',
      numero: String((hash * 13) % 10000).padStart(4, '0'),
      serie: String((hash * 7) % 1000).padStart(3, '0'),
      nivel: 'seco_700',
      premio: 700000000,
      fecha: new Date().toISOString(),
    },
    // Secos $500M
    {
      id: `${resultadoId}-500-1`,
      resultadoId,
      lotteryId: '',
      numero: String((hash * 17) % 10000).padStart(4, '0'),
      nivel: 'seco_500',
      premio: 500000000,
      fecha: new Date().toISOString(),
    },
    {
      id: `${resultadoId}-500-2`,
      resultadoId,
      lotteryId: '',
      numero: String((hash * 19) % 10000).padStart(4, '0'),
      nivel: 'seco_500',
      premio: 500000000,
      fecha: new Date().toISOString(),
    },
  ];
  
  return secos;
}

// Calcular aproximaciones basadas en el número ganador
export function calcularAproximaciones(numeroGanador: string, lotteryId: string): Aproximacion[] {
  const plan = planesPremios[lotteryId] || planPremiosDefault;
  const numero = numeroGanador.padStart(4, '0');
  
  return [
    {
      tipo: 'tres_ultimas',
      cifras: numero.slice(-3),
      premio: plan.aproximaciones.find(a => a.tipo === 'tres_ultimas')?.premio || 70000,
      descripcion: `Termina en ${numero.slice(-3)}`,
    },
    {
      tipo: 'dos_ultimas',
      cifras: numero.slice(-2),
      premio: plan.aproximaciones.find(a => a.tipo === 'dos_ultimas')?.premio || 7000,
      descripcion: `Termina en ${numero.slice(-2)}`,
    },
    {
      tipo: 'ultima_cifra',
      cifras: numero.slice(-1),
      premio: plan.aproximaciones.find(a => a.tipo === 'ultima_cifra')?.premio || 700,
      descripcion: `Termina en ${numero.slice(-1)}`,
    },
  ];
}

// Obtener plan de premios para una lotería
export function getPlanPremios(lotteryId: string, lotteryName: string): PlanPremios {
  if (planesPremios[lotteryId]) {
    return planesPremios[lotteryId];
  }
  
  return {
    ...planPremiosDefault,
    lotteryId,
    lotteryName,
  };
}
