import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://loteriascolombia.co';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/privacidad',
    '/terminos',
    '/acerca',
  ];

  // Loterías
  const lotteries = [
    'baloto',
    'baloto-revancha',
    'loteria-de-bogota',
    'loteria-de-medellin',
    'loteria-de-cundinamarca',
    'loteria-del-valle',
    'loteria-cruz-roja',
    'loteria-de-boyaca',
    'loteria-de-santander',
    'loteria-del-cauca',
    'loteria-del-huila',
    'loteria-de-manizales',
    'loteria-del-meta',
    'loteria-del-quindio',
    'loteria-de-risaralda',
    'loteria-del-tolima',
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'hourly' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  const lotteryRoutes = lotteries.map((lottery) => ({
    url: `${baseUrl}/loteria/${lottery}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...lotteryRoutes];
}
