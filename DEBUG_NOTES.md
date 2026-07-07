# Debug Notes

This document describes real issues encountered during developing the AI Powered Assistance and how they were resolved.

---

# Issue 1

## Problem

Uploaded PDF files failed during AI processing.

## Root Cause

PDF parsing library could not locate required standard font resources.

## Investigation

- Checked server logs.
- Verified uploaded files.
- Tested with different PDFs.
- Identified missing font configuration.

## Solution

Configured the PDF parser correctly and ensured required resources were available before processing documents.

---

# Issue 2

## Problem

JWT-protected routes always returned Unauthorized.

## Root Cause

Authorization header was not formatted correctly.

Expected:

```
Bearer <token>
```

Actual:

```
<token>
```

## Investigation

Checked request headers using Postman and browser developer tools.

## Solution

Updated frontend Axios interceptor to include:

```
Authorization: Bearer <JWT_TOKEN>
```

Authentication then worked correctly.

---

# Issue 3

## Problem

Uploaded documents were saved in MongoDB but did not appear in the frontend.

## Root Cause

Frontend expected a different response format than the backend returned.

## Investigation

Compared backend API responses with frontend rendering logic.

## Solution

Updated API response structure and adjusted frontend mapping accordingly.

---

# Issue 4

## Problem

Gemini API occasionally returned empty responses.

## Root Cause

Prompt formatting was inconsistent and document content exceeded practical limits.

## Investigation

Logged request payloads and reviewed Gemini API documentation.

## Solution

Improved prompt construction, truncated excessive content, and added fallback error handling.

---

# Lessons Learned

- Validate API contracts between frontend and backend.
- Always inspect request and response payloads.
- Use centralized error handling.
- Keep dependencies updated.
- Test APIs independently before frontend integration.
