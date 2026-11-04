-- Ace Bathroom Renovations Brisbane: first-party visitor and lead attribution
-- Run once in Supabase SQL Editor. Tables are private; only the Cloudflare
-- Pages Function service-role key can access them.

create extension if not exists pgcrypto;

create table if not exists public.ace_visitors (
  visitor_id uuid primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  first_touch jsonb not null default '{}'::jsonb,
  last_touch jsonb not null default '{}'::jsonb,
  latest_device jsonb not null default '{}'::jsonb,
  latest_country_code text
);

create table if not exists public.ace_sessions (
  session_id uuid primary key,
  visitor_id uuid not null references public.ace_visitors(visitor_id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  landing_page text,
  referrer text,
  country_code text,
  attribution jsonb not null default '{}'::jsonb,
  device jsonb not null default '{}'::jsonb
);

create table if not exists public.ace_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid references public.ace_visitors(visitor_id) on delete set null,
  session_id uuid references public.ace_sessions(session_id) on delete set null,
  event_name text not null,
  page_url text,
  page_path text,
  page_title text,
  referrer text,
  event_data jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.ace_quote_leads (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid references public.ace_visitors(visitor_id) on delete set null,
  session_id uuid references public.ace_sessions(session_id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft','submitted','delivery_failed','spam_review')),
  source text,
  form_type text,
  clicked_at timestamptz not null default now(),
  submitted_at timestamptz,
  page_url text,
  page_path text,
  page_title text,
  referrer text,
  first_touch jsonb not null default '{}'::jsonb,
  last_touch jsonb not null default '{}'::jsonb,
  device jsonb not null default '{}'::jsonb,
  customer_name text,
  phone text,
  email text,
  suburb text,
  property_type text,
  project_type text,
  budget text,
  timeline text,
  message text,
  consent boolean not null default false,
  delivery_status text not null default 'not_submitted'
    check (delivery_status in ('not_submitted','pending','delivered','failed','not_configured')),
  delivery_error text,
  resend_id text,
  updated_at timestamptz not null default now()
);

create table if not exists public.ace_call_clicks (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid references public.ace_visitors(visitor_id) on delete set null,
  session_id uuid references public.ace_sessions(session_id) on delete set null,
  phone_number text,
  page_url text,
  page_path text,
  source text,
  clicked_at timestamptz not null default now(),
  call_status text not null default 'click_only',
  provider text,
  provider_call_id text,
  call_started_at timestamptz,
  call_ended_at timestamptz,
  duration_seconds integer,
  provider_payload jsonb not null default '{}'::jsonb
);

create index if not exists ace_sessions_visitor_started_idx
  on public.ace_sessions(visitor_id, started_at desc);
create index if not exists ace_events_occurred_idx
  on public.ace_events(occurred_at desc);
create index if not exists ace_events_visitor_occurred_idx
  on public.ace_events(visitor_id, occurred_at desc);
create index if not exists ace_events_session_occurred_idx
  on public.ace_events(session_id, occurred_at desc);
create index if not exists ace_events_name_occurred_idx
  on public.ace_events(event_name, occurred_at desc);
create index if not exists ace_leads_status_clicked_idx
  on public.ace_quote_leads(status, clicked_at desc);
create index if not exists ace_leads_visitor_clicked_idx
  on public.ace_quote_leads(visitor_id, clicked_at desc);
create index if not exists ace_call_clicks_clicked_idx
  on public.ace_call_clicks(clicked_at desc);
create index if not exists ace_call_clicks_visitor_idx
  on public.ace_call_clicks(visitor_id, clicked_at desc);

create or replace function public.ace_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists ace_quote_leads_set_updated_at on public.ace_quote_leads;
create trigger ace_quote_leads_set_updated_at
before update on public.ace_quote_leads
for each row execute function public.ace_set_updated_at();

alter table public.ace_visitors enable row level security;
alter table public.ace_sessions enable row level security;
alter table public.ace_events enable row level security;
alter table public.ace_quote_leads enable row level security;
alter table public.ace_call_clicks enable row level security;

-- No anon/authenticated policies are created. Public browser traffic must go
-- through the same-origin Cloudflare Function; never put the service-role key
-- in browser code.
revoke all on public.ace_visitors, public.ace_sessions, public.ace_events,
  public.ace_quote_leads, public.ace_call_clicks from anon, authenticated;
grant all on public.ace_visitors, public.ace_sessions, public.ace_events,
  public.ace_quote_leads, public.ace_call_clicks to service_role;
