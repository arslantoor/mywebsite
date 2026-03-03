# How to Get Your Supabase Credentials

Since your project was set up by Lovable, you need to retrieve your Supabase credentials from the Supabase dashboard. Here's how:

## 📋 Your Project Information

I found your Supabase project ID: `eramkykeshqyvfncyhxs`

## 🔑 Step-by-Step Guide

### Step 1: Access Supabase Dashboard

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. **Sign in** with the same account that Lovable used (or the account you have access to)

### Step 2: Find Your Project

1. You should see a list of projects in your dashboard
2. Look for a project with ID: `eramkykeshqyvfncyhxs`
   - Or look for a project name that matches your portfolio
   - If you don't see it, check if you're logged into the correct account

### Step 3: Get Your Credentials

1. **Click on your project** to open it

2. **Go to Settings**:
   - Click the ⚙️ **Settings** icon in the left sidebar
   - Or click on **Project Settings** at the bottom of the sidebar

3. **Navigate to API**:
   - In the Settings menu, click on **API**

4. **Copy Your Credentials**:

   You'll see a section called **Project API keys** with two important values:

   #### a) Project URL
   - Look for **Project URL** or **API URL**
   - It will look like: `https://eramkykeshqyvfncyhxs.supabase.co`
   - **Copy this entire URL** → This is your `VITE_SUPABASE_URL`

   #### b) Anon/Public Key
   - Look for **anon public** key (it's the one that's safe to use in frontend)
   - It's a long string starting with `eyJ...`
   - **Copy this entire key** → This is your `VITE_SUPABASE_PUBLISHABLE_KEY`

   ⚠️ **Important**: Use the **anon public** key, NOT the **service_role** key (which is secret)

## 📝 Visual Guide

```
Supabase Dashboard
├── Projects
│   └── Your Project (ID: eramkykeshqyvfncyhxs)
│       └── Settings ⚙️
│           └── API
│               ├── Project URL → VITE_SUPABASE_URL
│               └── anon public → VITE_SUPABASE_PUBLISHABLE_KEY
```

## 🔍 Alternative: Check Browser Network Tab

If you can't access the Supabase dashboard, you can also find these values:

1. **Open your portfolio** in the browser (if it's running locally)
2. **Open Developer Tools** (F12 or Right-click → Inspect)
3. **Go to Network tab**
4. **Look for requests to Supabase** (they'll have `supabase.co` in the URL)
5. **Check the request headers** - you'll see the URL and key being used

## 📋 What You Should Have

After following these steps, you should have:

```env
VITE_SUPABASE_URL=https://eramkykeshqyvfncyhxs.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ✅ Verify Your Credentials

To test if your credentials are correct:

1. Create a `.env` file in your project root:
   ```env
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_PUBLISHABLE_KEY=your_key_here
   ```

2. Run your dev server:
   ```bash
   npm run dev
   ```

3. Check if:
   - Projects load on the homepage
   - Blog posts appear
   - No errors in browser console

## 🚨 Troubleshooting

### "I can't find my project in Supabase"

**Possible reasons:**
- You're logged into a different account than Lovable used
- The project might be under a team/organization account
- Check if Lovable sent you any Supabase credentials via email

**Solutions:**
- Try logging in with different email addresses
- Check if you have access to any Supabase projects
- Contact Lovable support if you need access

### "I see the project but can't access Settings"

- Make sure you have **Owner** or **Admin** permissions on the project
- If you're a collaborator, you might need to ask the project owner for credentials

### "The credentials don't work"

- Double-check you copied the **entire** URL and key (they're long!)
- Make sure you're using the **anon public** key, not service_role
- Verify there are no extra spaces when pasting

## 🎯 Next Steps

Once you have your credentials:

1. **For Local Development**: Add them to a `.env` file (don't commit this!)
2. **For Deployment**: Add them as environment variables on Vercel/Netlify/etc.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## 💡 Pro Tip

If you're having trouble accessing Supabase, you can also:
- Check your email for any Supabase account creation emails
- Look for Supabase credentials in Lovable's project settings (if accessible)
- Create a new Supabase project and migrate your data (more work, but always an option)
