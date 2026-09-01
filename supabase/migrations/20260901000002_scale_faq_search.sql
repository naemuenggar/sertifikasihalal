-- Search support for large variant collections.
create extension if not exists pg_trgm;

alter table public.faq_question_variants
  add column if not exists normalized_text text;

-- Backfill existing variants with the same basic normalization available in SQL.
-- Newly generated rows receive the full TypeScript preprocessing pipeline.
update public.faq_question_variants
set normalized_text = trim(regexp_replace(lower(variant_text), '[^a-z0-9 ]', ' ', 'g'))
where normalized_text is null;

alter table public.faq_question_variants
  alter column normalized_text set not null;

drop index if exists public.faq_variants_trgm_idx;
create index faq_variants_trgm_idx on public.faq_question_variants
using gin (normalized_text gin_trgm_ops);

create or replace function public.match_faq_candidates(query_text text, match_limit int default 20)
returns table (faq_id uuid, variant_text text, normalized_text text, sim_score real)
language sql
stable
security definer
set search_path = public
as $$
  select v.faq_id, v.variant_text, v.normalized_text,
    similarity(v.normalized_text, query_text)::real as sim_score
  from public.faq_question_variants v
  join public.faqs f on f.id = v.faq_id and f.is_active = true
  where v.normalized_text % query_text
     or (length(query_text) >= 3 and v.normalized_text like '%' || query_text || '%')
  order by sim_score desc
  limit least(greatest(coalesce(match_limit, 20), 1), 100);
$$;

revoke all on function public.match_faq_candidates(text, int) from public;
grant execute on function public.match_faq_candidates(text, int) to anon, authenticated;
