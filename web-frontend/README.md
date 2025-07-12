# HisaHub Web Frontend

This is the web frontend for HisaHub, built with React, TypeScript, and Vite. It provides a web-based interface for the Kenyan stock market platform.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Supabase** for backend services
- **React Router** for navigation
- **React Hook Form** for form handling
- **Zod** for validation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/hooks/` - Custom React hooks
- `src/contexts/` - React contexts
- `src/lib/` - Utility functions and configurations
- `src/integrations/` - External service integrations

## Environment Variables

Create a `.env` file in the root directory with your Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
``` 