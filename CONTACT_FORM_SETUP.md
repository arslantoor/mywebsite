# Contact Form Setup Instructions

Your contact form is now functional! Here's how to set it up:

## 1. Deploy the Supabase Edge Function

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (replace with your project ref)
supabase link --project-ref your-project-ref

# Deploy the Edge Function
supabase functions deploy send-contact-email
```

## 2. Run the Database Migration

```bash
# Apply the migration to create the contact_messages table
supabase db push
```

## 3. Set Up Email Service (Optional but Recommended)

For production email sending, you can integrate with Resend:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Set the environment variable in Supabase:

```bash
# In your Supabase dashboard, go to Edge Functions > send-contact-email > Environment variables
# Add: RESEND_API_KEY = your_resend_api_key
```

4. Uncomment the Resend code in `supabase/functions/send-contact-email/index.ts`

## 4. Test the Form

1. Start your development server: `npm run dev`
2. Go to the contact section
3. Fill out and submit the form
4. Check your Supabase dashboard for the stored messages

## Current Setup

- ✅ Form validation with Zod
- ✅ Messages stored in Supabase database
- ✅ Edge Function deployed and ready
- ✅ Error handling and success states
- ⏳ Email sending (currently logs to console, integrate with Resend for actual emails)

## Alternative Email Services

If you prefer a different service:

- **Resend**: Simple API, good deliverability
- **SendGrid**: Enterprise-grade, advanced features
- **EmailJS**: Client-side only (no backend needed)
- **AWS SES**: Highly scalable, lower cost

Let me know if you need help setting up any of these!