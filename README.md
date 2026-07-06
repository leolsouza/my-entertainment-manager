# 🎬 My Entertainment Manager

**My Entertainment Manager** is a personal portfolio project that allows users to manage their favorite **movies**, **TV shows**, and **books** — all in one place.
It's built with **Next.js (TypeScript)** and focuses heavily on **Server Components**, **Server Actions**, and **server-side rendering** to ensure performance and a great developer experience.

---

## 🚧 Project Status

> **⚙️ Work in Progress**
> The project is still in development and not yet finalized.
> All features, design, and architecture are subject to change.
> The current **UI design and styling are prototypes** — they serve as a foundation for functionality testing and will be redesigned in later stages for a more polished look and better user experience.

---

## 🧠 Tech Stack

- [Next.js](https://nextjs.org/) – React framework with App Router, Server Components and Server Actions
- [Drizzle ORM](https://orm.drizzle.team/) – Type-safe queries and migrations
- [TMDB API](https://www.themoviedb.org/documentation/api) – Movie and TV show data
- [Google Books API](https://developers.google.com/books) – Book information
- [shadcn/ui](https://ui.shadcn.com/) – Accessible and composable UI components built with Tailwind CSS

---

## 🚀 Features

### Authentication
- [x] Sign up and sign in with email and password
- [x] JWT-based session stored in HTTP-only cookies
- [x] Password hashing with bcrypt

### Movies
- [x] Discover popular movies and search by title or genre (TMDB)
- [x] Add and remove movies from favorites directly from the discover page
- [x] Dedicated favorites page with search and genre filter
- [x] Manually add, edit and delete custom movie entries

### TV Shows
- [x] Discover popular TV shows and search by title or genre (TMDB)
- [x] Add and remove shows from favorites directly from the discover page
- [x] Dedicated favorites page with search filter
- [x] Manually add, edit and delete custom show entries

### Books
- [x] Discover books and search by title (Google Books)
- [x] Add and remove books from favorites directly from the discover page
- [x] Dedicated favorites page with search and filter (planned)
- [x] Manually add, edit and delete custom book entries (planned)

### General
- [ ] Redesigned and improved UI (planned)
- [ ] Deployment with Neon (PostgreSQL) + Vercel (planned)

---

## ⚙️ Getting Started

### 🧩 Prerequisites

Before running the project locally, make sure you have:

- **Node.js** (v20 or higher)
- **npm** or **yarn**

### 🪄 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/leolsouza/my-entertainment-manager.git
   cd my-entertainment-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file at the root with:

   ```bash
   JWT_SECRET=...
   TMDB_API_KEY=...
   GOOGLE_BOOKS_API_KEY=...
   ```

4. **Run database migrations**

   ```bash
   npm run db:migrate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 💡 Project Purpose

This project was created to enhance my skills in Next.js 15, server-side rendering, full-stack architecture, and API integration, while showcasing my ability to build modern applications without relying on third-party BaaS solutions.
It's also part of my professional developer portfolio.

### 📬 Contact

Developed by: Leonardo Lima

- 🔗[LinkedIn](https://www.linkedin.com/in/leonardo-l-souza/)
- 📧[E-mail](mailto:eng.leolsouza@hotmail.com)
