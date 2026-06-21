-- ════════════════════════════════════════════════════════════════════
--  FIRST HOPE NGO — Supabase / PostgreSQL schema
--  Run in the Supabase SQL editor (or `supabase db push`).
-- ════════════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ── Volunteers ──────────────────────────────────────────────────────
create table if not exists volunteers (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  phone        text,
  email        text not null,
  state        text,
  city         text,
  skills       text[] default '{}',
  availability text,
  motivation   text,
  resume_url   text,
  status       text default 'pending',   -- pending | approved | active | inactive
  created_at   timestamptz default now()
);

-- ── Events ──────────────────────────────────────────────────────────
create table if not exists events (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  description text,
  category    text,
  location    text,
  starts_at   timestamptz not null,
  image_url   text,
  capacity    integer,
  created_at  timestamptz default now()
);

create table if not exists event_registrations (
  id          uuid primary key default uuid_generate_v4(),
  event_title text not null,
  name        text,
  email       text not null,
  guests      text default '1',
  created_at  timestamptz default now()
);

-- ── Blog (CMS) ──────────────────────────────────────────────────────
create table if not exists blog_posts (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        text not null,
  category     text,
  excerpt      text,
  body         text,
  author       text,
  image_url    text,
  published    boolean default false,
  published_at timestamptz,
  created_at   timestamptz default now()
);

-- ── Gallery (Photo management) ──────────────────────────────────────
create table if not exists gallery_images (
  id           uuid primary key default uuid_generate_v4(),
  url          text not null,
  category     text,
  caption      text,
  created_at   timestamptz default now()
);

-- ── Contact messages ────────────────────────────────────────────────
create table if not exists contact_messages (
  id         uuid primary key default uuid_generate_v4(),
  name       text,
  email      text not null,
  subject    text,
  message    text not null,
  handled    boolean default false,
  created_at timestamptz default now()
);

-- ── Newsletter subscribers ──────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id         uuid primary key default uuid_generate_v4(),
  email      text unique not null,
  created_at timestamptz default now()
);

-- ── Certificates ────────────────────────────────────────────────────
create table if not exists certificates (
  id           uuid primary key default uuid_generate_v4(),
  volunteer_id uuid references volunteers(id) on delete cascade,
  program      text,
  hours        integer,
  issued_at    timestamptz default now(),
  certificate_no text unique
);

-- ════════════════════════════════════════════════════════════════════
--  Row Level Security
--  Public can INSERT (forms); only authenticated admins can read/manage.
-- ════════════════════════════════════════════════════════════════════
alter table volunteers            enable row level security;
alter table event_registrations   enable row level security;
alter table contact_messages      enable row level security;
alter table newsletter_subscribers enable row level security;

create policy "public can submit volunteers"
  on volunteers for insert to anon with check (true);

create policy "public can submit contact"
  on contact_messages for insert to anon with check (true);

create policy "public can register for events"
  on event_registrations for insert to anon with check (true);

create policy "public can subscribe"
  on newsletter_subscribers for insert to anon with check (true);

create policy "admins read all volunteers"
  on volunteers for select to authenticated using (true);

-- Published content is publicly readable.
alter table blog_posts     enable row level security;
alter table gallery_images enable row level security;
alter table events         enable row level security;

create policy "published posts are public"
  on blog_posts for select to anon using (published = true);

create policy "gallery is public"
  on gallery_images for select to anon using (true);

create policy "events are public"
  on events for select to anon using (true);

-- Helpful indexes
create index if not exists idx_volunteers_created on volunteers(created_at desc);
create index if not exists idx_events_starts       on events(starts_at);
create index if not exists idx_posts_published     on blog_posts(published, published_at desc);
