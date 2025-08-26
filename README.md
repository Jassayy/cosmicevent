# 🌌 Cosmic Event Tracker


A **Next.js 14** application that lets you explore and visualize upcoming **cosmic events** using interactive charts and real-time data storage. Built with **Supabase (Auth + DB), Prisma ORM, TailwindCSS, and Recharts**.


---


## 🚀 Features
- 🔐 **Authentication** with Supabase (email/password, OAuth providers not provided yet)
- 🌠 **Cosmic Event Tracking** — Add, view, and explore astronomical events
- 📊 **Interactive Charts** with Recharts for visualizing trends
- 🎨 **Beautiful UI** styled with TailwindCSS
- ⚡ **Database** powered by NeonDB + Prisma ORM
- 🖥️ **Next.js App Router** (Server Components, API routes, SSR/ISR)


---


## 🛠️ Tech Stack
- **Frontend**: [Next.js 14](https://nextjs.org/)
- **Database**: [Supabase PostgreSQL](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Hosting**: [Vercel](https://vercel.com/)


---


## ⚙️ Installation


### 1. Clone the Repository
```bash
git clone https://github.com/Jassayy/cosmicevent.git
cd cosmicevent
```


### 2. Install Dependencies
```bash
npm install # or yarn install
```


### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NASA_API_KEY=your-api-key
NEXT_PUBLIC_BASE_URL=your-domain



# Prisma (NeonDb or Supabase DB URL)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```


### 4. Setup Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
Visit [http://localhost:3000](http://localhost:3000).