# AI Career OS — Database Design

## 1. Database

MongoDB is the primary database.

Database name example:

```text
ai_career_os
```

Use Mongoose schemas or an equivalent ODM.

## 2. Design Principles

- Keep authentication separate from career profile data.
- Prefer normalized reusable catalog entities.
- Use references for shared entities such as skills.
- Store analysis snapshots because source data can change.
- Keep AI-generated output versioned.
- Add indexes based on access patterns.
- Do not expose internal MongoDB IDs unnecessarily in public URLs.

---

# 3. Collection Schemas

## 3.1 User Collection

**Collection:** `users`

**Purpose:** Stores authentication and account-level information.

### Fields

```text
_id
email
passwordHash
role
isEmailVerified
refreshTokenHash
createdAt
updatedAt
```

### Field Definitions

| Field | Type | Required | Rules |
|---|---|---:|---|
| `_id` | ObjectId | yes | MongoDB generated ID |
| `email` | String | yes | lowercase, trimmed, unique |
| `passwordHash` | String | yes | Argon2id/bcrypt hash; never plaintext |
| `role` | String | yes | `student` or `admin` |
| `isEmailVerified` | Boolean | yes | default false |
| `refreshTokenHash` | String/null | no | hashed refresh-token representation |
| `createdAt` | Date | yes | UTC |
| `updatedAt` | Date | yes | UTC |

### Indexes

```text
unique: email
```

### Security Notes

Never return `passwordHash` or `refreshTokenHash` from normal API responses.

---

## 3.2 StudentProfile Collection

**Collection:** `studentProfiles`

**Purpose:** Stores student career and educational profile information.

### Fields

```text
_id
userId
personal
education
availability
links
bio
targetRole
createdAt
updatedAt
```

### Personal Object

```text
personal:
    name
    phone
    profileImage
```

### Education Object

```text
education:
    college
    degree
    branch
    graduationYear
    cgpa
```

### Availability Object

```text
availability:
    hoursPerDay
    preferredStartTime
    availableDays[]
```

### Links Object

```text
links:
    github
    linkedin
    portfolio
```

### Field Definitions

| Field | Type | Rules |
|---|---|---|
| `_id` | ObjectId | primary key |
| `userId` | ObjectId | ref `users`, unique |
| `personal.name` | String | required for completed profile |
| `personal.phone` | String | optional; normalized |
| `personal.profileImage` | String | optional URL |
| `education.college` | String | optional/required by product stage |
| `education.degree` | String | e.g. B.Tech |
| `education.branch` | String | e.g. Data Science |
| `education.graduationYear` | Number | four-digit year |
| `education.cgpa` | Number | bounded by institution scale |
| `availability.hoursPerDay` | Number | positive; product-configured maximum |
| `availability.preferredStartTime` | String | HH:mm |
| `availability.availableDays` | Array[String] | enum Mon-Sun |
| `links.github` | String | URL |
| `links.linkedin` | String | URL |
| `links.portfolio` | String | URL |
| `bio` | String | length limited |
| `targetRole` | String | e.g. Backend Developer |
| `createdAt` | Date | UTC |
| `updatedAt` | Date | UTC |

### Indexes

```text
unique: userId
```

### Relationship

```text
User 1 ───── 1 StudentProfile
```

---

## 3.3 SkillCatalog Collection

**Collection:** `skillCatalog`

**Purpose:** Stores reusable skills that students and jobs can reference.

### Fields

```text
_id
name
slug
category
description
isActive
createdAt
updatedAt
```

### Categories

```text
programming
frontend
backend
database
devops
cloud
data
ai
cs_fundamentals
soft_skill
other
```

### Example Skills

```text
JavaScript
React
Node.js
Express.js
MongoDB
SQL
C++
Python
DSA
System Design
Machine Learning
```

### Indexes

```text
unique: slug
index: category
index: isActive
```

---

## 3.4 StudentSkill Collection

**Collection:** `studentSkills`

**Purpose:** Connects students to skills and records their current proficiency.

### Fields

```text
_id
userId
skillId
proficiency
yearsExperience
source
evidence
lastAssessedAt
createdAt
updatedAt
```

### Proficiency

```text
beginner
elementary
intermediate
advanced
expert
```

### Source

```text
self_assessed
assessment
project
certificate
imported
```

### Indexes

```text
unique: { userId: 1, skillId: 1 }
index: { userId: 1, proficiency: 1 }
```

### Relationship

```text
User 1 ───── N StudentSkill N ───── 1 SkillCatalog
```

---

## 3.5 Job Collection

**Collection:** `jobs`

**Purpose:** Stores target jobs/opportunities and their structured requirements.

