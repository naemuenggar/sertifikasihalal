-- Jalankan sekali di Supabase SQL Editor untuk project yang sudah ada.
grant usage on schema public to anon, authenticated;
revoke insert on table public.contact_messages from anon, authenticated;
grant insert (name, contact, message) on table public.contact_messages to anon, authenticated;

alter table public.contact_messages enable row level security;

drop policy if exists contact_public_insert on public.contact_messages;
create policy contact_public_insert
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
