# AI Career OS — System Architecture

## 1. Architecture Decision

### V1: Modular Monolith

Use one deployable backend application with strict domain modules.

```text
React Web
   |
   | HTTPS
   v
API / Node.js / Express
   |
   +-- Auth Module
   +-- Profile Module
   +-- Skill Module
   +-- Job Module
   +-- Gap Analysis Module
   +-- Roadmap Module
   +-- Project Module
   +-- Practice Module
   +-- Resume Module
   +-- Application Module
   +-- Notification Module
   +-- AI Orchestration Module
   |
   +------ MongoDB
   |
   +------ Redis
   |
   +------ Queue / Worker
              |
              +---- AI Provider
              +---- Email Provider
```

## 2. Why Not Microservices in V1?

The domain has many modules, but early development benefits from:
- simpler local development
- transactions across closely related operations
- fewer deployments
- simpler debugging
- lower infrastructure cost
- faster iteration

Design module boundaries now so extraction is possible later.

## 3. Backend Layering

```text
Route
  ↓
Controller
  ↓
Validation
  ↓
Service
  ↓
Repository / Model
  ↓
MongoDB
```

Cross-cutting:

```text
Request
 → requestId
 → security middleware
 → authentication
 → authorization
 → validation
 → controller
 → service
 → error handler
```

## 4. Suggested Backend Structure

```text
src/
├── app.ts
├── server.ts
├── config/
├── common/
│   ├── errors/
│   ├── middleware/
│   ├── logger/
│   └── utils/
├── modules/
│   ├── auth/
│   ├── profile/
│   ├── skills/
│   ├── jobs/
│   ├── gap-analysis/
│   ├── roadmaps/
│   ├── projects/
│   ├── practice/
│   ├── resumes/
│   ├── applications/
│   ├── notifications/
│   └── ai/
└── infrastructure/
    ├── database/
    ├── redis/
    ├── queue/
    ├── email/
    └── ai/
```

## 5. AI Architecture

Never let controllers directly depend on a specific AI vendor.

```text
AI Controller
    ↓
AI Service
    ↓
Prompt Builder
    ↓
Provider Interface
    ├── Provider A
    ├── Provider B
    └── Mock Provider
```

Every AI operation should have:
- schema-validated input
- versioned prompt
- structured output schema
- provider/model metadata
- retry policy
- timeout
- failure state

## 6. Core Data Flow

### Job Analysis

```text
Student Profile
      +
Student Skills
      +
Job
      ↓
Gap Analysis Service
      ↓
Deterministic skill comparison
      +
AI explanation
      ↓
Skill Gap Analysis Snapshot
```

Important: deterministic matching should be separated from AI explanation wherever possible.

### Roadmap

```text
Gap Analysis
     +
Availability
     +
Target Date
     +
Existing Projects
     ↓
Roadmap Generator
     ↓
Structured Roadmap
     ↓
Validation
     ↓
Persist
```

## 7. Authentication Flow

```text
Login
 ↓
Verify password
 ↓
Issue access token
 ↓
Issue refresh token
 ↓
Refresh token stored securely
 ↓
Access protected resources
```

Recommended:
- short-lived access token
- refresh token in secure HttpOnly cookie
- rotate refresh tokens where practical
- hash refresh token before persistence

## 8. Horizontal Scaling

The API should be stateless.

```text
             Load Balancer
             /     |     \
         API-1   API-2   API-3
             \     |     /
              MongoDB
                 |
               Redis
```

Avoid in-memory session state.

## 9. Background Processing

Use a queue for:
- AI analysis
- roadmap generation
- resume analysis
- email
- notifications
- long-running imports

Request pattern:

```text
POST /ai/gap-analysis
       ↓
create aiJob = queued
       ↓
return 202 + jobId
       ↓
worker processes job
       ↓
store result
       ↓
client polls or receives notification
```

## 10. Caching

Redis candidates:
- skill catalog
- frequently requested public metadata
- rate-limit counters
- short-lived AI status
- distributed locks where necessary

Do not use Redis as the primary source of truth for career records.

## 11. Deployment Evolution

### Stage 1
```text
Web → API → MongoDB
          ↓
        Redis
```

### Stage 2
```text
Web → Load Balancer → multiple API instances
                       ↓
                    MongoDB
                       ↓
                     Redis
                       ↓
                     Worker
```

### Stage 3

Extract only high-load or independently deployable domains, potentially:
- AI service
- notification service
- job ingestion service
- analytics service

## 12. Reliability

- health endpoint
- readiness endpoint
- graceful shutdown
- timeouts
- retry only idempotent operations
- circuit-breaker strategy for external AI/email providers
- dead-letter handling for failed jobs

## 13. API Versioning

Use:

```text
/api/v1/...
```

Do not break existing clients without a versioning/deprecation plan.

## 14. Architecture Principles

1. Domain boundaries before service boundaries.
2. Database is source of truth.
3. AI is an augmentation layer.
4. Authorization belongs on the server.
5. Long-running work is asynchronous.
6. Every important operation is observable.
7. Every external dependency has failure handling.
