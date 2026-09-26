# AI Career OS — Product Requirements Document

## 1. Product Overview

AI Career OS is a student-focused career and placement platform that converts a student's profile, skills, target jobs, projects, resume information and preparation activity into an actionable career plan.

The product addresses a fragmented workflow where students typically use separate tools for:
- understanding job requirements
- identifying missing skills
- finding projects
- preparing DSA and aptitude
- improving resumes
- practicing interviews
- tracking applications

AI Career OS combines these workflows into one system.

## 2. Problem Statement

Students frequently know that they want a job but do not have a structured answer to:

- What does this role require?
- Which requirements do I already satisfy?
- Which skills are missing?
- What should I learn first?
- Which projects demonstrate those skills?
- How should I prepare for assessments and interviews?
- Does my resume communicate my experience?
- Which applications need follow-up?

## 3. Target Users

### Primary: Student

A college student preparing for internships, placements or entry-level roles.

Typical goals:
- discover target roles
- understand job requirements
- close skill gaps
- build evidence through projects
- practice assessments
- improve resume
- track applications

### Secondary: Admin

Maintains platform-controlled catalogs and moderation/configuration data.

Admin is intentionally limited in V1.

## 4. Product Goals

### G1 — Career Profile
Allow students to maintain a structured profile containing education, links, availability, skills, projects and career targets.

### G2 — Job Understanding
Represent job descriptions in a structured way so requirements can be compared with student capabilities.

### G3 — Skill Gap Analysis
Calculate and explain the difference between target-job requirements and the student's current skills.

### G4 — Personalized Roadmap
Generate a sequenced plan based on skill gaps, available time, target role and student goals.

### G5 — Preparation
Provide structured DSA, aptitude, CS fundamentals and interview practice tracking.

### G6 — Career Evidence
Allow students to manage projects and resume content as evidence of skills.

### G7 — Application Tracking
Track target companies/jobs and application status.

## 5. V1 Feature Scope

### Authentication
- signup
- login
- logout
- refresh session
- email verification
- password reset
- role-based authorization

### Student Profile
- personal information
- education
- availability
- social/developer links
- bio
- target role

### Skills
- searchable skill catalog
- student skill selection
- proficiency level
- evidence/source
- last assessed date

### Jobs
- create/import job record
- company information
- role
- location/work mode
- description
- normalized required skills
- preferred skills
- experience/education requirements

### Gap Analysis
- compare student skills to job skills
- categorize matched, partial and missing skills
- explain gaps
- calculate a transparent coverage metric
- preserve analysis snapshot

### Roadmap
- AI-assisted roadmap generation
- ordered milestones
- tasks
- estimated effort
- status
- progress

### Projects
- project CRUD
- technologies/skills
- description
- links
- project status
- evidence mapping

### Preparation
- question bank
- practice sessions
- attempts
- DSA/aptitude/CS/interview categories
- progress summaries

### Resume
- structured resume profile
- resume versions
- resume-to-job analysis
- feedback history

### Applications
- application tracking
- status
- applied date
- next action
- notes

## 6. AI Features

AI is used as an assistance layer rather than as the source of truth.

### AI-01 Job Parsing
Input: raw job description.

Output:
- normalized title
- required skills
- preferred skills
- education requirements
- experience requirements
- responsibilities
- extracted keywords

### AI-02 Skill Gap Explanation
Input:
- student profile
- student skills
- target job

Output:
- matched skills
- partial skills
- missing skills
- rationale
- suggested evidence

### AI-03 Roadmap Generation
Input:
- skill gaps
- availability
- target role
- existing projects
- deadline

Output:
- milestones
- tasks
- sequence
- estimates
- dependencies

### AI-04 Resume Feedback
Input:
- structured resume
- target job

Output:
- missing keywords
- clarity issues
- evidence gaps
- suggested revisions

AI must not fabricate experience, education, employment, certifications or project claims.

## 7. User Stories

### Profile
- As a student, I want to create my career profile so that the platform understands my background.
- As a student, I want to update my availability so that roadmaps fit my schedule.

### Skills
- As a student, I want to record my skills and proficiency so that job gaps are meaningful.
- As a student, I want to see which skills I should strengthen.

### Jobs
- As a student, I want to save a job so that I can compare myself with it.
- As a student, I want to see extracted job requirements.

### Roadmap
- As a student, I want a prioritized roadmap so that I know what to work on next.
- As a student, I want to mark tasks complete and see progress.

### Preparation
- As a student, I want to practice questions and record attempts.
- As a student, I want to review weak topics.

### Applications
- As a student, I want to track applications and next actions.

## 8. Success Metrics

V1 product metrics:
- profile completion rate
- percentage of users with at least one target role
- number of jobs analyzed
- percentage of users who create a roadmap
- roadmap task completion rate
- practice sessions per active student
- applications tracked per active student
- weekly active students
- AI analysis completion/error rate

These metrics describe product usage; they are not guarantees of employment outcomes.

## 9. Functional Acceptance Criteria

A V1 release is acceptable when:

- A student can register and authenticate securely.
- A student can complete a profile.
- A student can add skills with proficiency.
- A student can create/save a target job.
- The system can normalize job skills.
- A gap analysis can be generated and stored.
- A roadmap can be generated from a gap analysis.
- Roadmap tasks can be updated.
- A student can add projects.
- A student can practice questions and see progress.
- A student can maintain resume information.
- A student can track applications.
- Unauthorized users cannot access another student's private data.
- Core API flows have automated tests.
- Production deployment has logging, rate limiting and error handling.

## 10. V1 Out of Scope

- automatic application submission
- recruiter marketplace
- employer ATS integration
- salary negotiation automation
- autonomous agent that applies to jobs
- guaranteed job recommendations
- hiring decisions
- public student ranking
- social feed
