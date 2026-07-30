-- Jalankan sekali di Supabase SQL Editor untuk project yang sudah ada.
alter table public.contact_messages
  add column if not exists status text not null default 'belum_ditindaklanjuti',
  add column if not exists catatan text,
  add column if not exists followed_up_at timestamptz;

alter table public.contact_messages
  drop constraint if exists contact_messages_status_check;
alter table public.contact_messages
  add constraint contact_messages_status_check
  check (status in ('belum_ditindaklanjuti', 'sudah_ditindaklanjuti'));

create or replace function public.set_contact_followed_up_at()
returns trigger language plpgsql as $$
begin
  if new.status = 'sudah_ditindaklanjuti' and old.status is distinct from new.status then
    new.followed_up_at = now();
  elsif new.status = 'belum_ditindaklanjuti' then
    new.followed_up_at = null;
  end if;
  return new;
end $$;

drop trigger if exists contact_set_followed_up_at on public.contact_messages;
create trigger contact_set_followed_up_at
  before update of status on public.contact_messages
  for each row execute function public.set_contact_followed_up_at();

alter table public.contact_messages enable row level security;

drop policy if exists contact_admin_update on public.contact_messages;
create policy contact_admin_update
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);

grant update on table public.contact_messages to authenticated;
revoke update on table public.contact_messages from anon;
revoke insert on table public.contact_messages from anon, authenticated;
grant insert (name, contact, message) on table public.contact_messages to anon, authenticated;
