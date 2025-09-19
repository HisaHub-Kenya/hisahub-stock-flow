#!/bin/bash
# Usage: ./diagnose_backend.sh <backend_url> <login_endpoint> <email> <password>
# Example: ./diagnose_backend.sh http://localhost:8000 /api/auth/login/ test@example.com TestPass123!

BACKEND_URL="$1"
LOGIN_ENDPOINT="$2"
EMAIL="$3"
PASSWORD="$4"

if [ -z "$BACKEND_URL" ] || [ -z "$LOGIN_ENDPOINT" ] || [ -z "$EMAIL" ] || [ -z "$PASSWORD" ]; then
  echo "Usage: $0 <backend_url> <login_endpoint> <email> <password>"
  exit 1
fi

TMPFILE=$(mktemp)

# 1. Run curl test and save raw response
curl -i -s -X POST "$BACKEND_URL$LOGIN_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" > "$TMPFILE"

# 2. Print HTTP status, headers, and first 500 bytes of body
STATUS=$(head -1 "$TMPFILE")
HEADERS=$(sed -n '/^HTTP\//,/^$/p' "$TMPFILE")
BODY=$(sed -n '/^$/,$p' "$TMPFILE" | tail -n +2 | head -c 500)

echo "---- HEADERS ----"
echo "$HEADERS"
echo "---- RAW BODY ----"
echo "$BODY"


# 3. Attempt to parse JSON and report result
echo "---- JSON PARSE ----"
if command -v jq >/dev/null 2>&1; then
  echo "$BODY" | jq . && echo "Valid JSON ✅" || echo "❌ Response is not valid JSON, may be HTML error page"
else
  # Fallback to Python for JSON validation
  if [ -n "$BODY" ]; then
    PARSED=$(echo "$BODY" | python3 -c "import sys, json; json.load(sys.stdin); print('Valid JSON ✅')" 2>/dev/null) || PARSED="❌ Response is not valid JSON, may be HTML error page"
    echo "$PARSED"
  else
    echo "❌ Backend returned no data, inspect view return statements"
  fi
fi

# 4. Print warning if status != 200 or body empty
if ! echo "$STATUS" | grep -q "200"; then
  echo "❌ Backend returned non-200 status: $STATUS"
fi
if [ -z "$BODY" ]; then
  echo "❌ Backend returned no data, inspect view return statements"
fi

rm "$TMPFILE"
