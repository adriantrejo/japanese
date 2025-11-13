# 🏗️ Development Guide - JLPT Resources App

Technical documentation for developers working on this Next.js + TypeScript application.

## 📐 Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│                  (Next.js App Router)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              React Context Layer                         │
│         (Auth, Language, State Management)               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                API Client Layer                          │
│          (Abstraction for data fetching)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Data Layer (Mock → Real Backend)                 │
│     Currently: Local Data / Future: REST API             │
└─────────────────────────────────────────────────────────┘
```

### Design Pattern: **Facade + Strategy Pattern**

- **Facade**: `ApiClient` abstracts data fetching complexity
- **Strategy**: Switch between mock data and real backend without changing components
- **Provider Pattern**: React Context for global state (Auth, i18n)

## 📂 Project Structure

```
japanese/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD for GitHub Pages
│
├── public/
│   ├── manifest.json            # PWA manifest
│   └── .nojekyll                # Disable Jekyll on GitHub Pages
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout (providers)
│   │   ├── page.tsx             # Home page (level selection)
│   │   ├── globals.css          # Global styles
│   │   ├── login/               # Login page
│   │   ├── n1/ n2/ n3/ n4/ n5/ # Level pages
│   │   │   ├── page.tsx         # Category selection
│   │   │   └── vocabulario/     # Vocabulary lists
│   │   └── upgrade/             # Premium subscription page
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Header.tsx           # Page header with nav
│   │   ├── LanguageSwitcher.tsx # i18n selector
│   │   └── ProtectedRoute.tsx   # Auth guard (future)
│   │
│   └── lib/                     # Business logic & utilities
│       ├── api/
│       │   └── client.ts        # ⭐ API abstraction layer
│       ├── auth/
│       │   └── AuthContext.tsx  # Authentication state
│       ├── config.ts            # ⭐ App configuration
│       ├── data/
│       │   ├── mockData.ts      # Mock data (N1,N2,N4,N5)
│       │   └── n3-vocabulary.ts # ⭐ N3 full dataset (800 words)
│       └── i18n/
│           ├── index.ts         # i18n setup
│           ├── LanguageContext.tsx  # Language state
│           └── locales/         # Translation files
│               ├── en.ts
│               ├── es.ts
│               └── ja.ts
│
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
└── README.md                    # User documentation
```

## 🎯 Design Patterns & Principles

### 1. **Separation of Concerns**

Each layer has a single responsibility:

```typescript
// ❌ BAD: Component fetches data directly
function VocabPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/vocabulary/n3")
      .then((r) => r.json())
      .then(setData);
  }, []);
}

// ✅ GOOD: Component uses abstraction layer
function VocabPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiClient.getVocabulary("n3").then(setData);
  }, []);
}
```

### 2. **Dependency Injection via Config**

**File: `src/lib/config.ts`**

```typescript
export const APP_CONFIG = {
  ENABLE_AUTH: false, // Toggle auth on/off
  MOCK_MODE: true, // Toggle mock vs real API
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
};
```

**Benefits:**

- Change behavior without modifying components
- Easy to test different scenarios
- Single source of truth

### 3. **Facade Pattern: API Client**

**File: `src/lib/api/client.ts`**

```typescript
class ApiClient {
  // Internal: handles mock vs real API logic
  private async mockFetch<T>(endpoint: string): Promise<T> { ... }

  // Public: clean interface for components
  async getVocabulary(levelId: string): Promise<VocabularyResponse> {
    return await this.fetch(`/vocabulary/${levelId}`)
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return await this.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }
}

export const apiClient = new ApiClient()
```

**Why?**

- Components don't know if data is mock or real
- Easy migration path: change `MOCK_MODE` flag
- Centralized error handling
- Type safety with TypeScript

### 4. **Provider Pattern: React Context**

**Auth Context:**

```typescript
// src/lib/auth/AuthContext.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Centralized auth logic
  const login = async (email, password) => { ... }
  const logout = async () => { ... }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Usage in components
function Header() {
  const { user, logout } = useAuth()
  return <button onClick={logout}>Logout</button>
}
```

**Language Context:**

```typescript
// src/lib/i18n/LanguageContext.tsx
export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");
  const [t, setT] = useState(translations.en);

  // Centralized i18n logic
  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    setT(translations[newLocale]);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### 5. **Data Transfer Objects (DTOs)**

**Strong typing for API responses:**

