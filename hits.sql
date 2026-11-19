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
create index if not exists hits_token_idx on hits (token, ts);
