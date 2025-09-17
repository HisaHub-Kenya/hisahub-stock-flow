# Packaging the PWA as an Android APK (Capacitor / TWA)

This guide explains how to take the built Vite PWA (the `dist` produced by `npm run build`) and package it as an Android APK using Capacitor (recommended) or Trusted Web Activity (TWA) via pwabuilder.com. It also includes a short PWA readiness checklist.

**Quick summary**
- Build the production site: `npm run build` (creates `dist/`).
- Validate PWA manifest and service worker (already configured via `vite-plugin-pwa`).
- Use Capacitor to wrap the site and build an APK, or use PWABuilder/TWA for a lightweight wrapper.

---

## PWA Readiness Checklist
- `manifest.webmanifest` exists and contains `name`, `short_name`, `start_url`, `display: standalone`, `icons` (192x192 and 512x512), `theme_color` and `background_color`.
- Service worker registered and precaches assets. (`vite-plugin-pwa` is configured in `vite.config.ts`.)
- All important pages are reachable under the app `scope` (e.g. `/`).
- App works offline for key flows (cache strategy in `vite.config.ts` handles static assets and API caching via runtime caching rules).
- HTTPS hosting for the production PWA (required for installation). Vercel or other static hosts work fine.
- Fast first load (careful with very large JS bundles) — consider code-splitting/lazy-loading (already used in routes).

## Option A — Capacitor (recommended)

1. Install Capacitor in your project (run locally):

```powershell
npm install @capacitor/core @capacitor/cli --save
npx cap init hisahub com.hisahub.app --web-dir=dist
```

2. Build the web app and copy assets to the native project:

```powershell
npm run build
npx cap copy
```

3. Add Android platform and open Android Studio:

```powershell
npx cap add android
npx cap open android
```

4. In Android Studio:
  - Configure your package name, signing keys (for release), and target SDK.
  - Build an APK or App Bundle (recommended: AAB for Play Store).

Notes: Capacitor lets you add native plugins (e.g., secure storage) later if needed.

## Option B — TWA (Trusted Web Activity) via PWABuilder

1. Visit https://www.pwabuilder.com/ and enter your production site URL (must be HTTPS).
2. Follow the PWABuilder flow to generate a TWA project or an Android package.
3. Download the generated project and open it in Android Studio. Configure signing and build.

## Automating a build (CI)
- In CI you can produce `dist/` via `npm run build`, upload to a static host, and then run Capacitor steps on a machine with Android SDK installed.

## Quick local test before packaging
- Start preview server: `npm run preview` (we used port 4173 here)
- Use `public/dev-auth.html` or the Puppeteer seed script to simulate an authenticated user.

---

If you want, I can automate the Capacitor setup files here (add `capacitor.config.json`, add `@capacitor` deps in `package.json`), but building the Android project requires Android SDK + Android Studio which is not available in this environment. I can provide exact commands and an automated script you can run locally or in a CI runner with Android installed.
