# Lab10: Deployment Commands

## Build for Production
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Deploy to Netlify
```bash
netlify deploy --prod
```

## Deploy to Vercel
```bash
vercel --prod
```

## Key Points:
- Vite bundles and optimizes code automatically
- Tree-shaking removes unused code
- Minification reduces file sizes
- Code splitting improves performance
- Environment variables configured in .env files