```typescript
// src/lib/api/client.ts
export interface VocabularyWord {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  exampleJp: string;
  exampleEs: string;
  premium?: boolean;
}

export interface VocabularyResponse {
  words: VocabularyWord[];
  isPremium: boolean;
  total: number;
}
```

**Benefits:**

- Type safety across the app
- IntelliSense autocomplete
- Compile-time error detection
- Self-documenting code

## 🔄 Data Flow

### Authentication Flow

```
1. User enters credentials
   │
   ▼
2. Component calls useAuth().login(email, password)
   │
   ▼
3. AuthContext calls apiClient.login()
   │
   ▼
4. ApiClient checks APP_CONFIG.MOCK_MODE
   │
   ├─ Mock: Return fake token
   └─ Real: POST to /auth/login
   │
   ▼
5. AuthContext stores token in localStorage
   │
   ▼
6. All components re-render with new user state
```

### Vocabulary Fetch Flow

```
1. VocabularyPage mounts
   │
   ▼
2. useEffect() calls apiClient.getVocabulary('n3')
   │
   ▼
3. ApiClient checks:
   ├─ APP_CONFIG.ENABLE_AUTH → If false, return all data
   ├─ Token exists? → Return full dataset
   └─ No token? → Return preview (10 words)
   │
   ▼
4. ApiClient checks APP_CONFIG.MOCK_MODE:
   ├─ Mock: Load from n3-vocabulary.ts
   └─ Real: GET /api/vocabulary/n3
   │
   ▼
5. Component renders data with type safety
```

## 🧩 How to Extend

### Adding a New Level (e.g., N0)

**1. Create data file:**

```typescript
// src/lib/data/n0-vocabulary.ts
export const n0VocabularyEs: VocabularyWord[] = [
  { id: 1, word: "...", reading: "...", meaning: "..." },
];

export function getN0Vocabulary(language: "es" | "en" | "ja") {
  return { level: "n0", language, total: 500, words: n0VocabularyEs };
}
```

**2. Update API client:**

```typescript
// src/lib/api/client.ts
import { getN0Vocabulary } from "../data/n0-vocabulary";

// In mockFetch method:
if (levelId === "n0") {
  const n0Data = getN0Vocabulary("es");
  // ... rest of logic
}
```

**3. Add to levels list:**

```typescript
// src/lib/data/mockData.ts
export const mockLevels: Level[] = [
  { id: 'n0', name: 'N0', badge: 'Native', ... },
  // ... existing levels
]
```

**4. Create page:**

```bash
mkdir -p src/app/n0/vocabulario
```

```tsx
// src/app/n0/page.tsx
export default function N0Page() {
  // Copy from n3/page.tsx and adjust
}
```

### Adding a New Translation Language

**1. Create locale file:**

```typescript
// src/lib/i18n/locales/fr.ts
export const fr = {
  common: {
    login: "Connexion",
    logout: "Déconnexion",
    // ... more translations
  },
};
```

**2. Update i18n config:**

```typescript
// src/lib/i18n/index.ts
import { fr } from "./locales/fr";

const translations = { en, es, ja, fr };

export type Locale = "en" | "es" | "ja" | "fr";
```

**3. Update LanguageSwitcher:**

```tsx
// src/components/LanguageSwitcher.tsx
const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "fr", label: "Français", flag: "🇫🇷" }, // ← Add this
];
```

### Adding a New Category (e.g., Grammar)

**1. Create page:**

```tsx
// src/app/n3/gramatica/page.tsx
"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";

export default function N3GrammarPage() {
  const [grammar, setGrammar] = useState([]);

  useEffect(() => {
    apiClient.getGrammar("n3").then(setGrammar);
  }, []);

  return <div>{/* render grammar */}</div>;
}
```

**2. Add API method:**

```typescript
// src/lib/api/client.ts
class ApiClient {
  async getGrammar(levelId: string): Promise<GrammarResponse> {
    return await this.fetch(`/grammar/${levelId}`);
  }
}
```

**3. Update level page:**

```tsx
// src/app/n3/page.tsx
const categories: Category[] = [
  { id: "vocabulario", icon: "📝", name: "Vocabulary", available: true },
  { id: "gramatica", icon: "📖", name: "Grammar", available: true }, // ← Enable
];
```

## 🔐 Security Considerations

### Current (Static Export)

```typescript
// Client-side only
if (!APP_CONFIG.ENABLE_AUTH) {
  // Show all content (for testing)
}

if (token) {
  // Show content (but token is in localStorage)
}
```

**⚠️ Limitations:**

