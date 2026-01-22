# Node.js REST API - Social Feed Application

A complete RESTful API built with Node.js, Express, and MongoDB for managing
user authentication and social media posts with image uploads.

## 🚀 Features

### Authentication

- **User Signup** - Create new accounts with email validation
- **User Login** - Secure login with JWT tokens
- **User Status** - Get and update user status/profile
- **Password Security** - Bcrypt hashing for secure password storage

### Posts/Feed

- **Create Posts** - Create posts with title, content, and image upload
- **Get All Posts** - Paginated post listing (2 posts per page)
- **Get Single Post** - Fetch individual post details
- **Update Post** - Edit your own posts (authorization protected)
- **Delete Post** - Remove your own posts (authorization protected)

### Security & Validation

- **JWT Authentication** - Token-based authentication for protected routes
- **Input Validation** - Express-validator for request validation
- **Authorization** - Users can only modify their own posts
- **Image Upload** - Multer for handling image uploads (PNG, JPG, JPEG)

## 📋 Prerequisites

- Node.js (v12 or higher)
- MongoDB database
- npm or yarn

## 📡 API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint       | Description        | Auth Required |
| ------ | -------------- | ------------------ | ------------- |
| PUT    | `/auth/signup` | Register new user  | No            |
| POST   | `/auth/login`  | Login user         | No            |
| GET    | `/auth/status` | Get user status    | Yes           |
| PATCH  | `/auth/status` | Update user status | Yes           |

### Feed Routes (`/feed`)

| Method | Endpoint             | Description         | Auth Required |
| ------ | -------------------- | ------------------- | ------------- |
| GET    | `/feed/posts?page=1` | Get paginated posts | Yes           |
| POST   | `/feed/post`         | Create new post     | Yes           |
| GET    | `/feed/post/:postId` | Get single post     | Yes           |
| PUT    | `/feed/post/:postId` | Update post         | Yes           |
| DELETE | `/feed/post/:postId` | Delete post         | Yes           |

## 📝 Request Examples

### Signup

```json
PUT /auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login

```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `{ "token": "jwt_token_here", "userId": "user_id" }`

### Create Post

```json
POST /feed/post
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "My First Post",
  "content": "This is the content of my post",
  "image": <image_file>
}
```

### Get Posts (Paginated)

```
GET /feed/posts?page=1
Headers: Authorization: Bearer <token>
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 1 hour.

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 📦 Dependencies

### Core

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **express-validator** - Input validation

### Development

- **mocha** - Test framework
- **chai** - Assertion library
- **sinon** - Testing utilities
- **nodemon** - Development server

## 📁 Project Structure

```
Node-Testing-Application/
├── app.js                 # Main application entry
├── controllers/           # Business logic
│   ├── auth.js           # Authentication controllers
│   └── feed.js           # Post/Feed controllers
├── middleware/           # Custom middleware
│   └── is-auth.js       # JWT authentication middleware
├── models/               # Database models
│   ├── user.js          # User schema
│   └── post.js          # Post schema
├── routes/               # API routes
│   ├── auth.js          # Authentication routes
│   └── feed.js          # Feed routes
├── test/                # Test files
└── images/              # Uploaded images directory
```

## 🔧 Configuration

- **Port:** 8080 (default)
- **Image Storage:** `./images` directory
- **Pagination:** 2 posts per page
- **Token Expiry:** 1 hour
- **CORS:** Enabled for all origins

## ⚠️ Important Notes

1. Update MongoDB connection string in `app.js` before running
2. JWT secret is hardcoded - use environment variables in production
3. Image files are stored locally in the `images` directory
4. Only post creators can update or delete their posts

## 📄 License

ISC
