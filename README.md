# Movie Center API

A comprehensive movie rental API built with Node.js, Express, and MongoDB.

## Base URL
- **Production**: `https://moviecenter-three.vercel.app`
- **Local**: `http://localhost:3000`

## API Routes & Use Cases

### 🎭 Genres (`/api/genres`)

| Method | Endpoint | Description | Auth Required | Admin Required |
|--------|----------|-------------|---------------|----------------|
| `GET` | `/api/genres` | Get all movie genres | ❌ | ❌ |
| `GET` | `/api/genres/:id` | Get a specific genre by ID | ❌ | ❌ |
| `POST` | `/api/genres` | Create a new genre | ✅ | ❌ |
| `PUT` | `/api/genres/:id` | Update an existing genre | ✅ | ❌ |
| `DELETE` | `/api/genres/:id` | Delete a genre | ✅ | ✅ |

**POST/PUT Request Body:**
```json
{
  "name": "Action"
}
```

### 🎬 Movies (`/api/movies`)

| Method | Endpoint | Description | Auth Required | Admin Required |
|--------|----------|-------------|---------------|----------------|
| `GET` | `/api/movies` | Get all movies | ❌ | ❌ |
| `GET` | `/api/movies/:id` | Get a specific movie by ID | ❌ | ❌ |
| `POST` | `/api/movies` | Create a new movie | ✅ | ❌ |
| `PUT` | `/api/movies/:id` | Update an existing movie | ✅ | ❌ |
| `DELETE` | `/api/movies/:id` | Delete a movie | ✅ | ✅ |

**POST/PUT Request Body:**
```json
{
  "title": "Terminator",
  "genreId": "genre_object_id",
  "numberInStock": 10,
  "dailyRentalRate": 2
}
```

### 👥 Customers (`/api/customers`)

| Method | Endpoint | Description | Auth Required | Admin Required |
|--------|----------|-------------|---------------|----------------|
| `GET` | `/api/customers` | Get all customers | ❌ | ❌ |
| `GET` | `/api/customers/:id` | Get a specific customer by ID | ❌ | ❌ |
| `POST` | `/api/customers` | Create a new customer | ✅ | ❌ |
| `PUT` | `/api/customers/:id` | Update customer information | ✅ | ❌ |
| `DELETE` | `/api/customers/:id` | Delete a customer | ✅ | ✅ |

**POST/PUT Request Body:**
```json
{
  "name": "John Doe",
  "isGold": true,
  "phone": "1234567890"
}
```

### 📱 Users (`/api/users`)

| Method | Endpoint | Description | Auth Required | Admin Required |
|--------|----------|-------------|---------------|----------------|
| `GET` | `/api/users/me` | Get current user profile | ✅ | ❌ |
| `POST` | `/api/users` | Register a new user | ❌ | ❌ |

**POST Request Body (Register):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required | Admin Required |
|--------|----------|-------------|---------------|----------------|
| `POST` | `/api/auth` | Login user | ❌ | ❌ |

**POST Request Body (Login):**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### 🏪 Rentals (`/api/rentals`)

| Method | Endpoint | Description | Auth Required | Admin Required |
|--------|----------|-------------|---------------|----------------|
| `GET` | `/api/rentals` | Get all rentals | ❌ | ❌ |
| `GET` | `/api/rentals/:id` | Get a specific rental by ID | ❌ | ❌ |
| `POST` | `/api/rentals` | Create a new rental | ✅ | ❌ |

**POST Request Body (Create Rental):**
```json
{
  "customerId": "customer_object_id",
  "movieId": "movie_object_id"
}
```

## Authentication

### Getting JWT Token
1. Register a new user: `POST /api/users`
2. Login: `POST /api/auth`
3. Use the returned token in the `x-auth-token` header for protected routes

### Headers for Protected Routes
```
x-auth-token: your_jwt_token_here
Content-Type: application/json
```

## Use Cases

### 🎯 Common Workflows

**1. User Registration & Login**
```
1. POST /api/users (register)
2. POST /api/auth (login to get JWT)
3. GET /api/users/me (verify token)
```

**2. Browse Movies**
```
1. GET /api/genres (see available genres)
2. GET /api/movies (browse all movies)
3. GET /api/movies/:id (get movie details)
```

**3. Rent a Movie**
```
1. POST /api/customers (create customer profile)
2. POST /api/rentals (rent a movie)
3. GET /api/rentals (view rental history)
```

**4. Admin Operations**
```
1. POST /api/genres (add new genres)
2. POST /api/movies (add new movies)
3. DELETE /api/movies/:id (remove movies)
```

## Response Formats

### Success Response
```json
{
  "_id": "object_id",
  "name": "Action",
  "__v": 0
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error
