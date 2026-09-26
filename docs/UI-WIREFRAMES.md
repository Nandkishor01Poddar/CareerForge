# AI Career OS — UI Wireframes

## 1. Information Architecture

```text
Public
├── Landing
├── Login
├── Register
└── Forgot Password

Authenticated
├── Dashboard
├── Career Profile
│   ├── Personal
│   ├── Education
│   ├── Availability
│   ├── Skills
│   └── Links
├── Jobs
│   ├── Job List
│   ├── Add Job
│   ├── Job Detail
│   └── Gap Analysis
├── Roadmaps
│   ├── Roadmap List
│   └── Roadmap Detail
├── Practice
│   ├── Practice Home
│   ├── Session
│   └── Results
├── Projects
├── Resume
└── Applications
```

# 2. Dashboard

```text
┌─────────────────────────────────────────────────────────────┐
│ AI Career OS                         Profile  Notifications │
├──────────────┬──────────────────────────────────────────────┤
│ Dashboard    │ Welcome, Student                             │
│ Profile      │                                              │
│ Skills       │ Career Progress                              │
│ Jobs         │ [ Profile 80% ] [ Skills 65% ] [ Roadmap ]  │
│ Roadmaps     │                                              │
│ Practice     │ Target Role                                  │
│ Projects     │ Backend Developer                            │
│ Resume       │                                              │
│ Applications │ Today's Focus                               │
│              │ 1. Complete Node.js task                     │
│              │ 2. Solve 2 DSA questions                     │
│              │ 3. Review application                        │
│              │                                              │
│              │ Upcoming                                      │
│              │ Roadmap / Application follow-up              │
└──────────────┴──────────────────────────────────────────────┘
```

## 3. Career Profile

Sections:
- completion progress
- personal
- education
- availability
- links
- target role

UX requirements:
- autosave only where safe
- explicit Save action for complex forms
- validation close to fields
- clear completion indicators

## 4. Skills Screen

```text
Skills
------------------------------------------------
Search skill [ React                  ]

Current Skills
React             Intermediate     Edit
Node.js           Beginner         Edit
MongoDB           Intermediate     Edit

[ + Add Skill ]

Suggested for Backend Developer
Express.js
Redis
System Design
SQL
```

## 5. Job Detail

```text
Backend Developer — Example Company
------------------------------------------------
Location: Remote
Type: Full-time

Required Skills
✓ Node.js
✓ Express.js
! SQL
! Redis

Your Match
Matched: 2
Partial: 0
Missing: 2

[ Analyze Skill Gap ]
[ Generate Roadmap ]
```

Avoid presenting a single opaque "hireability score." Show the underlying evidence and requirements.

## 6. Gap Analysis

```text
Skill Gap Analysis
------------------------------------------------
Required skills: 8
Matched: 5
Partial: 1
Missing: 2

MATCHED
✓ Node.js
✓ Express.js

PARTIAL
~ System Design

MISSING
! Redis
! AWS

Why this matters
[Requirement explanation]

Recommended next steps
1. Redis fundamentals
2. Caching project
3. AWS deployment practice
```

## 7. Roadmap

```text
12-Week Backend Roadmap
------------------------------------------------
Progress 34%

Week 1
[x] Node.js fundamentals
[x] Express middleware
[ ] Error handling

Week 2
[ ] Redis basics
[ ] Redis caching project

Week 3
[ ] AWS fundamentals
[ ] Deploy backend

[ Mark complete ] [ Edit ]
```

## 8. Practice

```text
Practice
------------------------------------------------
DSA        42 solved
Aptitude   31 solved
CN         18 solved
DBMS       12 solved

[ Start Practice ]

Weak Topics
- Binary Search
- TCP
- SQL Joins
```

## 9. Projects

Project card should show:
- name
- short description
- technologies
- linked skills
- GitHub
- live demo
- status

## 10. Resume

Sections:
- Summary
- Education
- Skills
- Projects
- Experience
- Certifications
- Achievements

Provide:
- version history
- target-job analysis
- missing evidence
- suggested wording

Do not silently write fictional achievements.

## 11. Applications

Kanban or table:

```text
Interested | Applied | Assessment | Interview | Offer/Closed
```

Each application:
- company
- role
- status
- applied date
- next action
- next action date

## 12. Responsive Behavior

Desktop:
- persistent sidebar
- multi-column dashboard

Tablet:
- collapsible sidebar
- two-column cards

Mobile:
- bottom navigation or drawer
- one-column forms
- cards stack vertically

## 13. Accessibility

- keyboard navigable
- visible focus states
- semantic headings
- accessible labels
- sufficient contrast
- errors announced clearly
- no color-only status indicators
