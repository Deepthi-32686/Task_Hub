# Lab Exam 2: Packaging & Deployment

## LoginForm Component Features:
- Username input field
- Password input field (min 6 characters)
- Login button with validation
- Error handling
- Controlled form inputs
- State management with useState

## Build Commands:

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Git Repository Setup:

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Login Form with deployment config"
```

### Create .gitignore
```bash
node_modules
dist
.env
.DS_Store
*.log
```

## CI/CD Pipeline Configuration:

### Netlify Deployment:

1. **Manual Deploy:**
   ```bash
   netlify deploy --prod
   ```

2. **Connect to Git:**
   - Push to GitHub/GitLab
   - Connect repository on Netlify
   - Auto-deploy on push

### Vercel Deployment:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

## Verification Checklist:

✅ LoginForm renders correctly
✅ Username input works
✅ Password input works (min 6 chars)
✅ Login button validates form
✅ Error messages display properly
✅ Successful login shows dashboard
✅ Logout functionality works
✅ Responsive design on all devices
✅ Production build completes without errors
✅ Deployed application accessible via URL

## Key Concepts Demonstrated:

1. **Component Architecture:**
   - Parent component (App) manages auth state
   - Child component (LoginForm) handles user input
   - Props for communication

2. **Form Handling:**
   - Controlled inputs
   - Form validation
   - Error states
   - Derived state (isFormValid)

3. **Build Process:**
   - Vite bundling
   - Minification
   - Tree-shaking
   - Code optimization

4. **Deployment:**
   - Git version control
   - CI/CD pipeline
   - Automated builds
   - Production hosting