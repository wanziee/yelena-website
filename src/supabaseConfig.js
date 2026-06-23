import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jbjumhmzlzchdibdmutf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpianVtaG16bHpjaGRpYmRtdXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzA0NDYsImV4cCI6MjA5NzgwNjQ0Nn0.DYGx_QGo8R_Pjfial1vYAALpCiIbeJIAmq0lcgKi77s';

export const supabase = createClient(supabaseUrl, supabaseKey);
