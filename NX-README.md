# React Vite Nx Monorepo

A production-ready React application built with Vite and managed as an Nx monorepo workspace with proper library boundaries and caching.

## 🚀 How to Run

### Development
```bash
# Serve the app in development mode
npx nx serve react

# Or use npm script
npm run dev
```

### Build
```bash
# Build for production
npx nx build react

# Or use npm script
npm run build
```

### Lint
```bash
# Lint the entire workspace
npx nx lint react

# Lint all projects
npx nx run-many -t lint --all
```

### Test
```bash
# Run tests (when configured)
npx nx test react
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Workspace Structure

```
apps/
  react/               # Main Vite React application
    └── src/
        ├── App.tsx            # Main app component
        ├── ProductList.tsx    # Product listing page
        ├── ProductDetail.tsx  # Product detail page
        ├── Cart.tsx           # Shopping cart page
        ├── store/             # Zustand stores
        └── context/           # React contexts

libs/
  ui/                  # Shared UI components (type:ui)
    └── src/
        ├── ToastHost.tsx      # Toast notification component
        ├── CartSidebar.tsx    # Shopping cart sidebar
        └── GlobalLoader.tsx   # Global loading indicator
  
  hooks/               # Custom React hooks (type:hooks)
    └── src/
        ├── useLocalStorage.ts # Local storage hook
        ├── useTheme.ts        # Theme management hook
        └── useProducts.ts     # Product data fetching hooks
  
  i18n/                # Internationalization (type:i18n)
    └── src/
        └── i18n.ts            # i18next configuration & translations
```

## 🏗️ Architecture Rules (Module Boundaries)

Nx enforces the following dependency constraints via ESLint:

- **type:app** → Can depend on: `type:ui`, `type:hooks`, `type:i18n`
- **type:ui** → Can depend on: `type:ui` only (self-contained UI components)
- **type:hooks** → Can depend on: `type:hooks` only (self-contained hooks)
- **type:i18n** → Can depend on: `type:i18n` only (self-contained i18n logic)

### Key Rules:
- ✅ Apps can use all libraries
- ✅ Libraries can only import from libraries of the same type
- ❌ Libraries cannot import from apps
- ❌ Cross-type library imports are forbidden (enforces clean architecture)

### Enforced via:
```bash
# This will fail if boundaries are violated
npx nx lint react
```

## 📊 Nx Affected Demo

Nx's affected command only builds/tests/lints what changed. Here's proof:

### Initial Setup (All Affected)
```bash
$ npx nx show projects --affected
react
hooks
i18n
ui
```

### After Change in libs/ui Only
```bash
# Modified libs/ui/src/lib/GlobalLoader.tsx
$ npx nx show projects --affected
react  # App affected because it depends on ui
ui     # Direct change

# Note: hooks and i18n were NOT affected!
```

### Build Output (Only Affected Projects)
```bash
$ npx nx affected:build

NX   Affected criteria defaulted to --base=main --head=HEAD

NX   Running target build for project react:
- react

> nx run react:build

vite v7.2.7 building client environment for production...
✓ 216 modules transformed.
dist/index.html                   0.45 kB │ gzip:   0.29 kB
dist/assets/index-BRO45JDr.css   14.27 kB │ gzip:   3.65 kB
dist/assets/index-DythXCZR.js   736.86 kB │ gzip: 213.65 kB
✓ built in 1.22s

NX   Successfully ran target build for project react
```

### Caching Demonstration
```bash
# First run (no cache)
$ npx nx build react
✓ built in 1.22s

# Second run (cached)
$ npx nx build react

NX   Successfully ran target build for project react [existing outputs match the cache, left as is]

# Build completed instantly using cache!
```

## 🔍 Project Graph

View your project dependencies:
```bash
npx nx graph
```

This opens an interactive visualization showing how `react` depends on `ui`, `hooks`, and `i18n`.

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool & dev server
- **TypeScript 5** - Type safety
- **Nx 22** - Monorepo tooling & caching
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **i18next** - Internationalization (English, Hebrew, Russian)
- **PrimeReact** - UI component library
- **React Router** - Routing

## 🎯 Nx Features Used

- ✅ Project graph & dependency management
- ✅ Affected command (build only what changed)
- ✅ Module boundary enforcement
- ✅ Computation caching
- ✅ Library generation
- ✅ Integrated ESLint

## 📝 Notes

- Path aliases configured: `@react-app/ui`, `@react-app/hooks`, `@react-app/i18n`
- Module boundaries enforced via `@nx/enforce-module-boundaries` ESLint rule
- All libraries have proper TypeScript configurations
- Vite build optimized with path resolution for libs
