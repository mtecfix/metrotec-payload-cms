# MetroTec Payload CMS

Full headless CMS for MetroTec IT Solutions website content management.

## Features
- **Services** — Manage all IT service offerings (managed IT, cybersecurity, cloud, etc.)
- **Blog Posts** — Rich text editor with SEO fields, categories, tags
- **Team Members** — Staff profiles with photos and bios
- **Pages** — Edit any page (about, contact, industries, etc.)
- **Media Library** — Image upload with auto-resizing (thumbnail, card, hero)
- **Testimonials** — Client quotes and ratings
- **SEO Plugin** — Auto-generates meta titles/descriptions
- **S3 Storage** — Media uploads go directly to your S3 bucket

## Deploy to Vercel (Free)

### Prerequisites
1. Sign up at [Neon](https://neon.tech) → Create database "metrotec-cms" (free tier)
2. Sign up at [Vercel](https://vercel.com) (free for personal projects)

### Steps
```bash
# 1. Push this repo to GitHub
cd /mnt/d/KIRO\ PROJECTS/METROTEC/payload-cms
git init && git add . && git commit -m "Initial Payload CMS"
gh repo create mtecfix/metrotec-payload-cms --public --source=. --push

# 2. Connect to Vercel
# Go to vercel.com → New Project → Import mtecfix/metrotec-payload-cms
# Add environment variables from .env.example

# 3. Deploy
# Vercel auto-deploys on push
```

### Environment Variables (set in Vercel dashboard)
| Variable | Value |
|----------|-------|
| `DATABASE_URI` | Your Neon connection string |
| `PAYLOAD_SECRET` | Any random 32+ char string |
| `S3_BUCKET` | `metrotec-www` |
| `S3_REGION` | `us-east-1` |
| `S3_ACCESS_KEY_ID` | Your AWS key |
| `S3_SECRET_ACCESS_KEY` | Your AWS secret |

### Local Development
```bash
cp .env.example .env  # Fill in values
npm install
npm run dev           # http://localhost:3000/admin
```

## Collections

| Collection | Fields | Purpose |
|-----------|--------|---------|
| Services | title, slug, category, content, features, pricing, hero | IT service pages |
| Blog Posts | title, slug, content, category, tags, author, date | Blog articles |
| Team Members | name, role, bio, photo, email, linkedin | Staff directory |
| Pages | title, slug, content, heroTitle, heroSubtitle | Static pages |
| Media | file, alt, caption, auto-sizes | Image management |
| Testimonials | quote, author, company, rating | Client reviews |

## API Endpoints (auto-generated)

Once deployed, access content via REST API:
- `GET /api/services` — All services
- `GET /api/blog-posts?where[status][equals]=published` — Published posts
- `GET /api/media` — All media files
- `GET /api/pages?where[slug][equals]=about` — Specific page

## Architecture
```
Vercel (Free) ─── Payload CMS ─── Neon PostgreSQL (Free)
                       │
                       └── S3 (metrotec-www bucket) for media
```
