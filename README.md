<div align="center">

# 🏡 TravoNest

### A cozy blend of *Travel* + *Nest* — a full-stack property listing & booking platform

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://travo-nest-sepia.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-22.6.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-blue?style=for-the-badge)](#license)

**[🌐 Live Demo](https://travo-nest-sepia.vercel.app)** · **[🐛 Report a Bug](../../issues)** · **[✨ Request a Feature](../../issues)**

</div>

---

## 📖 About The Project

**TravoNest** is a full-stack property listing and booking web application, built in the spirit of Airbnb — a place where users can discover unique stays, list their own properties, and book their next getaway. It was built end-to-end (server, database, auth, payments, and UI) to demonstrate a complete, production-style **MVC web application** using the Node.js/Express ecosystem.

The name itself reflects the idea: **Travo** (travel) + **Nest** (a cozy home) — helping travelers find a home away from home.

> 🎯 **Why this project?** It was built to go beyond CRUD basics and implement real-world concerns: authentication & authorization, server-side validation, cloud image storage, payment integration, session persistence, and a clean MVC architecture — the kind of features expected in production applications.

---

## ✨ Key Features

- 🔐 **Secure Authentication & Authorization** — User sign-up/login powered by Passport.js (`passport-local` + `passport-local-mongoose`), with session persistence stored in MongoDB via `connect-mongo` so users stay logged in across visits.
- 🏘️ **Full Listing Management (CRUD)** — Users can create, view, update, and delete their own property listings, with ownership-based access control ensuring only the listing owner can edit or delete it.
- ☁️ **Cloud-Based Image Uploads** — Listings support real image uploads handled by `Multer` and stored on **Cloudinary**, so photos are optimized and served from the cloud instead of the server disk.
- 💳 **Integrated Payments** — Razorpay integration lays the groundwork for real booking transactions and payment handling.
- ✅ **Robust Server-Side Validation** — All incoming data (listings, reviews, users) is validated with **Joi** schemas before it ever touches the database, preventing malformed or malicious input.
- 💬 **Reviews & Ratings System** — Authenticated users can leave reviews on listings, with logic ensuring users can only delete their own reviews.
- 🚦 **Custom Middleware Pipeline** — Route-level middleware (`middleware.js`) enforces authentication checks, author/owner checks, and validation before requests reach controllers — keeping route files clean and declarative.
- 🔔 **Flash Messaging** — Real-time success/error feedback (e.g. "Listing created!", "You must be logged in") via `connect-flash`, giving the app a polished, responsive feel.
- 🎨 **Server-Rendered Dynamic UI** — Built with `EJS` + `ejs-mate` for reusable layouts/partials (navbar, footer, boilerplate), keeping the frontend DRY and maintainable.
- 🧭 **RESTful Route Architecture** — Routes follow REST conventions and are organized per-resource (`listings`, `reviews`, `users`) for clarity and scalability.
- 📱 **Responsive Design** — Works cleanly across desktop and mobile viewports.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js (v22) |
| **Server Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Templating** | EJS + EJS-Mate |
| **Authentication** | Passport.js (Local Strategy) |
| **Session Store** | express-session + connect-mongo |
| **Validation** | Joi |
| **File/Image Uploads** | Multer + Cloudinary (`multer-storage-cloudinary`) |
| **Payments** | Razorpay |
| **Messaging/UX** | connect-flash |
| **Deployment** | Vercel |

---

## 🏗️ Architecture

TravoNest follows the **MVC (Model–View–Controller)** pattern for a clean separation of concerns:

```
TravoNest/
├── controllers/       # Business logic — handles requests, talks to models
├── models/             # Mongoose schemas (Listing, Review, User)
├── routes/             # Express routers, organized per resource
├── views/              # EJS templates & partials (the UI)
├── public/             # Static assets (CSS, client-side JS, images)
├── init/               # Database seed/initialization scripts
├── utils/              # Reusable helpers (error handling, wrappers, etc.)
├── middleware.js        # Auth, ownership & validation middleware
├── schema.js            # Joi validation schemas
├── cloudeConfig.js      # Cloudinary configuration
├── index.js             # Application entry point
└── vercel.json           # Deployment configuration
```

**Request flow:** `Route → Middleware (auth/validation) → Controller → Model → View`

This keeps every layer responsible for exactly one thing — routes stay thin, controllers hold logic, and models own the data shape and rules.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.x recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or a MongoDB Atlas URI)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A [Razorpay](https://razorpay.com/) account (for payment features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jay-Odedra-1884/TravoNest.git
   cd TravoNest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.sample` to `.env` and fill in your own credentials:
   ```bash
   cp .env.sample .env
   ```
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Run the app**
   ```bash
   npm start
   ```

5. Open your browser at **`http://localhost:8080`** (or your configured port).

---

## 🗺️ Roadmap

- [ ] Search & filter listings by location, price, and amenities
- [ ] Map-based listing view
- [ ] Booking management
- [ ] Wishlist / saved listings
- [ ] Host dashboard with booking analytics

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**.

---

## 👤 Author

**Jay Odedra**

- GitHub: [@Jay-Odedra-1884](https://github.com/Jay-Odedra-1884)

<div align="center">

If you found this project interesting, consider giving it a ⭐ — it helps a lot!

</div>