- Token in localStorage (accessible via DevTools)
- No server-side validation
- Content is in the bundle (can be extracted)

**✅ Acceptable for:**

- Development/testing
- Demo apps
- Non-sensitive content

### Future (SSR + Backend)

```typescript
// src/middleware.ts (server-side)
export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate token with backend
  const isValid = await validateToken(token);

  if (!isValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
```

**Benefits:**

- httpOnly cookies (not accessible via JS)
- Server validates before serving HTML
- Premium content never reaches client
- Real security

## 🧪 Testing Strategy

### Unit Tests (Future)

```typescript
// src/lib/api/__tests__/client.test.ts
import { apiClient } from "../client";
import { APP_CONFIG } from "../../config";

describe("ApiClient", () => {
  beforeEach(() => {
    APP_CONFIG.MOCK_MODE = true;
    APP_CONFIG.ENABLE_AUTH = false;
  });

  it("should return all vocabulary when auth is disabled", async () => {
    const result = await apiClient.getVocabulary("n3");
    expect(result.words.length).toBe(800);
    expect(result.isPremium).toBe(true);
  });

  it("should return preview when auth is enabled and no token", async () => {
    APP_CONFIG.ENABLE_AUTH = true;
    const result = await apiClient.getVocabulary("n3");
    expect(result.words.length).toBe(10);
    expect(result.isPremium).toBe(false);
  });
});
```

### Integration Tests

```typescript
// src/app/n3/vocabulario/__tests__/page.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import VocabularioPage from "../page";

test("renders vocabulary list", async () => {
  render(<VocabularioPage />);

  await waitFor(() => {
    expect(screen.getByText("出会う")).toBeInTheDocument();
    expect(screen.getByText("であう")).toBeInTheDocument();
  });
});
```

## 📊 Performance Optimization

### Current Optimizations

1. **Static Generation**: All pages pre-rendered at build time
2. **Code Splitting**: Next.js automatically splits by route
3. **CSS Modules**: Scoped styles, only load what's needed
4. **Type Safety**: Catch errors at compile time

### Future Optimizations

1. **Lazy Loading**:

```typescript
const VocabularyList = dynamic(() => import("./VocabularyList"), {
  loading: () => <Spinner />,
  ssr: false,
});
```

2. **Memoization**:

```typescript
const VocabularyWord = memo(({ word }) => {
  return <div>{word.word}</div>;
});
```

3. **Virtual Scrolling** (for large lists):

```typescript
import { FixedSizeList } from "react-window";

<FixedSizeList height={600} itemCount={800} itemSize={100}>
  {VocabularyRow}
</FixedSizeList>;
```

## 🚀 Deployment

### GitHub Pages (Current)

```yaml
# .github/workflows/deploy.yml
- name: Build with Next.js
  run: npm run build
  env:
    NODE_ENV: production

- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./out
```

**Output:**

- Static HTML/CSS/JS in `out/`
- No server-side code
- Fast CDN delivery

### Vercel (Future)

```bash
vercel --prod
```

**Benefits:**

- SSR/ISR support
- Edge functions
- Automatic HTTPS
- Preview deployments

## 🔧 Configuration Reference

### `next.config.js`

```javascript
module.exports = {
  output: "export", // Static export for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/japanese" : "",
  images: { unoptimized: true }, // Required for static export

  // For SSR (comment out 'output' and 'basePath'):
  // i18n: { locales: ['en', 'es', 'ja'], defaultLocale: 'en' }
};
```

### `src/lib/config.ts`

```typescript
export const APP_CONFIG = {
  ENABLE_AUTH: false, // Show/hide login functionality
  MOCK_MODE: true, // Use mock data vs real API
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
};
```

### Environment Variables

Create `.env.local`:

```bash
# API URL (only used when MOCK_MODE = false)
NEXT_PUBLIC_API_URL=https://api.jlpt-resources.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📚 Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Context API](https://react.dev/reference/react/useContext)
- [Design Patterns](https://refactoring.guru/design-patterns)

## 🤝 Contributing

1. **Branch naming**: `feat/`, `fix/`, `refactor/`
2. **Commit format**: `type: description` (e.g., `feat: add N2 vocabulary`)
3. **Type safety**: Always add TypeScript types
4. **Code style**: Follow existing patterns (Facade, Provider, etc.)
5. **Testing**: Add tests for new API methods

---

**Last updated**: November 2024  
**Next.js version**: 14.2.33  
**Node.js version**: 20+
