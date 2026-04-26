# 🛡️ Humais Portfolio — Admin Dashboard

A full-featured admin dashboard to manage your portfolio content live from the browser.

---

## 📁 Folder Structure

```
src/
├── admin/
│   ├── api.js                  ← Centralized API service
│   ├── AdminRouter.jsx         ← Route definitions
│   ├── App.jsx                 ← Updated root App (replace src/App.jsx)
│   ├── admin.css               ← Extra styles (append to src/index.css)
│   ├── context/
│   │   └── AuthContext.jsx     ← JWT auth state
│   ├── components/
│   │   ├── AdminLayout.jsx     ← Layout with topbar
│   │   ├── Sidebar.jsx         ← Nav sidebar
│   │   └── UI.jsx              ← Shared components
│   └── pages/
│       ├── Login.jsx
│       ├── Overview.jsx
│       ├── Personal.jsx
│       ├── Skills.jsx
│       ├── Experience.jsx
│       ├── Projects.jsx
│       └── Messages.jsx
server/                         ← Express + MongoDB backend
```

---

## ⚙️ Setup Steps

### 1. Install dependencies (portfolio frontend)
```bash
npm install react-router-dom
```

### 2. Replace src/App.jsx
Copy `admin/App.jsx` → `src/App.jsx`

### 3. Move the admin folder
Place the entire `admin/` folder inside `src/`:
```
src/admin/
```

### 4. Add admin styles
Append `admin/admin.css` contents to `src/index.css`

### 5. Add environment variable
In your portfolio `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 6. Start the backend
```bash
cd server
cp .env.example .env    # fill in MongoDB URI, JWT_SECRET, ADMIN_PASSWORD
npm install
npm run dev             # runs on port 5000
```

### 7. Start the frontend
```bash
npm run dev             # runs on port 5173
```

---

## 🔐 Login

Visit: `http://localhost:5173/admin`

Credentials are set in `server/.env`:
```
ADMIN_USERNAME=humais
ADMIN_PASSWORD=admin123   ← change this!
```

---

## 🌱 Seeding Initial Data

After first login, go to each section and click **"Seed"** to populate your existing portfolio data into MongoDB:

1. Overview → note the empty stats
2. Personal → click **Seed Data**
3. Skills → click **Seed**
4. Experience → click **Seed**
5. Projects → click **Seed**

---

## 🚀 Production

- Deploy backend to **Railway** / **Render** / **VPS**
- Set `VITE_API_URL=https://your-backend.com/api` in Vercel env vars
- Add your production domain to `server/index.js` CORS origins

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ✗ | Get JWT token |
| GET | `/api/personal` | ✗ | Public personal info |
| PUT | `/api/personal` | ✓ | Update personal info |
| GET/POST/PUT/DELETE | `/api/skills` | CRUD | Manage skills |
| GET/POST/PUT/DELETE | `/api/experience` | CRUD | Manage experience |
| GET/POST/PUT/DELETE | `/api/projects` | CRUD | Manage projects |
| POST | `/api/messages` | ✗ | Submit contact form |
| GET/DELETE/PATCH | `/api/messages` | ✓ | Manage inbox |
| GET | `/api/stats` | ✗ | Dashboard overview counts |
