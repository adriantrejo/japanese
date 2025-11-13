# 📚 JLPT Resources App

Next.js + TypeScript app for learning Japanese (JLPT N5-N1) with backend-ready architecture and multi-language support.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 🌍 Multi-Language Support

The app supports 3 languages out of the box:
- 🇺🇸 **English** (default)
- 🇪🇸 **Spanish**
- 🇯🇵 **Japanese**

Users can switch languages using the language switcher in the header. Preference is saved in localStorage.

## 📚 Content

### N3 Vocabulary
- ✅ **800 words** complete with examples (Spanish)
- Located in `src/lib/data/n3-vocabulary.ts`
- Ready for backend endpoint structure

### Other Levels
- Sample vocabulary in `src/lib/data/mockData.ts`
- TODO: Add N1, N2, N4, N5 full datasets

## 🏗️ Architecture

### Now: Static Export (GitHub Pages - Free)
- Next.js 14 + TypeScript + App Router
- Mock data with N3 complete (800 words)
- Client-side auth simulation
- Automatic deploy to GitHub Pages
- **i18n** with 3 languages (en, es, ja)

### Future: SSR with Real Backend
You only need to:
1. Change `isMockMode = false` in `src/lib/api/client.ts`
2. Set `NEXT_PUBLIC_API_URL` in `.env`
3. Comment out `output: 'export'` in `next.config.js`
4. Deploy to Vercel instead of GitHub Pages

## 📂 Structure

```
src/
├── app/                      # Pages (Next.js App Router)
│   ├── page.tsx             # Home
│   ├── login/               # Login
│   ├── n1/ n2/ n3/ n4/ n5/  # JLPT levels
│   └── upgrade/             # Premium
├── components/
│   ├── Header.tsx           # Header with auth
│   ├── ProtectedRoute.tsx   # Route protection HOC
│   └── LanguageSwitcher.tsx # Language switcher
└── lib/
    ├── api/client.ts        # ⭐ API Layer (mock → real)
    ├── auth/AuthContext.tsx # Auth context
    ├── i18n/                # ⭐ Internationalization
    │   ├── index.ts         # i18n setup
    │   ├── LanguageContext.tsx
    │   └── locales/         # en, es, ja
    └── data/
        ├── mockData.ts      # Mock data (N1, N2, N4, N5)
        └── n3-vocabulary.ts # ⭐ N3 Full dataset (800 words)
```

## 🎯 Features

- ✅ TypeScript with complete types
- ✅ All JLPT levels N1-N5
- ✅ **N3: Complete 800 words** with Spanish translations
- ✅ **Multi-language (en/es/ja)** with easy extension
- ✅ Login/Auth (mock)
- ✅ Premium content with paywall
- ✅ Mobile design (iOS/Android)
- ✅ Dark mode
- ✅ React Router
- ✅ SSR-ready

## 🧪 Testing

### Quick Toggle: Auth On/Off

Edit `src/lib/config.ts`:

```typescript
export const APP_CONFIG = {
  ENABLE_AUTH: false, // ← false = no login required (for testing)
}
```

**`ENABLE_AUTH: false` (Development)**
- No login required
- Full access to all content
- No paywall/preview restrictions
- Login/Logout buttons hidden

**`ENABLE_AUTH: true` (Production)**
- Login required for full access
- Preview mode: 10 words without login
- Any email/password = paid user = full access

## 🌍 Backend API Structure (Future)

The vocabulary data is already structured for the future backend endpoint:

```typescript
// GET /api/vocabulary/:level?lang=es
GET /api/vocabulary/n3?lang=es

// Response:
{
  "level": "n3",
  "language": "es",
  "total": 800,
  "words": [
    {
      "id": 1,
      "word": "出会う",
      "reading": "であう",
      "meaning": "encontrarse con; conocer",
      "exampleJp": "駅で友達に出会った。",
      "exampleEs": "Me encontré con un amigo en la estación."
    },
    // ... 799 more
  ]
}
```

See `src/lib/data/n3-vocabulary.ts` for the complete implementation.

## 📦 Deploy to GitHub Pages

1. **Update `next.config.js`:**
```javascript
basePath: '/your-repo-name',  // ← Change this
```

2. **Push to GitHub:**
```bash
git add .
git commit -m "Setup Next.js app"
git push origin main
```

3. **GitHub Settings → Pages:**
   - Source: **GitHub Actions**
   - Wait 3 min

4. **Your app:** `https://your-username.github.io/your-repo-name`

## 🔄 Migration to SSR (when you have backend)

### 1. Create your backend with these endpoints:

```typescript
POST /api/auth/login       → { user, token }
GET  /api/auth/me          → { user }
POST /api/auth/logout      → { success }
GET  /api/vocabulary/:level?lang=es → { level, language, total, words[] }
```

### 2. Update frontend:

**`src/lib/api/client.ts`:**
```typescript
const isMockMode = false; // ← Only change this
```

**`.env.local`:**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.com
```

**`next.config.js`:**
```javascript
// Comment these lines:
// output: 'export',
// basePath: '/japanese',
```

### 3. Create Middleware for SSR:

**`src/middleware.ts`** (create new file):
```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const protectedRoutes = ["/premium", "/dashboard"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
```

### 4. Deploy to Vercel:

```bash
npm i -g vercel
vercel --prod
```

## 📱 Recommended Stack (Future)

- **Backend**: Supabase (auth + DB free tier) or Node.js + Express
- **Payments**: Stripe
- **Hosting**: Vercel (free up to 100GB)
- **DB**: PostgreSQL with Row Level Security

## 🔐 Security

### Now (Static Export - GitHub Pages)
- ⚠️ Client-side protection only (visual)
- OK for demo
- **No middleware** (incompatible with static export)

### Future (SSR - Vercel/Netlify)
- ✅ Middleware validates before serving HTML
- ✅ httpOnly cookies
- ✅ Backend validates each request
- ✅ Premium content never reaches client if not auth

## 🛠️ Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # Linter
npm run deploy   # Deploy to GitHub Pages
```

## 💡 Next Steps

1. **Content**: Add N1, N2, N4, N5 full datasets
2. **Backend**: Create API (Supabase recommended)
3. **Migrate SSR**: Follow steps above
4. **Stripe**: Integrate payments
5. **Features**: Flashcards, quizzes, progress tracking

## 🐛 Troubleshooting

**Port occupied:**
```bash
PORT=3001 npm run dev
```

**Build fails:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**GitHub Pages 404:**
- Check `basePath` in `next.config.js`
- Wait 5-10 min after deploy

**TypeScript errors:**
```bash
# Clear cache
rm -rf .next
npm run build
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Supabase](https://supabase.com/docs)

---

Good luck! 💪 | ¡Suerte! 💪 | がんばって！💪
