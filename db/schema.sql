-- Analytics schema. Every statement is idempotent: scripts/migrate.mjs runs
-- this whole file before each build, so it must be safe to run repeatedly.

-- One row per server-side request to a tracked page (see middleware.ts).
create table if not exists hits (
  id bigserial primary key,
  ts timestamptz not null default now(),
  path text,
  token text,
  ip text,
  country text,
  city text,
  ua text,
  lang text,
  referer text,
  sf_site text,
  sf_mode text,
  sf_dest text,
  method text
);
alter table hits add column if not exists is_bot boolean not null default false;
alter table hits add column if not exists bot_reason text;
create index if not exists hits_token_idx on hits (token, ts);

-- One row per client-side event sent by components/Tracker.tsx: a "view" when
-- a page renders in a real browser, a "click" for every button or link press.
create table if not exists events (
  id bigserial primary key,
  ts timestamptz not null default now(),
  type text not null,
  name text,
  href text,
  path text,
  token text,
  sid text,
  ip text,
  country text,
  city text,
  ua text,
  is_bot boolean not null default false,
  bot_reason text
);
create index if not exists events_token_idx on events (token, ts);
create index if not exists events_sid_idx on events (sid, ts);

-- Human-only views: what to query by default.
create or replace view human_hits as select * from hits where not is_bot;
create or replace view human_events as select * from events where not is_bot;

-- Per outreach token: when it was first seen by a human, and what they did.
create or replace view token_summary as
select
  t.token,
  min(t.ts) as first_seen,
  max(t.ts) as last_seen,
  count(*) filter (where t.src = 'hit') as page_hits,
  count(*) filter (where t.src = 'view') as views,
  count(*) filter (where t.src = 'click') as clicks,
  count(distinct t.sid) as sessions
from (
  select token, ts, 'hit' as src, null as sid from human_hits
  union all
  select token, ts, type as src, sid from human_events
) t
where t.token is not null
group by t.token;
