# 📝 Post-it Relationship Board

An interactive relationship board that lets users create and connect virtual Post-it notes in real-time.

## ✨ Features

- 🟨 Create draggable Post-it notes on canvas
- ✏️ Edit note text inline
- 🔗 Draw and manage connections between notes
- 🗑 Delete notes (with automatic connection cleanup)
- 💾 Real-time data sync with [Supabase](https://supabase.io)
- 📦 Deployed with [Vercel](https://vercel.com)

## ⚙️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org), [React](https://reactjs.org), [Tailwind CSS](https://tailwindcss.com)
- **Backend/Storage:** [Supabase](https://supabase.io) (PostgreSQL + Realtime)
- **Deployment:** [Vercel](https://vercel.com)

## 📂 Project Structure

```

/src
/components
\- PostIt.tsx         # Post-it rendering and interaction
\- Board.tsx          # Main board logic and layout
/lib
\- supabase.ts        # Supabase client
\- noteApi.ts         # CRUD for notes
\- connectionApi.ts   # CRUD for connections

````

## 🛠 Setup

1. Clone this repo  
2. Install dependencies:

   ```bash
   npm install
````

3. Add `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run locally:

   ```bash
   npm run dev
   ```

---

## 📦 Deployment

* Connect repo to [Vercel](https://vercel.com)
* Set Environment Variables
* Auto-deploy from `main` branch

---

## 🎯 Future Enhancements

* 🎨 Color-coded Post-its (in progress)
* 💾 Export/Import board state as JSON
* 🧠 AI-assisted grouping of related notes

![Post-it Board Preview](/post-it.png)



Made with ❤️ by [@Binwaran](https://github.com/Binwaran)
