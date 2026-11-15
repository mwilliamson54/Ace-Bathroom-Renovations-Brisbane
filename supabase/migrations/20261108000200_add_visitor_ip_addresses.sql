-- Store Cloudflare-derived visitor IP addresses in private attribution records.
-- This is additive and safe to run after the original visitor/lead migration.

alter table public.ace_visitors
  add column if not exists last_ip_address inet;

alter table public.ace_sessions
  add column if not exists ip_address inet;

alter table public.ace_events
  add column if not exists ip_address inet;

alter table public.ace_quote_leads
  add column if not exists ip_address inet;

alter table public.ace_call_clicks
  add column if not exists ip_address inet;

comment on column public.ace_visitors.last_ip_address is
  'Latest visitor IP observed by the Cloudflare Pages Function from CF-Connecting-IP/CF-Connecting-IPv6.';

comment on column public.ace_sessions.ip_address is
  'Visitor IP observed by Cloudflare for this session.';

comment on column public.ace_events.ip_address is
  'Visitor IP observed by Cloudflare for this event.';

comment on column public.ace_quote_leads.ip_address is
  'Visitor IP observed by Cloudflare when the lead was created or submitted.';

comment on column public.ace_call_clicks.ip_address is
  'Visitor IP observed by Cloudflare when the phone link was clicked.';
