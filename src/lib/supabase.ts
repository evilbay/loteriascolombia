import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para la base de datos
export interface DbLottery {
  id: string;
  name: string;
  slug: string;
  schedule: {
    days: string[];
    time: string;
  };
  source_url: string;
  scraper_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbResult {
  id: number;
  lottery_id: string;
  draw_date: string;
  draw_number: string;
  numbers: {
    main: number[];
    series?: string;
    superbalota?: number;
    revancha?: number;
  };
  prizes: Record<string, unknown>;
  raw_data: Record<string, unknown>;
  source: string;
  created_at: string;
}
