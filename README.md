# Abir-AI

Help people choose and use the best AI tools for their job in a simple, ethical, and accessible way.

## About

"Abir" means the fresh fragrance of flowers in the early morning — a symbol of clarity, renewal, and discovering something new.

This website provides curated AI tool recommendations for different professional profiles: freelancers, students, entrepreneurs, content creators, and developers.

## Features

- **Profile-based recommendations**: Choose your profession to get personalized AI tool suggestions
- **Ethical and transparent**: No dark patterns, honest recommendations, privacy-first
- **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- **Performance optimized**: Fast loading, low bandwidth friendly
- **Dark/Light mode**: User preference respecting system settings
- **Mobile-first**: Responsive design that works on all devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/daldoulmhamed/Abir-AI.git
   cd Abir-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### GitHub

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/abir-ai.git
   git push -u origin main
   ```

### Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: (leave empty)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

## Project Structure

```
Abir-AI/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── profiles/[job]/    # Dynamic profile pages
│   ├── learn/             # Learn hub
│   ├── tutorials/         # Tutorials page
│   ├── news/              # News & blog
│   └── legal/             # Legal pages
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProfileSelector.tsx
│   ├── ToolCard.tsx
│   ├── ProfileCard.tsx
│   └── ThemeToggle.tsx
├── data/
│   └── tools.ts           # Tool recommendations data
├── public/                # Static assets
└── styles/               # Additional styles (if needed)
```

## Accessibility

This site is built with accessibility in mind:
- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast support
- Screen reader friendly

## Privacy

- No cookies or tracking
- No data collection
- No analytics
- No ads
- Privacy-first design

## Contributing

This is a personal project by DALDOUL M'hamed. For questions or suggestions, contact daldoul.mhamed@gmail.com.

## License

This project is open source and available under the [MIT License](LICENSE).
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
