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
# Create a .env file with your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key

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

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **Cloudflare Pages**: Connect repository and deploy
- **AWS S3 + CloudFront**: Upload build files to S3 bucket

After building with `npm run build`, deploy the `dist` folder.

## License

© 2026 Muhammad Arslan Toor. All rights reserved.
