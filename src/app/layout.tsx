import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Loterías Colombia - Resultados en Tiempo Real',
  description: 'Consulta los resultados de todas las loterías colombianas: Bogotá, Medellín, Baloto, Cruz Roja, y más. Actualizados al instante.',
  keywords: 'lotería colombia, resultados lotería, baloto, lotería de bogotá, lotería de medellín, chance, resultados hoy',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://loteriascolombia.co',
    siteName: 'Loterías Colombia',
    title: 'Loterías Colombia - Resultados en Tiempo Real',
    description: 'Consulta los resultados de todas las loterías colombianas actualizados al instante.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loterías Colombia - Resultados en Tiempo Real',
    description: 'Consulta los resultados de todas las loterías colombianas actualizados al instante.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
// Force rebuild Fri Feb  6 11:50:32 UTC 2026
