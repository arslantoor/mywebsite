# Muhammad Arslan Toor - Portfolio

Portfolio website showcasing projects, technical expertise, and insights from a Senior AI Engineer specializing in Agentic Workflows, Neural Frameworks, and production-grade ML systems.

## About

This is the personal portfolio website of **Muhammad Arslan Toor**, a Senior AI Engineer with 6+ years of experience in AI/ML engineering. The portfolio features:

- **Projects Showcase**: AI systems, agentic workflows, and neural frameworks
- **Tech Stack**: Comprehensive display of technical expertise
- **Blog**: Insights, tutorials, and deep-dives into AI engineering
- **Interactive Chatbot**: AI assistant answering questions about experience and projects
- **Contact Form**: Direct communication channel

## Technologies

This project is built with:

- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library
- **shadcn-ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Supabase** - Backend (PostgreSQL, Auth, Storage)
- **TanStack Query** - Data fetching and caching
- **TipTap** - Rich text editor

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd neural-command

# Step 3: Install dependencies
npm install

# Step 4: Set up environment variables
# Create a .env file with your Supabase credentials
# See GET_SUPABASE_CREDENTIALS.md for detailed instructions
# 
# Copy .env.example to .env and fill in your values:
# cp .env.example .env
# 
# Then edit .env with your Supabase credentials from:
# https://app.supabase.com → Your Project → Settings → API

# Step 5: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
neural-command/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── integrations/  # External service integrations
│   └── lib/           # Utility functions
├── supabase/          # Database migrations
└── public/            # Static assets
```

## Features

- **Fully Responsive**: Mobile to 4K display support
- **Neural Network Background**: Animated particle system
- **Project Management**: Admin dashboard for managing projects and blog posts
- **Blog System**: Rich text editor with publish/draft functionality
- **AI Chatbot**: Interactive assistant powered by rule-based responses
- **Authentication**: Role-based access control (Admin/User)

## Deployment

This project can be deployed to any static hosting service. **Your database, blogs, and projects are stored in Supabase and will persist after deployment.**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Set environment variables** on your deployment platform:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon key

2. **Deploy to your preferred platform:**
   - **Vercel**: Connect GitHub repo → Add env vars → Deploy
   - **Netlify**: Connect GitHub repo → Add env vars → Deploy
   - **Cloudflare Pages**: Connect GitHub repo → Add env vars → Deploy

**Important:** Your Supabase database is separate from the deployment platform, so all your data (blogs, projects, images) will remain intact!

## License

© 2026 Muhammad Arslan Toor. All rights reserved.
