# Scaler Persona AI Chatbot

Chat in real-time with **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra** — powered by Google Gemini AI.

**Live Demo:** `[Add your Vercel URL here after deployment]`

---

## Screenshots

> Add screenshots of the chatbot UI after first run.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (Pages Router) + Vanilla CSS |
| Backend | Next.js API Routes (serverless) |
| AI Model | Google Gemini 1.5 Flash |
| Deployment | Vercel |

---

## Local Setup

### Prerequisites
- Node.js 18+
- A Google Gemini API Key → [Get one here](https://makersuite.google.com/app/apikey)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/scaler-persona-chatbot.git
cd scaler-persona-chatbot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Then open .env.local and paste your Gemini API key

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key (never commit this) |

See `.env.example` for the template.

---

## Project Structure

```
├── pages/
│   ├── index.js          # Main chat UI (persona switcher, messages, input)
│   └── api/
│       └── chat.js       # API route — Gemini calls + system prompts
├── styles/
│   └── globals.css       # All styling (dark theme, animations, responsive)
├── prompts.md            # All three system prompts with annotations
├── reflection.md         # 300–500 word project reflection
├── .env.example          # Environment variable template
└── README.md             # This file
```

---

## Features

- **3 AI Personas** — Each with a distinct, research-backed system prompt
- **Persona Switcher** — Tabs (desktop) + hamburger sidebar (mobile); switching resets conversation
- **Suggestion Chips** — Quick-start questions per persona
- **Typing Indicator** — Animated dots while waiting for the API
- **Error Handling** — User-friendly messages for API/key errors
- **Mobile Responsive** — Full experience on all screen sizes

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# Settings → Environment Variables → GEMINI_API_KEY
```

---

## Assignment Details

**Assignment 01 — Persona-Based AI Chatbot**  
Prompt Engineering | Scaler Academy
