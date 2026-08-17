# Backend Learning List — Matrimony Project

Ye list un saare concepts ki hai jo is matrimony backend project me use ho rahe hain (ya aage honge). Apni pace se padho, aur jo topic padho uska real example humare project ke code me dhoondh ke dobara dekho — isse jaldi samajh aayega.

---

## 1️⃣ JavaScript Fundamentals (Zaroori Base)
- `async/await` aur Promises (har database call isse hoti hai)
- Destructuring — `const { name, phone } = payload`
- Spread/Rest operator (`...`)
- Array methods: `.map()`, `.filter()`, `.find()`
- Ternary operator (`condition ? a : b`)
- Template literals — `` `Hello ${name}` ``
- Modules — `require()` / `module.exports` (CommonJS)

## 2️⃣ Node.js Basics
- Node.js kya hai, kaise JavaScript ko server pe chalata hai
- `npm` — packages install/manage karna, `package.json` ka role
- Environment variables (`.env`, `process.env`)

## 3️⃣ Express.js (Web Framework)
- Routing (`app.get`, `app.post`, `router.use`)
- Middleware ka concept `(req, res, next)` — **sabse important concept**
- `req.body`, `req.params`, `req.query`, `req.headers` — in charo ka farak
- Error-handling middleware (4-parameter pattern)
- Middleware chaining/order ka matter karna

## 4️⃣ MongoDB + Mongoose (Database)
- MongoDB kya hai (NoSQL, documents/collections)
- Mongoose Schema aur Models
- Field types: `String`, `Number`, `Date`, `Boolean`, `enum`, nested objects, arrays
- Validation (`required`, `unique`, `min`, `max`)
- CRUD operations: `.create()`, `.find()`, `.findOne()`, `.findById()`, `.findOneAndUpdate()`, `.save()`
- `populate()` aur `ref` (documents ko link karna)
- TTL Index (auto-expiry documents ke liye — jaise OTP, RefreshToken)
- `upsert` (create + update ek saath)
- Sub-documents (arrays ke andar objects, jaise `photos`)

## 5️⃣ Authentication & Security
- Password Hashing — `bcrypt`/`bcryptjs` (hash vs encrypt ka farak)
- JWT (JSON Web Tokens) — access token vs refresh token
- Token verification, expiry, signing
- Authorization Header (`Bearer <token>`)
- Role-Based Access Control (RBAC) — member/admin/moderator
- Rate limiting (brute-force attacks se bachna)
- CORS kya hai aur kyun chahiye
- Helmet (security headers)

## 6️⃣ Validation
- Joi library — schemas, `.required()`, `.optional()`, `.valid()`, `.pattern()`
- Client input ko kabhi trust na karna (server-side validation zaroori kyun)

## 7️⃣ File Uploads
- `multipart/form-data` kya hota hai (JSON se alag kyun)
- Multer library
- Cloud storage (Cloudinary) — kyun local server pe files store nahi karte

## 8️⃣ API Design Concepts
- REST API principles (GET/POST/PUT/DELETE ka sahi use)
- HTTP Status Codes (200, 201, 400, 401, 403, 404, 409, 500 — kab kaunsa)
- Consistent response format (`{ success, message, data }`)
- Pagination (`page`, `limit`)
- Query parameters vs Body vs Params

## 9️⃣ Project Architecture (Software Design)
- Layered architecture: **Routes → Middleware → Controller → Service → Model**
- Separation of concerns (har layer ka apna kaam)
- DRY principle (Don't Repeat Yourself) — jaise `asyncHandler` helper
- Error handling patterns (centralized error handler)

## 🔟 Aage Jo Aayega (Is Project Me)
- Aggregation/complex queries (Search, Matching engine ke liye)
- Socket.IO (real-time chat)
- Payment gateway integration (Razorpay)
- Background jobs/cron (subscription expiry)
- Email/SMS service integration
- Redis (caching, agar future me add karein)
- Deployment concepts (Docker, hosting)

---

## 📖 Padhne Ka Suggested Order (Priority)

1. **JavaScript async/await + destructuring** (agar weak lage)
2. **Express middleware concept** (sabse zyada confuse karta hai shuru me)
3. **Mongoose CRUD + Schema**
4. **JWT + Authentication flow**
5. Baaki sab dheere-dheere, jaise-jaise modules banate jayenge

---

## ✅ Ab Tak Project Me Kya Ban Chuka Hai

- Foundation (Express, MongoDB connection, error handling, security middleware)
- Auth Module (Register, Login, Reset Password, JWT access + refresh tokens)
- Protect Middleware (login-required routes)
- Profile Module (personal, religion, education, family, privacy)
- Dashboard (user + profile summary, completion %)
- Photo Upload/Delete (Cloudinary free tier)
- Search Module (in progress)
