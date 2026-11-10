create type public.app_role as enum ('admin', 'user');
create type public.interest_status as enum ('novo', 'em_contato', 'concluido');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- First account created becomes admin (bootstrap). Later accounts get no role.
create or replace function public.bootstrap_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_bootstrap_admin
after insert on auth.users for each row execute function public.bootstrap_first_admin();

create table public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  total_score smallint not null check (total_score between 0 and 100),
  score_senhas smallint not null check (score_senhas between 0 and 100),
  score_contas smallint not null check (score_contas between 0 and 100),
  score_dispositivos smallint not null check (score_dispositivos between 0 and 100),
  score_backup smallint not null check (score_backup between 0 and 100),
  score_golpes smallint not null check (score_golpes between 0 and 100),
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
grant insert on public.diagnostics to anon, authenticated;
grant select on public.diagnostics to authenticated;
grant all on public.diagnostics to service_role;
alter table public.diagnostics enable row level security;
create policy "Anyone can submit a diagnostic" on public.diagnostics for insert to anon, authenticated with check (true);
create policy "Admins read diagnostics" on public.diagnostics for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.interest_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  whatsapp text not null check (whatsapp ~ '^[0-9]{10,13}$'),
  diagnostic_id uuid references public.diagnostics(id) on delete set null,
  total_score smallint check (total_score between 0 and 100),
  status interest_status not null default 'novo',
  created_at timestamptz not null default now()
);
grant insert on public.interest_requests to anon, authenticated;
grant select, update on public.interest_requests to authenticated;
grant all on public.interest_requests to service_role;
alter table public.interest_requests enable row level security;
create policy "Anyone can register interest" on public.interest_requests for insert to anon, authenticated with check (status = 'novo');
create policy "Admins read interest" on public.interest_requests for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update interest" on public.interest_requests for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));