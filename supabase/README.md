# HisaHub Database (Supabase)

This directory contains the Supabase configuration for HisaHub's database, authentication, and real-time features.

## What is Supabase?

Supabase is an open-source Firebase alternative that provides:
- **PostgreSQL Database** - Reliable, scalable database
- **Authentication** - User management and auth flows
- **Real-time Subscriptions** - Live data updates
- **Storage** - File uploads and management
- **Edge Functions** - Serverless functions

## Setup

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Start local development:
   ```bash
   supabase start
   ```

4. Apply migrations:
   ```bash
   supabase db reset
   ```

## Database Schema

The database includes tables for:
- Users and authentication
- Stock data and prices
- User portfolios and transactions
- News and social content
- AI assistant interactions

## Environment Variables

Set these environment variables in your applications:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Development Workflow

1. **Schema Changes**: Edit migration files in `supabase/migrations/`
2. **Apply Changes**: Run `supabase db reset` to apply migrations
3. **Test Locally**: Use `supabase start` for local development
4. **Deploy**: Use `supabase db push` to deploy to production

## Useful Commands

- `supabase start` - Start local development
- `supabase stop` - Stop local development
- `supabase status` - Check local status
- `supabase db reset` - Reset and apply all migrations
- `supabase db push` - Push schema to remote
- `supabase functions serve` - Serve edge functions locally 