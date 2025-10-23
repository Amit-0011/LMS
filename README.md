# Edemy — Frontend (React)

**Live demo:** [https://edemy-frontend-eosin.vercel.app/](https://edemy-frontend-eosin.vercel.app/)

> This repository contains the frontend for **Edemy**, a modern Learning Management System (LMS) user interface (student + educator dashboards, course pages, player, enrollment flows).

---

## Overview

Edemy is a full-featured LMS that provides learners and educators with course discovery, enrollment, video playback, progress tracking and educator tools (course creation, student management). This README focuses on the **frontend** project: how to run it locally, configure environment variables, and deploy to Vercel.

---

## Features

* Responsive UI for Students and Educators
* Course listing, course details and enrollment
* Video player integration for lessons
* Progress tracking and “My Enrollments” view
* Educator dashboard: add/edit courses, view enrolled students
* Authentication hooks (Clerk or other auth provider)
* Mobile-friendly layout

---

## Tech stack

Typical stack used by the Edemy frontend:

* React (Vite)
* React Router
* Tailwind CSS
* Framer Motion (animations)
* Quill (rich text editor for course content)
* Axios (HTTP requests)
* React-YouTube (embedded video player)
* React-Toastify (notifications)

> See the repository's `client/` folder for exact dependencies and package.json scripts.

---

## Getting started (local)

### Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* Backend API running (the frontend talks to a separate server that handles authentication, DB, media uploads and payments). If you don't have a backend, you can stub the API with a mock server.

### 1. Clone

```bash
git clone <YOUR-FORK-or-REMOTE>/edemy-frontend.git
cd edemy-frontend
```

### 2. Install

```bash
cd client
npm install
```

### 3. Environment variables

Create a `.env` file in the `client/` directory. Typical variables the frontend expects (replace with values from your backend / provider):

```env
VITE_API_BASE_URL=https://api.example.com
VITE_CLERK_PUBLISHABLE_KEY=pk_clerk_xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=unsigned_preset
```

> The exact variable names may differ depending on the implementation in `src/`. Check `client/.env.example` or search for `import.meta.env` / `process.env` in the code to confirm names.

### 4. Run (development)

```bash
npm run dev
# or
npm run start
```

Open [http://localhost:5173](http://localhost:5173) (or the Vite port printed in the console).

---

## Build & Preview

```bash
npm run build
npm run preview
```

This generates an optimized production build in `dist/`.

---

## Deployment

The frontend is configured to be deployed to **Vercel** (example demo: [https://edemy-frontend-eosin.vercel.app/](https://edemy-frontend-eosin.vercel.app/)).

1. Create a new Vercel project pointing to the `client/` folder (or the repository root if the repo is a single-app client).
2. Add the environment variables in the Vercel dashboard (same keys you used in `.env`).
3. Deploy — Vercel will run the build and host the static app.

Alternatively, any static host that supports a Vite-built SPA can be used.

---

## Directory structure (example)

```
client/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ educator/
│  │  └─ student/
│  ├─ pages/
│  ├─ hooks/
│  ├─ services/ (api calls)
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
└─ vite.config.js
```

---

## Environment & Backend notes

* The frontend expects a backend API for authentication, course data, media uploads and payments. The backend repo (if included in the project) will document required API endpoints and server-side env variables (MongoDB, Cloudinary, Clerk, Stripe, etc.).
* If you only want to explore the UI, consider running a mock server or using the deployed demo as a reference.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add ..."`
4. Push: `git push origin feat/your-feature`
5. Open a PR with a clear description and screenshots

Please follow the repository's code style and run linters/tests before opening a PR.

---

## Troubleshooting

* If the app fails to fetch data, verify `VITE_API_BASE_URL` and CORS settings on the backend.
* For auth issues, ensure the Clerk (or chosen auth provider) keys are correct and the redirect URLs are registered in the auth console.
* For media uploads, check Cloudinary credentials and upload presets.

---

## License

This project is typically released under the MIT license. Check the repository's LICENSE file.

---

## Credits & Links

* Live demo (reviewed): [https://edemy-frontend-eosin.vercel.app/](https://edemy-frontend-eosin.vercel.app/)
* Reference repository: Edemy LMS (full-stack) — the public GitHub repo contains a similar frontend implementation and helpful setup notes.

---

Made with ❤️ — README generated after a quick review of the demo and public Edemy resources.
