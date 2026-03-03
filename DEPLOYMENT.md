# Deployment Guide

## ✅ **Good News: Nothing Will Be Lost!**

Your **database, blogs, and projects are all stored in Supabase**, which is a **separate cloud service**. This means:

- ✅ **All your data persists** - Blogs, projects, images, and user accounts are stored in Supabase's cloud database
- ✅ **Deployment platform is just for hosting** - Vercel/Netlify only host your frontend code
- ✅ **No data migration needed** - Your Supabase database remains unchanged

## 🔑 What You Need to Configure

The only thing you need to do is set up **environment variables** on your deployment platform to connect to your existing Supabase database.

### Required Environment Variables

You need to add these two environment variables to your deployment platform:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### How to Find Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **anon/public key** → Use as `VITE_SUPABASE_PUBLISHABLE_KEY`

## 🚀 Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In Vercel project settings, go to **Settings** → **Environment Variables**
   - Add:
     - `VITE_SUPABASE_URL` = Your Supabase project URL
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = Your Supabase anon key
   - Select **Production**, **Preview**, and **Development** environments
   - Click "Save"

4. **Deploy**
   - Vercel will automatically detect Vite
   - Build command: `npm run build` (auto-detected)
   - Output directory: `dist` (auto-detected)
   - Click "Deploy"

5. **Done!** Your site will be live with all your data intact.

### Option 2: Deploy to Netlify

1. **Push code to GitHub**

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Add:
     - `VITE_SUPABASE_URL` = Your Supabase project URL
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = Your Supabase anon key

5. **Deploy**
   - Click "Deploy site"

### Option 3: Deploy to Cloudflare Pages

1. **Push code to GitHub**

2. **Import to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Connect your GitHub repository

3. **Configure Build Settings**
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`

4. **Add Environment Variables**
   - Go to **Settings** → **Environment variables**
   - Add:
     - `VITE_SUPABASE_URL` = Your Supabase project URL
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = Your Supabase anon key

5. **Deploy**
   - Click "Save and Deploy"

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Your code is pushed to GitHub/GitLab
- [ ] You have your Supabase credentials ready
- [ ] You've tested locally with `npm run build`
- [ ] Environment variables are configured on the deployment platform
- [ ] Your Supabase project is active and accessible

## 🔍 Verify After Deployment

After deployment, check:

1. **Homepage loads** - Your portfolio should display
2. **Projects section** - Should show all your projects from Supabase
3. **Blog section** - Should show all your blog posts
4. **Admin login** - Should work with your Supabase auth
5. **Image uploads** - Project images should load from Supabase Storage

## 🛠️ Troubleshooting

### Issue: "Cannot connect to Supabase"
**Solution:** Check that environment variables are set correctly and match your Supabase project.

### Issue: "Projects/Blogs not showing"
**Solution:** 
- Verify Supabase URL and key are correct
- Check Supabase dashboard to ensure data exists
- Check browser console for errors

### Issue: "Images not loading"
**Solution:** 
- Verify Supabase Storage bucket is public
- Check image URLs in Supabase Storage
- Ensure CORS is configured correctly

### Issue: "Admin login not working"
**Solution:**
- Verify user exists in Supabase Auth
- Check that user has admin role in `user_roles` table
- Check Supabase Auth settings

## 🔐 Security Notes

- ✅ The `VITE_SUPABASE_PUBLISHABLE_KEY` is safe to expose in frontend code (it's designed for public use)
- ✅ Row Level Security (RLS) policies in Supabase protect your data
- ✅ Never commit `.env` files to Git
- ✅ Always use environment variables on deployment platforms

## 📊 What Happens to Your Data?

| Item | Location | Persists? |
|------|----------|-----------|
| Blog Posts | Supabase Database | ✅ Yes |
| Projects | Supabase Database | ✅ Yes |
| Project Images | Supabase Storage | ✅ Yes |
| User Accounts | Supabase Auth | ✅ Yes |
| Admin Roles | Supabase Database | ✅ Yes |
| Frontend Code | Deployment Platform | ✅ Yes (after deployment) |

## 🎯 Summary

**You will NOT lose any functionality or data** when deploying because:

1. **Database is separate** - Supabase hosts your data independently
2. **Just need environment variables** - Connect your deployed site to the same Supabase project
3. **Same database, different frontend** - Your deployed site uses the same Supabase project as local development

Your blogs, projects, and all data will work exactly the same on the deployed site as they do locally!
