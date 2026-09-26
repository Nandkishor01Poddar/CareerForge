# AI Career OS — Software Requirements Specification

## 1. System Scope

The system consists of:
- Web client
- REST API
- MongoDB persistence
- Redis-backed ephemeral services
- AI provider abstraction
- background job processing where required

## 2. Actors

| Actor | Permissions |
|---|---|
| Student | Own profile, skills, jobs, analyses, roadmap, projects, practice, resume and applications |
| Admin | Catalog/configuration/moderation functions |
| AI Service | Processes explicitly requested AI jobs; no direct user authorization |
| System Worker | Executes asynchronous jobs |

## 3. Functional Requirements

### FR-AUTH
- FR-AUTH-01 Register with unique email.
- FR-AUTH-02 Store only password hashes.
- FR-AUTH-03 Verify email.
- FR-AUTH-04 Login returns short-lived access token/session and refresh mechanism.
- FR-AUTH-05 Logout invalidates refresh capability.
- FR-AUTH-06 Password reset uses time-limited token.
- FR-AUTH-07 Protected endpoints require authentication.
- FR-AUTH-08 Role checks are enforced server-side.

### FR-PROFILE
- FR-PROFILE-01 Create one primary student profile per user.
- FR-PROFILE-02 Update personal information.
- FR-PROFILE-03 Update education.
- FR-PROFILE-04 Update availability.
- FR-PROFILE-05 Store public links.
- FR-PROFILE-06 Store target career role.

### FR-SKILL
- FR-SKILL-01 Search active skill catalog.
- FR-SKILL-02 Add skill to student profile.
- FR-SKILL-03 Update proficiency.
- FR-SKILL-04 Remove skill.
- FR-SKILL-05 Prevent duplicate user-skill records.

### FR-JOB
- FR-JOB-01 Create a job record.
- FR-JOB-02 Save raw job description.
- FR-JOB-03 Extract/normalize skills.
- FR-JOB-04 Update job status.
- FR-JOB-05 List a student's target jobs.

### FR-GAP
- FR-GAP-01 Generate analysis from student and job snapshot.
- FR-GAP-02 Classify skills as matched, partial or missing.
- FR-GAP-03 Store analysis version and source.
- FR-GAP-04 Explain each identified gap.
- FR-GAP-05 Do not silently overwrite previous analyses.

### FR-ROADMAP
- FR-ROADMAP-01 Create roadmap from analysis.
- FR-ROADMAP-02 Store milestones and tasks.
- FR-ROADMAP-03 Track task status.
- FR-ROADMAP-04 Record estimated effort.
- FR-ROADMAP-05 Calculate progress from task state.
- FR-ROADMAP-06 Allow manual edits to AI-generated plans.

### FR-PROJECT
- FR-PROJECT-01 Create project.
- FR-PROJECT-02 Map projects to skills.
- FR-PROJECT-03 Store repository/demo links.
- FR-PROJECT-04 Mark project status.
- FR-PROJECT-05 Associate projects with resume evidence.

### FR-PRACTICE
- FR-PRACTICE-01 Store reusable questions.
- FR-PRACTICE-02 Start practice session.
- FR-PRACTICE-03 Record attempts.
- FR-PRACTICE-04 Track topic-level performance.
- FR-PRACTICE-05 Allow interview/AI feedback where enabled.

### FR-RESUME
- FR-RESUME-01 Store structured resume data.
- FR-RESUME-02 Support multiple versions.
- FR-RESUME-03 Analyze resume against a target job.
- FR-RESUME-04 Store feedback snapshots.

### FR-APPLICATION
- FR-APPLICATION-01 Create application record.
- FR-APPLICATION-02 Track application status.
- FR-APPLICATION-03 Record next action/date.
- FR-APPLICATION-04 Store notes.
- FR-APPLICATION-05 Prevent cross-user access.

## 4. Non-Functional Requirements

### Performance
- Standard read API p95 target: < 500 ms under expected V1 load.
- Standard write API p95 target: < 800 ms excluding external AI processing.
- AI operations are asynchronous where latency may be significant.

### Availability
- Graceful handling of MongoDB/Redis/AI provider failures.
- No single external AI request should block unrelated application operations.

### Security
- Password hashing
- authorization on every private resource
- input validation
- rate limiting
- secure headers
- CORS allowlist
- secrets outside source control
- audit logging for security-sensitive operations

### Scalability
- Stateless API instances
- shared MongoDB
- Redis for distributed ephemeral state
- background workers for long-running tasks

### Maintainability
- TypeScript
- modular domain structure
- service/repository separation where useful
- centralized validation/error handling
- automated tests

## 5. Error Handling

Standard response shape:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Job not found",
    "details": []
  },
  "requestId": "req_123"
}
```

## 6. Observability

Every request should have:
- request ID
- structured logs
- duration
- status code
- route
- user ID where authenticated

Never log:
- passwords
- raw refresh tokens
- OTP values
- authorization headers
- sensitive AI prompts containing unnecessary personal data

## 7. Data Ownership

Student-owned resources must contain `userId` or a relationship that can be resolved to the owning user.

Authorization must be based on authenticated identity, not client-supplied ownership fields.

## 8. Consistency Rules

- `users.email` is unique.
- `studentProfiles.userId` is unique.
- `studentSkills` has a unique `(userId, skillId)`.
- IDs are MongoDB ObjectIds.
- Timestamps use UTC.
- Soft deletion should be used only where product requirements justify it; do not add it to every collection automatically.
