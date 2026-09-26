# AI Career OS — API Specification

Base URL:

```text
/api/v1
```

## 1. Response Convention

### Success

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": []
  },
  "requestId": "req_123"
}
```

## 2. Authentication

### POST `/auth/register`

Create account.

Request:

```json
{
  "email": "student@example.com",
  "password": "StrongPassword123!"
}
```

### POST `/auth/login`

Authenticate user.

### POST `/auth/refresh`

Rotate/refresh access credentials.

### POST `/auth/logout`

Invalidate refresh capability.

### POST `/auth/verify-email`

Verify email using token/OTP.

### POST `/auth/forgot-password`

Request password reset.

### POST `/auth/reset-password`

Reset password using a valid reset token.

### GET `/auth/me`

Return authenticated user.

---

# 3. Profile APIs

### GET `/profile`

Get current student profile.

### POST `/profile`

Create profile.

### PATCH `/profile`

Update profile.

### DELETE `/profile`

Delete profile data according to account deletion policy.

---

# 4. Skill APIs

### GET `/skills`

Query active skill catalog.

Query examples:

```text
GET /skills?search=react&category=frontend
```

### GET `/me/skills`

Get student's skills.

### POST `/me/skills`

```json
{
  "skillId": "ObjectId",
  "proficiency": "intermediate",
  "source": "self_assessed"
}
```

### PATCH `/me/skills/:id`

Update proficiency/evidence.

### DELETE `/me/skills/:id`

Remove skill.

---

# 5. Job APIs

### POST `/jobs`

Create target job.

### GET `/jobs`

List student's jobs.

### GET `/jobs/:id`

Get job.

### PATCH `/jobs/:id`

Update job.

### DELETE `/jobs/:id`

Delete/archive job.

### POST `/jobs/:id/parse`

Start job-description parsing.

Response:

```json
{
  "success": true,
  "data": {
    "jobId": "ObjectId",
    "aiJobId": "ObjectId",
    "status": "queued"
  }
}
```

---

# 6. Gap Analysis APIs

### POST `/jobs/:jobId/gap-analysis`

Start analysis.

Response status:

```text
202 Accepted
```

### GET `/gap-analyses/:id`

Get analysis status/result.

### GET `/jobs/:jobId/gap-analyses`

List previous snapshots.

---

# 7. Roadmap APIs

### POST `/roadmaps`

Create manual or AI-generated roadmap.

### POST `/roadmaps/generate`

Request:

```json
{
  "jobId": "ObjectId",
  "analysisId": "ObjectId",
  "targetDate": "2026-12-01"
}
```

### GET `/roadmaps`

List roadmaps.

### GET `/roadmaps/:id`

Get roadmap.

### PATCH `/roadmaps/:id`

Update roadmap metadata.

### PATCH `/roadmaps/:roadmapId/tasks/:taskId`

Update task state.

---

# 8. Project APIs

### GET `/projects`

List projects.

### POST `/projects`

Create project.

### GET `/projects/:id`

Get project.

### PATCH `/projects/:id`

Update project.

### DELETE `/projects/:id`

Delete project.

---

# 9. Practice APIs

### GET `/questions`

Query questions.

Do not expose correct answers before submission.

### POST `/practice-sessions`

Start session.

### GET `/practice-sessions/:id`

Get session.

### POST `/practice-sessions/:id/attempts`

Submit an answer.

### POST `/practice-sessions/:id/complete`

Complete session.

### GET `/practice/stats`

Get aggregated practice statistics.

---

# 10. Resume APIs

### GET `/resumes`

List versions.

### POST `/resumes`

Create resume version.

### GET `/resumes/:id`

Get resume.

### PATCH `/resumes/:id`

Update resume.

### DELETE `/resumes/:id`

Delete resume.

### POST `/resumes/:id/analyze`

Analyze against a job.

---

# 11. Application APIs

### GET `/applications`

List applications.

### POST `/applications`

Create application.

### GET `/applications/:id`

Get application.

### PATCH `/applications/:id`

Update application.

### DELETE `/applications/:id`

Delete/archive application.

---

# 12. AI Job APIs

### GET `/ai-jobs/:id`

Get asynchronous operation status.

Response:

```json
{
  "success": true,
  "data": {
    "id": "ObjectId",
    "type": "skill_gap",
    "status": "completed",
    "resultId": "ObjectId"
  }
}
```

---

# 13. Admin APIs

Admin-only:

```text
GET    /admin/skills
POST   /admin/skills
PATCH  /admin/skills/:id
DELETE /admin/skills/:id
```

Additional admin APIs should be added only when the use case is defined.

# 14. HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Successful read/update |
| 201 | Resource created |
| 202 | Async operation accepted |
| 204 | Successful deletion with no body |
| 400 | Invalid request |
| 401 | Unauthenticated |
| 403 | Unauthorized |
| 404 | Resource not found |
| 409 | Conflict |
| 422 | Semantic validation failure |
| 429 | Rate limited |
| 500 | Internal error |
| 502/503 | External dependency failure |

# 15. Pagination

Recommended:

```text
GET /jobs?page=1&limit=20&sort=-createdAt
```

Response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

# 16. Authorization Rule

Every resource query must be scoped to the authenticated user unless the endpoint is explicitly public/admin.

Never trust:

```json
{ "userId": "..." }
```

from the client as proof of ownership.
