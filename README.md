# Ask Me Why

A community Q&A platform built with Next.js 15, MongoDB, and Magic UI. Ask questions, share answers, vote, and earn recognition.

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB via Mongoose
- **Auth:** JWT cookies
- **UI:** Tailwind CSS 4, shadcn/ui, Magic UI
- **Deploy:** [Vercel](https://vercel.com)

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/askmewhy.git
cd askmewhy
npm install
```

### 2. Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `TOKEN_SECRET` | Secret for signing JWT auth tokens |
| `ASKMEWHY_API` | External AI answer API endpoint |
| `NEXT_PUBLIC_BASE_URL` | App URL (`http://localhost:3000` in dev) |

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deploy on Vercel

1. Push your repo to GitHub.
2. Import the project on [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel dashboard.
4. Deploy — Vercel auto-detects Next.js 15.

> **Note:** Keep `next` on the 15.x line (`^15.3.9`) for Vercel compatibility. Avoid `npm audit fix --force` as it can downgrade Next.js and break the build.

## Project structure

```
src/
├── app/           # Pages and API routes (App Router)
├── components/    # UI components
├── dbConfig/      # MongoDB connection
├── helpers/       # Auth utilities
└── models/        # Mongoose schemas
```

## License

Private project — © Mayank Gautam
