# ✍️ Blog App

A full-stack blog application built with **React**, **TypeScript**, 
**Firebase**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

## 🌐 Live Demo

👉 **[bloging-app-silk.vercel.app](https://bloging-app-silk.vercel.app/)**

## ✨ Features

- ✅ Write and publish blog posts
- 🗑️ Delete posts
- ⏱️ Read time estimate
- 📅 Timestamp on every post
- 🔢 Character counter while writing
- ⏳ Loading and empty states
- 📱 Fully responsive design
- 🔥 Real-time Firebase database

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI Library |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Firebase Firestore | Database |
| Vite | Build Tool |
| Vercel | Deployment |

## 🧠 React & Firebase Concepts Used

- `useState` — managing form and blog state
- `useEffect` — fetching blogs on mount
- `async/await` — Firebase operations
- `addDoc` — adding new blog post
- `getDocs` — fetching all posts
- `deleteDoc` — deleting a post
- `orderBy` — sorting by latest first
- `Timestamp` — storing post date/time
- Environment variables — securing API keys

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Firebase account

### Installation
```bash
# Clone the repo
git clone https://github.com/DevSourav01/blog-app.git

# Go into project
cd blog-app

# Install dependencies
npm install
```

### Firebase Setup

1. Go to [firebase.google.com](https://firebase.google.com)
2. Create a new project
3. Create a Firestore database
4. Copy your config

### Environment Variables

Create a `.env` file in root:
```bash
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

### Run the app
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure
```
blog-app/
├── src/
│   ├── App.tsx        # Main component
│   ├── Firebase.ts    # Firebase config
│   ├── main.tsx       # Entry point
│   └── index.css      # Tailwind imports
├── .env               # Environment variables
├── .gitignore
├── index.html
└── vite.config.ts
```

## 🗄️ Firestore Structure
```
blogs (collection)
└── blogId
    ├── title      : string
    ├── content    : string
    └── createdAt  : timestamp
```

## 📊 App States

| State | When |
|-------|------|
| ⏳ Loading | Fetching posts from Firebase |
| 🌱 Empty | No posts yet |
| ✅ Success | Posts displayed |
| 📝 Publishing | Adding new post |

## 📸 Screenshot

> Add a screenshot here!
> Press **Win + Shift + S** → snip → drag into GitHub

## 👨‍💻 Author

**Sourav**
- GitHub: [@DevSourav01](https://github.com/DevSourav01)
- Live App: [bloging-app-silk.vercel.app](https://bloging-app-silk.vercel.app/)

## 📝 License

This project is open source and available under the 
[MIT License](LICENSE).

---

⭐ **Star this repo if you found it helpful!**