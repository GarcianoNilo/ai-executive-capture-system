# AI Executive Capture & Follow-up System

A lightweight AI-powered operational memory system designed to capture executive thoughts, organize them into actionable items, and deliver concise focus reports so nothing important gets forgotten.

---

## Overview

Busy executives often receive information from multiple sources throughout the day—emails, chats, meetings, voice notes, and spontaneous ideas.

The challenge isn't collecting information.

The challenge is ensuring every important thought is captured, understood, prioritized, and resurfaced at the right time.

This project demonstrates a simple but extensible system that solves that problem using AI automation.

---

## Problem

Operational information often gets lost because it arrives in different places and at different times.

Examples include:

- A task mentioned during a meeting
- A reminder sent through chat
- A client follow-up noted after a phone call
- A business idea typed late at night

Without a central operational memory, these items are easily forgotten or delayed.

---

## Solution

The AI Executive Capture & Follow-up System provides a single capture point that automatically:

- Captures incoming information
- Uses AI to understand and categorize it
- Stores it in an operational memory
- Sends scheduled executive focus reports
- Reduces the need to remember every detail manually

The goal is to reduce cognitive load by ensuring important information is always available when needed.

---

# Features

## Universal Capture

Capture operational information through a simple web interface.

Supported input:

- Text
- Audio upload (prepared for future transcription support)

---

## AI Categorization

Google Gemini analyzes every submission and extracts structured operational data including:

- Title
- Category
- Priority
- Summary
- Next Action
- Owner
- Due Date
- Status

---

## Operational Memory

Every captured item is stored inside Google Sheets, creating a simple operational ledger that acts as the system's memory.

---

## Executive Focus Report

A scheduled Make.com workflow automatically:

- Retrieves active operational items
- Summarizes them using AI
- Sends a clean executive briefing by email

This ensures important work resurfaces automatically instead of being forgotten.

---

# System Architecture

```
                    User

                     │

                     ▼

          GitHub Pages Capture Form

                     │

                     ▼

            Make.com Webhook

                     │

                     ▼

      Google Gemini AI (Structured Data)

                     │

                     ▼

         Google Sheets Operational Memory

                     │

          Scheduled Make.com Workflow

                     │

                     ▼

      Google Gemini AI (Executive Summary)

                     │

                     ▼

             Executive Focus Report
                    (Email)
```

---

# Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML, CSS, JavaScript |
| Hosting | GitHub Pages |
| Automation | Make.com |
| AI | Google Gemini |
| Data Storage | Google Sheets |
| Email | Gmail |

---

# Project Structure

```
ai-executive-capture-system/

│
├── index.html
├── style.css
├── app.js
├── README.md
│
├── workflows/
│   ├── capture-engine.json
│   └── executive-focus-report.json
│
└── docs/
    └── architecture.png
```

---

# Workflow Overview

## Capture Engine

```
Capture Form
      ↓
Make Webhook
      ↓
Gemini AI
      ↓
Google Sheets
```

Responsibilities:

- Receive submissions
- Extract structured operational information
- Save into Operational Memory

---

## Executive Focus Report

```
Scheduler
      ↓
Google Sheets
      ↓
Gemini AI
      ↓
Email
```

Responsibilities:

- Retrieve active operational items
- Generate executive summary
- Deliver scheduled briefing

---

# Assumptions

This proof of concept was built without access to production systems.

Assumptions include:

- Google Sheets serves as the operational ledger.
- The executive has access to Google Workspace.
- CRM integrations (e.g., GoHighLevel) would be connected once production credentials are available.
- Audio uploads are included for future transcription workflows.

---

# Future Improvements

Possible production enhancements include:

- GoHighLevel CRM integration
- Slack integration
- Gmail monitoring
- Voice transcription using Gemini or Whisper
- Calendar synchronization
- Automatic follow-up reminders
- Task completion workflow
- Multi-user support
- Executive dashboard
- Analytics and reporting

---

# Why This System

This project is intentionally focused on solving one problem well:

> Capture operational information, organize it with AI, and ensure nothing important is forgotten.

Instead of creating another task manager, this system acts as an operational memory that reduces cognitive load and helps executives focus on decision-making rather than remembering every detail.

---

# License

This repository was created as a technical demonstration and portfolio project.
