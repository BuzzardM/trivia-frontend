# Trivia Frontend

A modern trivia quiz application built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- Interactive quiz interface with multiple choice questions
- Configurable quiz settings (number of questions, difficulty, category)
- Real-time quiz progress tracking
- Results display with score breakdown
- Responsive design with modern UI components
- Type-safe development with TypeScript

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn component library
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/
│   ├── quiz/              # Quiz-specific components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── services/              # API and external services
├── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js v22.14
- pnpm v14.0

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.
