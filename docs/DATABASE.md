# Kherad CMS Database Schema (PostgreSQL 15+)

> شمای آماده برای بک‌اند آینده (اخبار، رویدادها، پذیرش، پیام‌ها). از روز اول برای **کارایی و مقیاس‌پذیری** طراحی شده: کلیدهای `BIGINT IDENTITY`، ایندکس‌های پوششی، جست‌وجوی تمام‌متن فارسی، پارتیشن‌بندی پیام‌ها و سافت‌دیلیت.

```sql
-- ============ Extensions & collation ============
CREATE EXTENSION IF NOT EXISTS pg_trgm;      -- جست‌وجوی مشابهتی فارسی
CREATE EXTENSION IF NOT EXISTS unaccent;     -- نرمال‌سازی حروف

-- ============ Taxonomy ============
CREATE TABLE categories (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug        CITEXT UNIQUE NOT NULL,                 -- needs citext ext (یا VARCHAR + lower index)
  title_fa    VARCHAR(120) NOT NULL,
  kind        SMALLINT NOT NULL DEFAULT 0,            -- 0=news 1=event 2=faq 3=program
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_categories_kind ON categories (kind, sort_order);

-- ============ Posts (news & announcements) ============
CREATE TABLE posts (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id  BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  slug         VARCHAR(180) UNIQUE NOT NULL,
  title_fa     VARCHAR(220) NOT NULL,
  excerpt_fa   VARCHAR(420) NOT NULL,
  body_fa      TEXT NOT NULL,                          -- TOAST خودکار
  quote_fa     VARCHAR(420),
  cover_image  VARCHAR(260),
  tags         TEXT[] NOT NULL DEFAULT '{}',           -- GIN
  status       SMALLINT NOT NULL DEFAULT 0,            -- 0=draft 1=published 2=archived
  featured     BOOLEAN NOT NULL DEFAULT FALSE,
  views        BIGINT NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at   TIMESTAMPTZ,                            -- سافت‌دیلیت
  search_tsv   TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('simple', unaccent(coalesce(title_fa,'') || ' ' || coalesce(excerpt_fa,'') || ' ' || coalesce(body_fa,'')))
  ) STORED
);
-- ایندکس‌های کلیدی (پوششی برای لیست‌صفحه بدون heap-fetch اضافه):
CREATE INDEX ix_posts_listing ON posts (status, published_at DESC, id DESC)
  INCLUDE (category_id, slug, title_fa, excerpt_fa, cover_image)
  WHERE deleted_at IS NULL;
CREATE INDEX ix_posts_featured ON posts (featured, published_at DESC) WHERE status = 1 AND deleted_at IS NULL;
CREATE INDEX ix_posts_search ON posts USING GIN (search_tsv);
CREATE INDEX ix_posts_tags ON posts USING GIN (tags);
CREATE INDEX ix_posts_trgm ON posts USING GIN (title_fa gin_trgm_ops);  -- پیشنهاد «شاید منظورتان»

-- ============ Events ============
CREATE TABLE events (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title_fa    VARCHAR(220) NOT NULL,
  desc_fa     VARCHAR(420),
  place_fa    VARCHAR(160),
  starts_at   TIMESTAMPTZ NOT NULL,                   -- ذخیره میلادی، نمایش جلالی در لایه ارائه
  ends_at     TIMESTAMPTZ,
  capacity    INT,
  is_public   BOOLEAN NOT NULL DEFAULT TRUE,
  status      SMALLINT NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at  TIMESTAMPTZ
);
CREATE INDEX ix_events_upcoming ON events (starts_at) WHERE status = 1 AND deleted_at IS NULL AND starts_at > now();

-- ============ Admissions (partitioned by year) ============
CREATE TABLE admission_requests (
  id          BIGINT GENERATED ALWAYS AS IDENTITY,
  full_name   VARCHAR(160) NOT NULL,
  national_id CHAR(10) NOT NULL,
  grade       SMALLINT NOT NULL,                       -- 1=اول 7=هفتم 10=دهم 99=میان‌پایه
  phone       VARCHAR(20) NOT NULL,
  notes       VARCHAR(800),
  state       SMALLINT NOT NULL DEFAULT 0,             -- 0=new 1=called 2=interview 3=accepted 4=rejected
  track_code  CHAR(8) UNIQUE NOT NULL,                 -- کد پیگیری پیامکی
  year        SMALLINT NOT NULL,                       -- سال تحصیلی (شمسی، مثل 1405)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (id, year)
) PARTITION BY LIST (year);
CREATE TABLE admission_requests_1405 PARTITION OF admission_requests FOR VALUES IN (1405);
CREATE TABLE admission_requests_1406 PARTITION OF admission_requests FOR VALUES IN (1406);
CREATE INDEX ix_adm_state ON admission_requests (state, created_at DESC);
CREATE INDEX ix_adm_phone ON admission_requests (phone);

-- ============ Contact messages (partitioned by month) ============
CREATE TABLE contact_messages (
  id         BIGINT GENERATED ALWAYS AS IDENTITY,
  name       VARCHAR(160) NOT NULL,
  phone      VARCHAR(20),
  email      VARCHAR(200),
  subject    VARCHAR(160),
  body       TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);
CREATE TABLE contact_messages_2026 PARTITION OF contact_messages
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

-- ============ Newsletter ============
CREATE TABLE newsletter_subs (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      CITEXT UNIQUE NOT NULL,
  confirmed  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============ Testimonials & FAQs (کم‌حجم، کش‌شدنی) ============
CREATE TABLE testimonials (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text_fa VARCHAR(900) NOT NULL, name_fa VARCHAR(120) NOT NULL,
  role_fa VARCHAR(160), sort_order SMALLINT DEFAULT 0, is_visible BOOLEAN DEFAULT TRUE
);
CREATE TABLE faqs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  q_fa VARCHAR(300) NOT NULL, a_fa TEXT NOT NULL,
  sort_order SMALLINT DEFAULT 0, is_visible BOOLEAN DEFAULT TRUE
);
```

## نکات مقیاس‌پذیری
1. **خواندن‌محور:** جدول‌های `testimonials/faqs/categories` کاملاً کش‌شدنی (Redis با TTL یک‌روزه)؛ لیست اخبار با keyset-pagination روی `(published_at, id)` — بدون `OFFSET` سنگین.
2. **جست‌وجو:** `tsv` فارسی + `pg_trgm` برای غلط‌یاب؛ برای مقیاس بالاتر، همین شِما به OpenSearch نگاشت می‌شود.
3. **نوشتن:** پذیرش و پیام‌ها پارتیشن‌بندی شده‌اند (رشد سالانه بدون افت)؛ `views` شمارشی با `UPDATE ... +1` غیرهم‌زمان (batch) به‌روزرسانی شود.
4. **تاریخ جلالی:** همیشه `TIMESTAMPTZ` میلادی در دیتابیس؛ تبدیل به جلالی فقط در لایه ارائه (مثل همین فرانت: `Intl fa-IR-u-ca-persian`).
5. **بکاپ/مانیتور:** `pg_cron` برای VACUUM/ANALYZE هفتگی پارتیشن‌های فعال + RLS آماده برای نقش `cms_editor`.
