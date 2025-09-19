# HisaHub Backend Diagnostic & Debugging Guide

## 1. How to Run the Diagnostic Script

```sh
chmod +x diagnose_backend.sh
./diagnose_backend.sh <backend_url> <login_endpoint> <email> <password>
# Example:
./diagnose_backend.sh http://localhost:8000 /api/auth/login/ test@example.com TestPass123!
```
- The script prints HTTP status, headers, and the first 500 bytes of the response body.
- It attempts to parse the response as JSON (using jq or Python fallback).
- It warns if the backend returns no data or a non-200 status.

## 2. Health Check Endpoint
- The backend exposes `/api/health/` which returns `{"status": "ok"}` if the server is alive.
- Test with:
```sh
curl -i http://localhost:8000/api/health/
```

## 3. Error Logging
- All unhandled exceptions are logged to both the console and `debug.log` in the backend root.
- Check `debug.log` for tracebacks and error details after any failure.

## 4. Django View Error Handling
- All login/signup views are wrapped in try/except and always return JSON.
- Example snippet for robust error handling:
```python
try:
    # ... your logic ...
except Exception as e:
    import traceback, logging
    logging.error(traceback.format_exc())
    return JsonResponse({'ok': False, 'error': str(e)}, status=500)
```

## 5. CORS & Content-Type
- Ensure `Access-Control-Allow-Origin` and `Content-Type: application/json` headers are present in responses.
- If missing, check Django CORS settings and view return types.

## 6. Frontend Debugging Tip
- Always log the raw response before parsing JSON:
```js
fetch(url, opts)
  .then(res => res.text())
  .then(text => {
    console.log('RAW RESPONSE:', text);
    try {
      const data = JSON.parse(text);
      // ...
    } catch (e) {
      console.error('Invalid JSON:', e);
    }
  });
```

## 7. Production Log Inspection
- In production, collect logs using your process manager (e.g., gunicorn, systemd, or cloud provider logs).
- Always check both stdout and error logs for crash details.

---

**If you see:**
- `❌ Backend returned no data, inspect view return statements` → Ensure your Django view always returns a Response/JsonResponse.
- `❌ Response is not valid JSON, may be HTML error page` → Check for unhandled exceptions or HTML error pages in your backend.
