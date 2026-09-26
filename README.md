# AI Career OS

AI Career OS is an AI-powered student career and placement platform that helps students understand target-job requirements, identify skill gaps, build personalized preparation roadmaps, manage projects/resumes, practice assessments, and track applications.

## V1 Goal

Build a reliable career operating system for students with a focused workflow:

1. Create account
2. Complete student profile
3. Select/measure skills
4. Add target jobs
5. Analyze job requirements against the student's profile
6. Generate a personalized roadmap
7. Track learning/progress
8. Practice DSA/aptitude/interview preparation
9. Maintain resume/project information
10. Track applications

## Recommended V1 Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query or RTK Query
- React Hook Form + Zod

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Redis for cache/rate limiting/session-related ephemeral data
- JWT access token + refresh token
- Zod/Joi for request validation

### AI Layer
Use a provider-agnostic AI service abstraction.

Possible responsibilities:
- Job description extraction
- Skill normalization
- Skill-gap explanation
- Roadmap generation
- Resume feedback
- Project recommendations
- Interview-question generation
- Answer evaluation
- Career-plan summaries

AI output must be treated as advisory data and validated before being persisted or shown as a hard fact.

## Repository Structure

```text
ai-career-os/
├── apps/
│   ├── web/
│   └── api/
├── services/
│   └── ai/
├── packages/
│   ├── shared-types/
│   ├── validation/
│   └── config/
├── docs/
│   ├── PRD.md
│   ├── SRS.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── SECURITY.md
│   └── DEVELOPMENT-ROADMAP.md
└── README.md
```

## Core V1 Principle

Start as a modular monolith. Keep domain boundaries clean so individual modules can later be extracted into services if scale or team ownership justifies it.

Do not begin with microservices merely because the product may eventually need horizontal scaling.

## Documentation

| Document | Purpose |
|---|---|
| `docs/PRD.md` | Product goals, users, features, scope and acceptance criteria |
| `docs/SRS.md` | Detailed functional/non-functional requirements |
| `docs/ARCHITECTURE.md` | System architecture, modules, data flow and scaling |
| `docs/DATABASE.md` | MongoDB collections, fields, indexes and relationships |
| `docs/API.md` | REST API contracts and endpoint design |
| `docs/UI-WIREFRAMES.md` | Screen-by-screen information architecture |
| `docs/SECURITY.md` | Authentication, authorization, validation and threat controls |
| `docs/DEVELOPMENT-ROADMAP.md` | Build sequence from setup to deployment |

## V1 Non-Goals

- Full autonomous job application submission
- Guaranteed employment outcomes
- Automated hiring decisions
- Fully autonomous career decisions
- Social network features
- Complex payroll/HR systems
- Native mobile application
- Microservice deployment from day one

## Development Philosophy

Build vertical slices rather than isolated infrastructure:

```text
Auth → Profile → Skills → Jobs → Gap Analysis → Roadmap → Practice → Resume → Applications
```

Each slice should include:
- database model
- validation
- controller/service
- API route
- frontend screen
- loading/error states
- tests
- authorization
- observability
