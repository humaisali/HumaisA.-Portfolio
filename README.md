<div align="center">

# Humais Ali - Personal Portfolio

### A full-stack, AI-powered developer portfolio with an admin dashboard and AI chatbot

[![Live Demo](https://img.shields.io/badge/Live%20Demo-humaissoftneer.vercel.app-0A84FF?style=for-the-badge&logo=vercel&logoColor=white)](https://humaissoftneer.vercel.app/)
[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

</div>

---

## Overview

A production-grade personal portfolio built from scratch as a full-stack application. Beyond just displaying projects, it includes a live admin dashboard to manage all portfolio content without touching code, an AI-powered chatbot assistant trained on portfolio context, and a complete REST API backend with MongoDB.

**Live:** [humaissoftneer.vercel.app](https://humaissoftneer.vercel.app/)

---

## Features

| Feature | Description |
|---|---|
| **Animated Hero** | Staggered letter animation, typing role effect, particle background |
| **Stats Strip** | Animated counters between Hero and About |
| **Skills Section** | Animated progress bars grouped by category |
| **Experience Timeline** | Alternating left-right timeline with glassmorphism cards |
| **Certifications** | Dedicated section showcasing professional certificates and achievements |
| **Projects Grid** | 3D tilt cards with filter tabs, live/GitHub links, and an expandable bento grid |
| **Contact Form** | Form submissions saved directly to MongoDB via Express API |
| **AI Chatbot** | Portfolio-context-aware assistant powered by Gemini AI |
| **Admin Dashboard** | Full CRUD panel to manage projects, skills, experience, and messages |
| **JWT Authentication** | Secure admin login with token-based auth |
| **Particle Background** | Interactive canvas particles that react to mouse movement |
| **Custom Cursor & UI** | Custom interactive cursor and rich animated components (MorphText, StaggerText) |
| **Fully Responsive** | Mobile-first design across all screen sizes |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS 3 |
| **Backend** | Node.js, Express |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, bcryptjs |
| **AI Chatbot** | Google Gemini API |
| **Animations** | Framer Motion |
| **Icons** | React Icons |
| **File Uploads** | Multer |
| **Deployment FE** | Vercel |
| **Deployment BE** | Render |

---

## Project Structure

```
humais-portfolio/
├── public/                        # Static assets (images, CV)
├── src/
│   ├── admin/                     # Admin dashboard module
│   │   ├── api.js                 # Centralized API service
│   │   ├── AdminRouter.jsx        # Protected admin routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # JWT auth state
│   │   ├── components/
│   │   │   ├── AdminLayout.jsx    # Layout with topbar
│   │   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   │   └── UI.jsx             # Shared UI components
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── Overview.jsx
│   │       ├── Personal.jsx
│   │       ├── Skills.jsx
│   │       ├── Experience.jsx
│   │       ├── Projects.jsx
│   │       └── Messages.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Certifications.jsx
│   │   ├── Projects.jsx
│   │   ├── StatsStrip.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Particles.jsx          # Interactive canvas background
│   │   ├── PortfolioChatBot.jsx   # Gemini AI chatbot
│   │   ├── Cursor.jsx             # Custom interactive cursor
│   │   ├── CursorCard.jsx         # Card hover effects for cursor
│   │   ├── ExpandableBentoGrid.jsx# Grid layout component
│   │   ├── MorphText.jsx          # Text morphing animation
│   │   ├── SocialFlipButton.jsx   # Animated social links
│   │   ├── StaggerText.jsx        # Staggered text animation
│   │   └── VengeanceButton.jsx    # Primary animated button
│   ├── data/
│   │   └── index.js               # Static portfolio content
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── PersonalInfo.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Experience.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── personal.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   └── messages.js
│   ├── middleware/
│   │   └── auth.js                # JWT verification middleware
│   ├── index.js                   # Server entry point
│   └── package.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier works)
- Google Gemini API key — [Get one free here](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/humaisali/humais-portfolio.git
cd humais-portfolio

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### Environment Variables

Create `.env` inside the `server/` directory:

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
JWT_SECRET=your_super_secret_jwt_key
ADMIN_USERNAME=humais
ADMIN_PASSWORD=your_secure_password
CLIENT_ORIGIN=http://localhost:5173
```

Create `.env` in the root directory:

```
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Running Locally

```bash
# Terminal 1 — Start the backend
cd server
npm run dev      # runs on http://localhost:5000

# Terminal 2 — Start the frontend
npm run dev      # runs on http://localhost:5173
```

---

## Admin Dashboard

The portfolio includes a fully featured admin panel accessible at `/admin`.

**Login credentials** are set in `server/.env` via `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

### Admin Pages

| Page | Description |
|---|---|
| **Overview** | Live stats — projects, skills, experience, message count |
| **Personal** | Edit name, bio, roles, links, about paragraphs |
| **Skills** | Add, edit, delete skills with level slider |
| **Experience** | Full CRUD for work and education timeline entries |
| **Projects** | Manage projects with category, GitHub, live links, featured toggle |
| **Messages** | Inbox for contact form submissions — mark read, mark replied, delete |

### Seeding Initial Data

After first login, click **Seed** in each section to populate the database with the default portfolio content.

---

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Returns JWT token |
| GET | `/api/auth/verify` | Yes | Verify active token |

### Portfolio Data (Public)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/personal` | Get personal info |
| GET | `/api/projects` | Get all projects |
| GET | `/api/skills` | Get all skills |
| GET | `/api/experience` | Get all experience entries |
| GET | `/api/stats` | Get dashboard overview counts |

### Contact

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/messages` | No | Submit contact form |
| GET | `/api/messages` | Yes | View all messages |
| PATCH | `/api/messages/:id/read` | Yes | Mark as read |
| PATCH | `/api/messages/:id/replied` | Yes | Mark as replied |
| DELETE | `/api/messages/:id` | Yes | Delete message |

---

## Deployment

### Frontend — Vercel

1. Push repository to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Set root directory to `/` (project root)
4. Add environment variables: `VITE_API_URL` and `VITE_GEMINI_API_KEY`
5. Deploy

### Backend — Render

1. Create a new **Web Service** at [render.com](https://render.com)
2. Connect GitHub repository
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add all `server/.env` variables in the Render dashboard

---

## Author

**Humais Ali** - MERN Stack Developer at SkyTech Developers

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/humaisaliskytechdeveloper)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/humaisali)
[![Portfolio](https://img.shields.io/badge/Portfolio-0A84FF?style=flat&logo=vercel&logoColor=white)](https://humaissoftneer.vercel.app/)

---

<div align="center">
If you found this useful, consider giving it a star.
</div>
