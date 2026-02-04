# Medium - Blogging Webapp

A full-stack blogging platform inspired by Medium, built with React, Node.js, Express, and Prisma.

## Features

- **User Authentication**: Sign up and sign in functionality with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Author Profiles**: View all blogs by a specific author
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Rich Text Content**: Support for blog content with titles and descriptions

## Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Zod** - Schema validation

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 20 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd medium
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration:**

   Create a `.env` file in the `backend` directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/medium_db"
   JWT_SECRET="your-secret-key"
   ```

5. **Database Setup:**
   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma generate
   ```

## Usage

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3000`

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login

### Blogs
- `GET /api/v1/blog/bulk` - Get all published blogs
- `GET /api/v1/blog/:id` - Get a specific blog
- `POST /api/v1/blog` - Create a new blog (authenticated)
- `PUT /api/v1/blog/:id` - Update a blog (authenticated, author only)
- `GET /api/v1/blog/author/:authorId` - Get blogs by author

### Account
- `GET /api/v1/account/me` - Get current user info (authenticated)

## Project Structure

```
medium/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── blog.js
│   │   └── account.js
│   ├── package.json
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
