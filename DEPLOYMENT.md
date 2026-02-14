# Deployment Guide

## Prerequisites
- MongoDB Atlas account with connection string
- Git installed
- GitHub account (for Vercel deployment)

## Vercel Deployment Steps

### 1. Prepare Your Project

✅ Already done:
- `vercel.json` configured
- `server.js` updated for serverless
- `.gitignore` configured

### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

**Option A: Using Vercel Website**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production
6. Click "Deploy"

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

### 4. Environment Variables Required

Add these in Vercel Dashboard (Settings → Environment Variables):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
PORT=5000
```

### 5. MongoDB Atlas Configuration

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
3. Database Access → Ensure your database user has read/write permissions

### 6. Post-Deployment

After deployment, Vercel will give you a URL like:
```
https://your-project.vercel.app
```

Test the endpoints:
- Homepage: `https://your-project.vercel.app/`
- Student Login: `https://your-project.vercel.app/login-student`
- Admin Login: `https://your-project.vercel.app/login-admin`

## Alternative: Railway Deployment

### 1. Push to GitHub (same as above)

### 2. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create New Project → Deploy from GitHub
4. Select your repository
5. Add environment variables (same as Vercel)
6. Deploy

## Alternative: Render Deployment

### 1. Create `render.yaml`
Already configured in your project.

### 2. Deploy
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. New Web Service
4. Connect your repository
5. Add environment variables
6. Deploy

## Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify connection string format
- Check database user permissions

**Build Failures:**
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility

**Static Files Not Loading:**
- Verify file paths in HTML (using `/css/`, `/js/`)
- Check `server.js` static file configuration

## Local Testing Before Deployment

```bash
# Test production mode locally
set NODE_ENV=production
node server.js
```

Or on Linux/Mac:
```bash
NODE_ENV=production node server.js
```

## Post-Deployment Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables set in platform
- [ ] Test all pages load correctly
- [ ] Test student registration/login
- [ ] Test admin registration/login
- [ ] Test complaint submission
- [ ] Test file uploads
- [ ] Check browser console for errors

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Railway Docs: https://docs.railway.app/

---

**Your project is now ready for deployment! 🚀**
