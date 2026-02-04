// Tipos para el sistema de Secos y Aproximaciones

export type SecoNivel = 'super_seco' | 'seco_700' | 'seco_500' | 'seco_300' | 'seco_200' | 'seco_100';

export interface Seco {
  id: string;
  resultadoId: string;
  lotteryId: string;
  numero: string;
  serie?: string;
  nivel: SecoNivel;
  premio: number; // En pesos
  fecha: string;
}

export type TipoAproximacion = 'tres_ultimas' | 'dos_ultimas' | 'ultima_cifra';

export interface Aproximacion {
  tipo: TipoAproximacion;
  cifras: string;
  premio: number;
  descripcion: string;
}

export interface PlanPremios {
  lotteryId: string;
  lotteryName: string;
  precioBillete: number;
  fraccionMinima?: number;
  premioMayor: number;
  secos: {
    nivel: SecoNivel;
    nombre: string;
    cantidad: number;
    premio: number;
  }[];
  aproximaciones: {
    tipo: TipoAproximacion;
    descripcion: string;
    premio: number;
    coincidencias: string;
  }[];
}

export interface SecosConAproximaciones {
  superSeco?: Seco;
  secosPorNivel: Record<SecoNivel, Seco[]>;
  aproximaciones: Aproximacion[];
}

// Utilidades para formatear
export function formatPremio(valor: number): string {
  if (valor >= 1000000000) {
    return `$${(valor / 1000000000).toFixed(0)}B`;
  }
  if (valor >= 1000000) {
    return `$${(valor / 1000000).toFixed(0)}M`;
  }
  if (valor >= 1000) {
    return `$${(valor / 1000).toFixed(0)}K`;
  }
  return `$${valor.toLocaleString('es-CO')}`;
}

export function getNivelLabel(nivel: SecoNivel): string {
  const labels: Record<SecoNivel, string> = {
    'super_seco': 'Super Seco',
    'seco_700': 'Seco $700M',
    'seco_500': 'Seco $500M',
    'seco_300': 'Seco $300M',
    'seco_200': 'Seco $200M',
    'seco_100': 'Seco $100M',
  };
  return labels[nivel];
}

export function getTipoAproximacionLabel(tipo: TipoAproximacion): string {
  const labels: Record<TipoAproximacion, string> = {
    'tres_ultimas': '3 últimas cifras',
    'dos_ultimas': '2 últimas cifras',
    'ultima_cifra': 'Última cifra',
  };
  return labels[tipo];
}
