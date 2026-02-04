import { Lottery, DayOfWeek } from '@/types/lottery';

export const lotteries: Lottery[] = [
  { id: 'baloto', name: 'Baloto', slug: 'baloto', shortName: 'Baloto', description: 'El juego de azar más popular de Colombia', drawDays: ['miercoles', 'sabado'], drawTime: '22:30', color: '#E31837', region: 'Nacional', numbersCount: 6, hasSeries: false, isActive: true, lotteryType: 'baloto' },
  { id: 'baloto-revancha', name: 'Baloto Revancha', slug: 'baloto-revancha', shortName: 'Revancha', description: 'Segunda oportunidad con Baloto', drawDays: ['miercoles', 'sabado'], drawTime: '22:35', color: '#1E88E5', region: 'Nacional', numbersCount: 6, hasSeries: false, isActive: true, lotteryType: 'baloto' },
  { id: 'loteria-de-bogota', name: 'Lotería de Bogotá', slug: 'loteria-de-bogota', shortName: 'Bogotá', description: 'La lotería oficial de la capital', drawDays: ['jueves'], drawTime: '22:30', color: '#E31837', region: 'Bogotá D.C.', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-de-medellin', name: 'Lotería de Medellín', slug: 'loteria-de-medellin', shortName: 'Medellín', description: 'La lotería oficial de Medellín', drawDays: ['viernes'], drawTime: '22:45', color: '#FF5722', region: 'Antioquia', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-de-cundinamarca', name: 'Lotería de Cundinamarca', slug: 'loteria-de-cundinamarca', shortName: 'Cundinamarca', description: 'Lotería departamental de Cundinamarca', drawDays: ['lunes'], drawTime: '22:30', color: '#FFD700', region: 'Cundinamarca', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-del-valle', name: 'Lotería del Valle', slug: 'loteria-del-valle', shortName: 'Valle', description: 'Lotería del Valle del Cauca', drawDays: ['miercoles'], drawTime: '22:30', color: '#009688', region: 'Valle del Cauca', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-cruz-roja', name: 'Lotería de la Cruz Roja', slug: 'loteria-cruz-roja', shortName: 'Cruz Roja', description: 'A beneficio de la Cruz Roja', drawDays: ['martes'], drawTime: '22:30', color: '#FF0000', region: 'Nacional', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-de-boyaca', name: 'Lotería de Boyacá', slug: 'loteria-de-boyaca', shortName: 'Boyacá', description: 'Lotería departamental de Boyacá', drawDays: ['sabado'], drawTime: '22:30', color: '#008C45', region: 'Boyacá', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-de-santander', name: 'Lotería de Santander', slug: 'loteria-de-santander', shortName: 'Santander', description: 'Lotería de Santander', drawDays: ['viernes'], drawTime: '22:30', color: '#F44336', region: 'Santander', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-del-cauca', name: 'Lotería del Cauca', slug: 'loteria-del-cauca', shortName: 'Cauca', description: 'Lotería departamental del Cauca', drawDays: ['sabado'], drawTime: '22:30', color: '#0066CC', region: 'Cauca', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-del-huila', name: 'Lotería del Huila', slug: 'loteria-del-huila', shortName: 'Huila', description: 'Lotería del Huila', drawDays: ['viernes'], drawTime: '22:30', color: '#4CAF50', region: 'Huila', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-de-manizales', name: 'Lotería de Manizales', slug: 'loteria-de-manizales', shortName: 'Manizales', description: 'Lotería de Manizales', drawDays: ['miercoles'], drawTime: '22:30', color: '#9C27B0', region: 'Caldas', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-del-meta', name: 'Lotería del Meta', slug: 'loteria-del-meta', shortName: 'Meta', description: 'Lotería del Meta', drawDays: ['miercoles'], drawTime: '22:30', color: '#795548', region: 'Meta', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-del-quindio', name: 'Lotería del Quindío', slug: 'loteria-del-quindio', shortName: 'Quindío', description: 'Lotería del Quindío', drawDays: ['jueves'], drawTime: '22:30', color: '#00BCD4', region: 'Quindío', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-de-risaralda', name: 'Lotería de Risaralda', slug: 'loteria-de-risaralda', shortName: 'Risaralda', description: 'Lotería de Risaralda', drawDays: ['viernes'], drawTime: '22:30', color: '#3F51B5', region: 'Risaralda', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'loteria-del-tolima', name: 'Lotería del Tolima', slug: 'loteria-del-tolima', shortName: 'Tolima', description: 'Lotería del Tolima', drawDays: ['lunes'], drawTime: '22:30', color: '#607D8B', region: 'Tolima', numbersCount: 4, hasSeries: true, isActive: true, lotteryType: 'traditional' },
  { id: 'super-astro', name: 'Super Astro', slug: 'super-astro', shortName: 'Super Astro', description: 'El juego de signos zodiacales', drawDays: ['domingo'], drawTime: '21:00', color: '#9C27B0', region: 'Nacional', numbersCount: 1, hasSeries: false, isActive: true, lotteryType: 'astro' },
];

export function getLotteryBySlug(slug: string): Lottery | undefined {
  return lotteries.find(l => l.slug === slug);
}

export function getLotteriesByDay(day: DayOfWeek): Lottery[] {
  return lotteries.filter(l => l.drawDays.includes(day));
}

export function getTodayLotteries(): Lottery[] {
  const days: DayOfWeek[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  return getLotteriesByDay(days[new Date().getDay()]);
}

export function getLotteryLogo(lotteryId: string): string | null {
  const logoMap: Record<string, string> = {
    'baloto': '/logos/baloto.png',
    'baloto-revancha': '/logos/baloto.png',
    'loteria-de-bogota': '/logos/loteria-bogota.png',
    'loteria-de-medellin': '/logos/loteria-medellin.png',
    'loteria-de-cundinamarca': '/logos/loteria-cundinamarca.png',
    'loteria-del-valle': '/logos/loteria-valle.png',
    'loteria-cruz-roja': '/logos/cruz-roja.png',
    'cruz-roja': '/logos/cruz-roja.png',
    'loteria-de-boyaca': '/logos/loteria-boyaca.png',
    'loteria-de-santander': '/logos/loteria-santander.png',
    'loteria-del-cauca': '/logos/loteria-cauca.png',
    'loteria-del-huila': '/logos/loteria-huila.png',
    'loteria-de-manizales': '/logos/loteria-manizales.png',
    'loteria-del-meta': '/logos/loteria-meta.png',
    'loteria-del-quindio': '/logos/loteria-quindio.png',
    'loteria-de-risaralda': '/logos/loteria-risaralda.png',
    'loteria-del-tolima': '/logos/loteria-tolima.png',
    'super-astro': '/logos/super-astro.png',
    'super-astro-sol': '/logos/super-astro-sol.png',
    'super-astro-luna': '/logos/super-astro-luna.png',
    'loteria-bogota': '/logos/loteria-bogota.png',
    'loteria-medellin': '/logos/loteria-medellin.png',
    'loteria-cundinamarca': '/logos/loteria-cundinamarca.png',
    'loteria-valle': '/logos/loteria-valle.png',
    'loteria-boyaca': '/logos/loteria-boyaca.png',
    'loteria-santander': '/logos/loteria-santander.png',
    'loteria-cauca': '/logos/loteria-cauca.png',
    'loteria-huila': '/logos/loteria-huila.png',
    'loteria-manizales': '/logos/loteria-manizales.png',
    'loteria-meta': '/logos/loteria-meta.png',
    'loteria-quindio': '/logos/loteria-quindio.png',
    'loteria-risaralda': '/logos/loteria-risaralda.png',
    'loteria-tolima': '/logos/loteria-tolima.png',
  };
  
  return logoMap[lotteryId] || null;
}
