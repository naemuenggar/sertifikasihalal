-- Perbaiki candidate retrieval: selain variants, sertakan juga baris FAQ
-- kanonik (question + keywords) sebagai sumber kandidat. Tanpa ini, query
-- pendek seperti "harga" tidak pernah match karena variants hasil seed hanya
-- turunan dari kolom question.
create or replace function public.match_faq_candidates(query_text text, match_limit int default 20)
returns table (faq_id uuid, variant_text text, normalized_text text, sim_score real)
language sql
stable
security definer
set search_path = public
as $$
  with candidates as (
    select v.faq_id, v.variant_text, v.normalized_text
    from public.faq_question_variants v
    join public.faqs f on f.id = v.faq_id and f.is_active = true
    union all
    select f.id, f.question,
      trim(regexp_replace(lower(f.question || ' ' || coalesce(f.keywords, '')), '[^a-z0-9 ]', ' ', 'g'))
    from public.faqs f
    where f.is_active = true
  )
  select c.faq_id, c.variant_text, c.normalized_text,
    similarity(c.normalized_text, query_text)::real as sim_score
  from candidates c
  where c.normalized_text % query_text
     or (length(query_text) >= 3 and c.normalized_text like '%' || query_text || '%')
     or (length(query_text) >= 3 and query_text like '%' || c.normalized_text || '%')
  order by sim_score desc
  limit least(greatest(coalesce(match_limit, 20), 1), 100);
$$;

revoke all on function public.match_faq_candidates(text, int) from public;
grant execute on function public.match_faq_candidates(text, int) to anon, authenticated;
