// Mock import.meta.env for Jest
Object.defineProperty(global, 'importMeta', {
  value: {
    env: {
      PROD: false,
      DEV: true,
      VITE_API_URL: 'http://localhost:3000',
      // Add other env vars as needed
    }
  },
  writable: true,
});

// Polyfill import.meta for modules
Object.defineProperty(global, 'import', {
  value: {},
  writable: true,
});
