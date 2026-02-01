# Railway Deployment Guide

## Step-by-Step Instructions to Deploy Backend to Railway

### Prerequisites
1. GitHub account
2. Railway account (sign up at https://railway.app)
3. Your backend code pushed to GitHub

---

## Step 1: Prepare Your Code

✅ **Already Done:**
- Updated `index.js` to use `PORT` from environment
- Added scripts to `package.json`
- Created `railway.json` configuration

### Make sure your code is on GitHub:
```bash
cd /home/rupesh/cohort/week13/medium/backend
git init  # if not already initialized
git add .
git commit -m "Prepare for Railway deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

## Step 2: Sign Up / Login to Railway

1. Go to https://railway.app
2. Click **"Login"** or **"Start a New Project"**
3. Sign up with GitHub (recommended) or email

---

## Step 3: Create a New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub if prompted
4. Select your repository
5. Select the branch (usually `main` or `master`)

---

## Step 4: Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will create a PostgreSQL database
4. **Important:** Note the connection details (you'll need the DATABASE_URL)

---

## Step 5: Configure Environment Variables

1. In your Railway project, click on your **service** (the one you just created)
2. Go to the **"Variables"** tab
3. Add these environment variables:

   ```
   PORT=3000
   DATABASE_URL=<automatically added when you link the database>
   JWT_SECRET=<generate a random secret key>
   ```

   **To link the database:**
   - Click **"+ New Variable"**
   - Select **"Reference from..."** → Choose your PostgreSQL database
   - Select **"DATABASE_URL"**
   - This automatically adds the connection string

   **To generate JWT_SECRET:**
   - Use a random string generator
   - Or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

---

## Step 6: Configure Build Settings

1. In your service settings, go to **"Settings"** tab
2. Under **"Build Command"**, Railway should auto-detect, but verify:
   ```
   npm install && npm run build
   ```

3. Under **"Start Command"**, set:
   ```
   npm run migrate && npm start
   ```

   Or Railway will use the `railway.json` file we created.

---

## Step 7: Deploy

1. Railway will automatically start deploying when you:
   - Push code to your GitHub repo, OR
   - Click **"Deploy"** button in Railway dashboard

2. Watch the build logs in the **"Deployments"** tab
3. Wait for deployment to complete (usually 2-5 minutes)

---

## Step 8: Get Your Backend URL

1. Once deployed, Railway will provide a URL like:
   ```
   https://your-project-name.up.railway.app
   ```

2. Click on your service → **"Settings"** → **"Generate Domain"** if needed

3. Your backend API will be available at:
   ```
   https://your-project-name.up.railway.app/api/v1/user/signup
   https://your-project-name.up.railway.app/api/v1/blog/bulk
   ```

---

## Step 9: Update Frontend Config

Update your frontend `config.ts` file:

```typescript
export const BACKEND_URL = "https://your-project-name.up.railway.app"
```

---

## Step 10: Test Your Deployment

1. Visit: `https://your-project-name.up.railway.app/health`
   - Should return: `{"status":"ok"}`

2. Test signup endpoint:
   ```
   POST https://your-project-name.up.railway.app/api/v1/user/signup
   ```

---

## Troubleshooting

### Database Connection Issues
- Make sure `DATABASE_URL` is set correctly
- Check that the database is linked to your service
- Verify Prisma migrations ran: Check deployment logs

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Railway auto-detects, but you can set it in `package.json`)

### Port Issues
- Railway automatically sets `PORT` environment variable
- Your code should use `process.env.PORT || 3000`

### Prisma Issues
- Make sure `prisma generate` runs in build
- Check that migrations run: `npm run migrate`

---

## Useful Railway Commands

- **View Logs:** Click on your service → "Deployments" → Click on a deployment → "View Logs"
- **Redeploy:** Click "Redeploy" button
- **Environment Variables:** Service → "Variables" tab

---

## Next Steps

After backend is deployed:
1. Update frontend `BACKEND_URL`
2. Deploy frontend to Vercel/Netlify
3. Test the full application

---

## Railway Free Tier Limits

- $5 credit per month
- Services sleep after inactivity (wakes up on request)
- PostgreSQL database included
- Perfect for development and small projects

---

**Need Help?** Check Railway docs: https://docs.railway.app

