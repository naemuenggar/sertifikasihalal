-- Simpan top-3 kandidat beserta skor tiap pertanyaan, untuk analisis agregat
-- pola kesalahan matching (bahan evaluasi di laporan).
alter table public.chatbot_logs
  add column if not exists debug_candidates jsonb;
