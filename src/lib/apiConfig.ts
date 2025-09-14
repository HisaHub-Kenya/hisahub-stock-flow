// Vite/browser-only API config
// This file should only be imported in browser code
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export default API_BASE_URL;