### Fields

```text
_id
ownerUserId
company
title
source
sourceUrl
location
workMode
employmentType
rawDescription
requirements
skills
status
postedAt
deadline
createdAt
updatedAt
```

### Company Object

```text
company:
    name
    website
```

### Requirements Object

```text
requirements:
    experienceMinYears
    education[]
    responsibilities[]
    requiredQualifications[]
```

### Skills Object

```text
skills:
    required[]
    preferred[]
```

Each skill item:

```text
skillId
nameSnapshot
importance
minimumProficiency
```

### Status

```text
saved
analyzed
applied
closed
archived
```

### Indexes

```text
index: ownerUserId
index: { ownerUserId: 1, status: 1 }
index: company.name
index: deadline
```

---

## 3.6 JobSkill Collection

**Collection:** `jobSkills`

**Purpose:** Optional normalized representation of job-to-skill requirements.

Use this when job skill queries become frequent; otherwise the embedded skill arrays in `jobs` are sufficient for early V1.

### Fields

```text
_id
jobId
skillId
requirementType
importance
minimumProficiency
createdAt
```

### Requirement Type

```text
required
preferred
```

### Index

```text
unique: { jobId: 1, skillId: 1, requirementType: 1 }
```

---

## 3.7 SkillGapAnalysis Collection

**Collection:** `skillGapAnalyses`

**Purpose:** Stores an immutable snapshot of a student-vs-job comparison.

### Fields

```text
_id
userId
jobId
analysisVersion
status
summary
coverage
skills
recommendations
aiMetadata
createdAt
completedAt
```

### Coverage Object

```text
coverage:
    requiredCount
    matchedCount
    partialCount
    missingCount
    percentage
```

### Skill Result

```text
skills[]:
    skillId
    skillNameSnapshot
    requirementType
    studentProficiency
    requiredProficiency
    status
    explanation
```

### Status

```text
queued
processing
completed
failed
```

### AI Metadata

```text
aiMetadata:
    provider
    model
    promptVersion
    latencyMs
```

### Important Rule

An analysis is a snapshot. If the student's profile changes later, do not silently mutate old analyses.

### Indexes

```text
index: { userId: 1, jobId: 1, createdAt: -1 }
index: status
```

---

## 3.8 Roadmap Collection

**Collection:** `roadmaps`

**Purpose:** Stores a student's career-learning plan.

### Fields

```text
_id
userId
jobId
analysisId
title
goal
status
startDate
targetDate
estimatedHours
progress
source
milestones[]
createdAt
updatedAt
```

### Status

```text
draft
active
paused
completed
archived
```

### Source

```text
ai_generated
manual
hybrid
```

### Milestone Object

```text
milestones[]:
    _id
    title
    description
    order
    estimatedHours
    status
    tasks[]
```

### Task Object

```text
tasks[]:
    _id
    title
    description
    type
    skillIds[]
    estimatedMinutes
    order
    dueDate
    status
    resourceLinks[]
```

### Task Type

```text
learn
practice
project
assessment
interview
resume
```

### Task Status

```text
todo
in_progress
completed
skipped
```

### Indexes

```text
index: { userId: 1, status: 1 }
index: { userId: 1, targetDate: 1 }
```

---

## 3.9 Project Collection

**Collection:** `projects`

**Purpose:** Stores student projects as evidence of practical skills.

### Fields

```text
_id
userId
title
description
status
role
technologies[]
skillIds[]
repositoryUrl
liveUrl
imageUrls[]
startDate
endDate
highlights[]
metrics[]
createdAt
updatedAt
```

### Status

```text
planned
in_progress
completed
archived
```

### Metric Object

```text
metrics[]:
    label
    value
```

### Indexes

```text
index: { userId: 1, status: 1 }
index: { userId: 1, skillIds: 1 }
```

---

## 3.10 Question Collection

**Collection:** `questions`

**Purpose:** Reusable practice question bank.

### Fields

```text
_id
type
category
topic
difficulty
question
options[]
answer
explanation
skillIds[]
source
isActive
createdAt
updatedAt
```

### Type

```text
mcq
coding
short_answer
behavioral
interview
```

### Category

```text
dsa
aptitude
cn
os
dbms
oops
system_design
javascript
react
backend
hr
behavioral
```

### Difficulty

```text
easy
medium
hard
```

### Security Rule

For MCQs, the correct answer should not be sent to the client before submission.

### Indexes

```text
index: { category: 1, topic: 1, difficulty: 1 }
index: { skillIds: 1 }
index: isActive
```

---

## 3.11 PracticeSession Collection

**Collection:** `practiceSessions`

