# HisaHub — Local Setup, Build & Debug Guide

This README documents the common commands and troubleshooting steps to install, build, preview, and debug the frontend (`React + Vite`) for this repository on Windows PowerShell. It also includes checks for routing/auth issues (redirects to `/auth` or `/home`) and a short Vercel deployment checklist.

**Quick Notes**
- **Project root:**: `C:\Users\Ian\OneDrive\Desktop\MVP\hisahub-stock-flow`
- **Shell (Windows):**: PowerShell (use PowerShell commands below)
- **Important:**: OneDrive can lock files and cause `ENOTEMPTY` errors. Consider pausing OneDrive or moving the repo outside OneDrive while installing.

**Commands (PowerShell)**
- **Check Node & npm versions:**
  - `node --version; npm --version`
- **Remove node modules and lockfile (force):**
  - `Remove-Item -LiteralPath .\node_modules -Recurse -Force`
  - `Remove-Item -LiteralPath .\package-lock.json -Force`
- **Clean npm cache:**
  - `npm cache clean --force`
- **Install dependencies:**
  - `npm install`
- **Build production:**
  - `npm run build`
- **Preview build (local static server):**
  - `npm run preview`

If you prefer a one-line sequence (run inside project root):
```
Remove-Item -LiteralPath .\node_modules -Recurse -Force; Remove-Item -LiteralPath .\package-lock.json -Force; npm cache clean --force; npm install; npm run build; npm run preview
```

**Common Problems & Fixes**
- **ENOTEMPTY / rmdir errors while removing `node_modules`**:
  - Likely cause: OneDrive or another process locking files. Fixes:
    - Pause OneDrive syncing (right-click OneDrive tray icon → Pause syncing) or stop OneDrive with: `Stop-Process -Name OneDrive -Force` (may require admin).
    - Close VS Code / other editors that might lock files.
    - Re-run the remove commands above.
    - If still failing, reboot and then immediately remove `node_modules` before opening apps.
- **`'vite' is not recognized as an internal or external command` during `npm run build`**:
  - Cause: dependencies not installed or `node_modules/.bin` not present. Fixes:
    - Ensure `npm install` completes successfully (check the output for errors).
    - Run `npx vite --version` as a sanity check. If `npx` works, `npm run build` should work too.
- **Permission denied or access errors on Windows**:
  - Try running PowerShell as Administrator, or use the above removal steps after reboot.

**Testing Routing & Auth Redirects (what to check)**
- **Verify the frontend server or preview runs**: after `npm run preview` open the URL printed in the terminal (commonly `http://localhost:5173` or `http://localhost:8080` depending on Vite config).
- **Test deep links (should load the SPA and client route)**:
  - `http://localhost:5173/` (root)
  - `http://localhost:5173/trade` (example deep link)
  - `http://localhost:5173/auth`
- **If a route returns 404 from the server instead of the app**: server rewrite is not configured (Vercel requires `rewrites` to serve `index.html`). This repo already includes `vercel.json` with a SPA rewrite mapping `/(.*)` → `/index.html`.
- **If the app opens but redirects to `/auth` unexpectedly**:
  - Open DevTools → Application → Local Storage and inspect keys and values that look like authentication tokens (or run `Object.keys(localStorage)` in Console).
  - In Console, check for errors and in Network tab watch calls to `${VITE_API_URL}/auth/*` (look for `GET /auth/me` or similar). If backend is unreachable, the frontend may show fallback/mock behavior or redirect.
  - Temporarily open DevTools Console and run: `Object.keys(localStorage).forEach(k => console.log(k, localStorage.getItem(k)))` to inspect stored auth data.

**Dev helper: seed authenticated user (no backend required)**
- A development helper page is included at `public/dev-auth.html`. When the preview server is running you can open:
  - `http://localhost:5173/dev-auth.html` (or replace `5173` with the preview port shown in your terminal)
- Click **Seed Auth & Open App** to write demo `access_token`, `refresh_token`, and `user` into `localStorage` and then redirect to `/` so you can test authenticated routes without a backend.


**Vercel Deployment Checklist**
- **`vercel.json`**: This project already contains a `vercel.json` configured with a `rewrites` entry to serve `index.html` for all client routes. Keep that file in the repo.
- **Environment variables**: In the Vercel project settings, set `VITE_API_URL` to your backend API (e.g. `https://your-backend.example.com/api`). If `VITE_API_URL` points to `localhost` in production, the app may fall back to mock auth behavior.
- **Build settings**: Build command: `npm run build`. Output Directory: `dist`.

**Backend (Django) Notes**
- The `backend/` folder in this workspace is empty. To fully exercise authentication and redirects you need a running Django backend that provides the expected API endpoints (e.g. `/api/auth/login`, `/api/auth/me`, `/api/...`).
- Typical steps to run Django locally (if you add the backend code):
  - `python -m venv venv`
  - `.\\venv\\Scripts\\Activate.ps1`
  - `pip install -r requirements.txt`
  - `python manage.py migrate`
  - `python manage.py runserver 127.0.0.1:8000`

**Gathering Helpful Debug Information**
- If you still have problems, capture and paste these outputs:
  - Full terminal output from `npm install` and `npm run build`.
  - Browser Console errors and Network requests (screenshots or HAR export).
  - Result of `Object.keys(localStorage)` from the browser Console.

**If you want me to run commands here**
- I can attempt the cleanup/install/build in this environment, but Windows/OneDrive file locks and environment-specific issues may prevent a successful run. If you'd like me to try again, tell me and I will retry the PowerShell sequence here and capture the full logs.

**Dev automation: seed auth and minimal backend**
- Run the Puppeteer seed script (requires Node dependencies installed):
  - `npm run seed-auth` (defaults to `http://localhost:4173` — set `PREVIEW_URL` env var to change)
  - Or use PowerShell wrapper: `.\scripts\seed-auth.ps1 -PreviewUrl http://localhost:4173`
- Minimal Django backend scaffold is in `backend/`. To run it follow `backend/README.md`.

If you prefer, I can also add a short troubleshooting script (PowerShell) that attempts to pause OneDrive, remove `node_modules`, and run install/build — tell me if you'd like that and I will add it.

---
Generated by GitHub Copilot (assistant) — concise local build and debug checklist for Windows PowerShell.
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9804dee2-d562-4299-989f-83c25d959f31

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9804dee2-d562-4299-989f-83c25d959f31) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9804dee2-d562-4299-989f-83c25d959f31) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
