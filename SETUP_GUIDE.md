# Recipe App — Supabase Cloud Sync Setup

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**, choose a name and password
3. Wait for the project to spin up (~2 minutes)

## 2. Create Database Tables
Go to **SQL Editor** in the left sidebar, paste this entire block, and click **Run**:

```sql
-- Genres table
CREATE TABLE genres (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT,
  created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000),
  updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)
);

-- Recipes table
CREATE TABLE recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  genre_ids JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  youtube_url TEXT,
  website_url TEXT,
  instructions JSONB DEFAULT '[]',
  calories NUMERIC,
  protein NUMERIC,
  carbs NUMERIC,
  fat NUMERIC,
  servings INTEGER DEFAULT 1,
  ingredients JSONB DEFAULT '[]',
  cover_index INTEGER DEFAULT 0,
  hidden BOOLEAN DEFAULT FALSE,
  rating INTEGER DEFAULT 0,
  created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000),
  updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)
);

-- Diary table
CREATE TABLE diary (
  id TEXT PRIMARY KEY,
  recipe_id TEXT,
  date BIGINT,
  comment TEXT,
  image TEXT,
  scan JSONB,
  created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)
);

-- Enable RLS
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary ENABLE ROW LEVEL SECURITY;

-- Allow all operations with anon key (single-user app)
CREATE POLICY "Allow all genres" ON genres FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all recipes" ON recipes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all diary" ON diary FOR ALL USING (true) WITH CHECK (true);
```

## 3. Create Storage Bucket for Images
1. Go to **Storage** in the left sidebar
2. Click **New Bucket**
3. Name it exactly: `images`
4. **Check "Public bucket"**
5. Click **Create bucket**
6. Then add a storage policy — paste in the SQL editor:

```sql
CREATE POLICY "Allow public image access" ON storage.objects
  FOR ALL USING (bucket_id = 'images') WITH CHECK (bucket_id = 'images');
```

## 4. Get Your Credentials
1. Go to **Settings** → **API** in the left sidebar
2. Copy **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy **anon / public** key (the long `eyJ...` string)

## 5. Connect the App
1. Open your Recipe App → **Settings** (bottom tab)
2. Under **Cloud Sync**, paste your Project URL and Anon Key
3. Click **Connect & Sync**
4. Done! Recipes sync across all devices.

## How Sync Works
- **On launch**: loads locally (instant), then syncs with cloud in background
- **On every save/edit/delete/rate**: writes locally first, then pushes to cloud
- **Multi-device**: open on any device, recipes from other devices appear within seconds
- **Conflicts**: most recent edit wins (by timestamp)
- **Images**: resized to 1600px before uploading (saves storage)
- **Offline**: works fully offline, syncs when back online

## What Syncs
Everything: genres, recipes (all fields including rating, hidden, cover photo, ingredients, instructions, nutrition, links), diary entries (photos, scan results, comments), and images.

## Export/Import
Still works independently of cloud sync. Exports include: genres, recipes, diary entries, and all settings (API key, Supabase config). After importing, data auto-syncs to cloud if connected.

## Free Tier Limits
- 500 MB database — thousands of recipes
- 1 GB file storage — ~500+ recipe photos at 1600px
- 5 GB bandwidth/month — plenty for personal multi-device use
