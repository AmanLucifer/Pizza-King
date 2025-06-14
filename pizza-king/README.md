# Pizza King - Food Ordering E-commerce App

A modern food ordering e-commerce application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🍕 Browse food items by categories
- 🔍 Search and filter products
- 🛒 Shopping cart functionality
- 👤 User authentication
- 📱 Responsive design
- 🎨 Modern UI/UX
- 📦 Order tracking
- 👨‍💼 Admin dashboard

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pizza-king.git
   cd pizza-king
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pizza-king/
├── src/
│   ├── app/              # App router pages
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   ├── store/           # State management
│   └── types/           # TypeScript types
├── public/              # Static assets
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
