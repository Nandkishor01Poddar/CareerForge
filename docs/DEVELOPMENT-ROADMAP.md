# AI Career OS — Development Roadmap

## Development Strategy

Build from a simple working V1 to a production-capable system.

Do not start by implementing microservices, Kubernetes, complex event choreography or a large AI agent framework.

---

# Phase 0 — Project Foundation

### Deliverables
- monorepo/repository structure
- TypeScript configuration
- frontend Vite app
- Express API
- environment configuration
- linting/formatting
- Git hooks if desired
- MongoDB connection
- health endpoint
- centralized error handler
- request ID
- logger

### Exit Criteria
```text
GET /api/v1/health → 200
web app → API connection works
MongoDB connection → healthy
```

---

# Phase 1 — Authentication

### Build
- User model
- register
- login
- logout
- refresh
- email verification
- password reset
- auth middleware
- role middleware

### Tests
- duplicate email
- wrong password
- refresh rotation
- logout
- unauthorized endpoint
- admin-only endpoint

---

# Phase 2 — Student Profile

### Build
- StudentProfile model
- profile CRUD
- education
- availability
- links
- target role
- profile completion calculation

### Frontend
- profile page
- multi-section form
- validation
- completion progress

---

# Phase 3 — Skills

### Build
- SkillCatalog
- StudentSkill
- skill search
- proficiency tracking
- admin seed/catalog endpoint

### Seed Data

Start with:
- JavaScript
- TypeScript
- React
- Node.js
- Express.js
- MongoDB
- SQL
- Redis
- Docker
- AWS
- C++
- Python
- DSA
- System Design
- Operating Systems
- Computer Networks
- DBMS
- Machine Learning

---

# Phase 4 — Jobs

### Build
- jobs CRUD
- raw job description
- structured requirements
- skill normalization
- job list/detail UI

### First AI Feature

Implement job parsing as an asynchronous AI job.

Flow:

```text
Paste JD
 → POST /jobs/:id/parse
 → AI Job queued
 → worker
 → structured requirements
 → validate output
 → update job
```

---

# Phase 5 — Deterministic Skill Gap Engine

Before relying heavily on AI, implement deterministic comparison.

### Example

```text
Required: Node.js — intermediate
Student: Node.js — intermediate
Result: matched

Required: Redis — intermediate
Student: Redis — absent
Result: missing
```

### Output

```text
matched
partial
missing
```

Then use AI for explanation and prioritization.

---

# Phase 6 — Roadmap Engine

### Build
- roadmap schema
- milestone/task model
- manual roadmap
- progress tracking

### AI

Input:
- target job
- skill gaps
- hours/day
- available days
- target date

Output:
- ordered learning milestones
- tasks
- estimates
- dependencies

Always validate generated output.

---

# Phase 7 — Projects

### Build
- project CRUD
- technology/skill mapping
- GitHub/demo URLs
- project evidence

### Important

Projects should be usable as evidence in:
- skill profile
- resume
- gap analysis

---

# Phase 8 — Practice Engine

### Build
- question bank
- practice sessions
- attempts
- scoring
- topic statistics

Start with MCQ and short-answer questions.

Add coding execution later as a separate capability.

---

# Phase 9 — Resume

### Build
- structured resume
- versioning
- project integration
- resume analysis

AI should identify:
- missing relevant keywords
- weak evidence
- unclear bullets
- duplicated information

Do not allow AI to invent facts.

---

# Phase 10 — Applications

### Build
- application CRUD
- status workflow
- next action
- reminders
- interview stages

Dashboard should surface upcoming actions.

---

# Phase 11 — Notifications

Implement:
- roadmap task reminders
- application follow-up reminders
- AI completion notifications

Use background workers.

---

# Phase 12 — Production Hardening

### Backend
- rate limits
- secure headers
- CORS
- validation
- authorization audit
- database indexes
- graceful shutdown
- health/readiness endpoints

### Testing
- unit tests
- integration tests
- API tests
- authorization tests
- critical frontend tests
- end-to-end smoke tests

### Observability
- structured logs
- request IDs
- error tracking
- latency metrics
- AI job metrics

---

# Phase 13 — Deployment

Example:

```text
GitHub
   ↓
CI
   ↓
Build
   ↓
Docker image
   ↓
Container registry
   ↓
Deployment
```

Possible infrastructure:

```text
Frontend → Vercel/CloudFront/etc.
API → container platform
MongoDB → MongoDB Atlas
Redis → managed Redis
Worker → container
Object storage → S3-compatible storage
```

Choose services based on budget and operational needs.

---

# Phase 14 — Scaling

Scale only after measuring bottlenecks.

Potential extraction order:

```text
1. AI Worker
2. Notification Worker
3. Job Ingestion
4. Analytics
```

The core career domain can remain a modular service until there is a clear reason to split it.

---

# Suggested 12-Week Build Plan

| Week | Focus |
|---|---|
| 1 | Foundation + architecture |
| 2 | Authentication |
| 3 | Student profile |
| 4 | Skills |
| 5 | Jobs |
| 6 | Skill-gap engine |
| 7 | AI job parsing + gap explanation |
| 8 | Roadmaps |
| 9 | Projects + resume |
| 10 | Practice |
| 11 | Applications + notifications |
| 12 | Testing + security + deployment |

## Definition of Done

A feature is not complete when the endpoint works.

A feature is complete when it has:

```text
Schema
Validation
Service
Controller
Route
Authorization
Frontend UI
Loading state
Error state
Tests
Logging
Documentation
```

## Git Workflow

Recommended:

```text
main
 └── develop
      ├── feature/auth
      ├── feature/profile
      ├── feature/skills
      └── feature/jobs
```

Use pull requests even for solo development when the project is intended for a portfolio.

## Final V1 Milestone

A student should be able to complete:

```text
Register
   ↓
Profile
   ↓
Skills
   ↓
Target Job
   ↓
Analyze Gap
   ↓
Generate Roadmap
   ↓
Complete Tasks
   ↓
Build/Link Projects
   ↓
Improve Resume
   ↓
Practice
   ↓
Track Application
```

That is the first complete product loop.