**Purpose:** Represents one practice session.

### Fields

```text
_id
userId
category
mode
questionIds[]
startedAt
completedAt
score
totalQuestions
correctAnswers
status
createdAt
```

### Mode

```text
practice
mock_test
interview
```

### Status

```text
active
completed
abandoned
```

### Indexes

```text
index: { userId: 1, createdAt: -1 }
index: { userId: 1, category: 1 }
```

---

## 3.12 PracticeAttempt Collection

**Collection:** `practiceAttempts`

**Purpose:** Stores individual question responses.

### Fields

```text
_id
sessionId
userId
questionId
answer
isCorrect
timeSpentSeconds
feedback
createdAt
```

### Indexes

```text
unique: { sessionId: 1, questionId: 1 }
index: { userId: 1, questionId: 1 }
```

---

## 3.13 Resume Collection

**Collection:** `resumes`

**Purpose:** Stores structured resume versions.

### Fields

```text
_id
userId
name
version
summary
education[]
experience[]
skills[]
projects[]
certifications[]
achievements[]
template
isDefault
createdAt
updatedAt
```

### Education Entry

```text
institution
degree
branch
startDate
endDate
grade
description
```

### Experience Entry

```text
company
role
startDate
endDate
description
highlights[]
```

### Project Entry

```text
projectId
description
highlights[]
```

### Indexes

```text
unique: { userId: 1, version: 1 }
index: { userId: 1, isDefault: 1 }
```

---

## 3.14 ResumeAnalysis Collection

**Collection:** `resumeAnalyses`

**Purpose:** Stores resume-vs-job analysis snapshots.

### Fields

```text
_id
userId
resumeId
jobId
status
keywordMatches[]
missingKeywords[]
strengths[]
issues[]
suggestions[]
scoreBreakdown
aiMetadata
createdAt
completedAt
```

### Rule

The analysis is advisory and must not invent experience or qualifications.

---

## 3.15 Application Collection

**Collection:** `applications`

**Purpose:** Tracks a student's job application lifecycle.

### Fields

```text
_id
userId
jobId
companyNameSnapshot
jobTitleSnapshot
applicationUrl
status
appliedAt
nextAction
nextActionDate
notes
interviewStages[]
createdAt
updatedAt
```

### Status

```text
interested
applied
assessment
interview
offer
rejected
withdrawn
closed
```

### Interview Stage

```text
name
scheduledAt
status
notes
```

### Indexes

```text
index: { userId: 1, status: 1 }
index: { userId: 1, nextActionDate: 1 }
unique: { userId: 1, jobId: 1 }
```

---

## 3.16 AIJob Collection

**Collection:** `aiJobs`

**Purpose:** Tracks asynchronous AI operations.

### Fields

```text
_id
userId
type
status
inputRef
outputRef
provider
model
promptVersion
attempts
errorCode
startedAt
completedAt
createdAt
```

### Type

```text
job_parse
skill_gap
roadmap_generation
resume_analysis
interview_feedback
question_generation
```

### Status

```text
queued
processing
completed
failed
cancelled
```

### Indexes

```text
index: { userId: 1, createdAt: -1 }
index: { status: 1, createdAt: 1 }
```

---

## 3.17 Notification Collection

**Collection:** `notifications`

**Purpose:** User-facing reminders and system notifications.

### Fields

```text
_id
userId
type
title
message
data
isRead
readAt
createdAt
```

### Type

```text
roadmap_due
application_followup
practice_reminder
ai_completed
system
```

### Indexes

```text
index: { userId: 1, isRead: 1, createdAt: -1 }
```

---

# 4. Relationship Overview

```text
User
 ├── StudentProfile
 ├── StudentSkills ── SkillCatalog
 ├── Jobs
 │    ├── JobSkills ── SkillCatalog
 │    └── SkillGapAnalyses
 │           └── Roadmaps
 ├── Projects ── SkillCatalog
 ├── Resumes
 │    └── ResumeAnalyses ── Jobs
 ├── PracticeSessions
 │    └── PracticeAttempts ── Questions
 ├── Applications ── Jobs
 ├── AIJobs
 └── Notifications
```

# 5. Data Modeling Decision

Do not create a separate collection for every nested object. Embed data when it:
- belongs exclusively to its parent
- is read with the parent
- does not need independent querying

Reference data when it:
- is shared across users
- requires catalog-level updates
- has an independent lifecycle

# 6. Retention

Define retention policies before production:
- authentication/security logs: policy-driven
- AI job records: retain operational metadata; minimize sensitive prompt retention
- practice attempts: retain while account exists unless product policy says otherwise
- deleted user data: follow a documented deletion workflow
