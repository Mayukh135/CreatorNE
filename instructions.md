# CreatorNE — Data Export & Migration Instructions

> Use this guide if you need to migrate away from Supabase Auth to Firebase Auth, custom JWT, or another provider.

---

## 1. Export Supabase Auth Users

### Via Supabase Dashboard
1. Go to **Authentication → Users** in [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **Export Users** (CSV download)

### Via SQL (Full Control)
```sql
-- Export all auth users with metadata
SELECT 
  id,
  email,
  phone,
  raw_user_meta_data,
  created_at,
  last_sign_in_at,
  email_confirmed_at
FROM auth.users
ORDER BY created_at;
```

Run this in **Supabase SQL Editor** → Download as CSV.

### Via Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref YOUR_PROJECT_REF

# Dump auth schema
supabase db dump --schema auth > auth_backup.sql
```

---

## 2. Export Application Data (PostgreSQL)

### Full Database Dump
```bash
# Get connection string from Supabase Dashboard → Settings → Database → Connection string
pg_dump "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres" > creatorne_full_backup.sql
```

### Specific Tables Only
```bash
pg_dump "postgresql://..." --table=public.creator_profiles --table=public.brand_profiles --table=public.categories > creatorne_data.sql
```

### Via Prisma (if using Prisma ORM)
```bash
# Generate a snapshot of your current schema
npx prisma db pull

# Export seed data
npx prisma db execute --stdin < export_query.sql
```

---

## 3. Export Cloudinary Media

### Via Cloudinary Admin API
```bash
# List all uploaded assets
curl https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/resources/image \
  -u YOUR_API_KEY:YOUR_API_SECRET \
  -d "max_results=500" > cloudinary_assets.json
```

### Bulk Download Script
```javascript
// download_media.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const https = require('https');

cloudinary.config({ 
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

async function exportAll() {
  const result = await cloudinary.api.resources({ max_results: 500, type: 'upload' });
  
  for (const resource of result.resources) {
    const filename = `./backup/${resource.public_id}.${resource.format}`;
    const dir = filename.substring(0, filename.lastIndexOf('/'));
    fs.mkdirSync(dir, { recursive: true });
    
    const file = fs.createWriteStream(filename);
    https.get(resource.secure_url, (response) => response.pipe(file));
  }
  
  console.log(`Exported ${result.resources.length} files`);
}

exportAll();
```

---

## 4. Migrate Auth to Firebase (if needed)

### Step 1: Export users from Supabase (see above)

### Step 2: Import to Firebase
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Use Firebase Auth Import (requires password hash export)
# Note: OTP/OAuth users can be re-invited; no passwords to migrate
firebase auth:import users.json --hash-algo=BCRYPT
```

### Step 3: Update application code
- Replace `@supabase/supabase-js` with `firebase/auth`
- Update auth hooks and middleware
- Test all login flows

---

## 5. Migrate to AWS (if needed)

### Database: Supabase → AWS RDS
```bash
# Dump from Supabase
pg_dump "supabase_connection_string" > backup.sql

# Restore to AWS RDS
psql "aws_rds_connection_string" < backup.sql
```

### Hosting: Vercel → AWS
- Use **AWS Amplify** or **ECS + CloudFront** for Next.js
- Update DNS records for `creatorne.in`
- Transfer SSL certificates

---

*Last updated: August 3, 2026*
