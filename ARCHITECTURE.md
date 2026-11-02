# StyleSync: System Architecture

## 1. Project Overview

StyleSync is a fashion and wardrobe management web application that helps users organize their clothes, explore fashion products, create outfit combinations and save their favourite products.

The main purpose of this application is to make wardrobe management easier and provide users with a convenient platform to manage their fashion preferences.

## 2. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend | Node.js and Express.js |
| Database | MongoDB |
| Authentication | JSON Web Token (JWT) |
| Image Storage | Cloudinary |
| API Architecture | REST API |
| Version Control | Git and GitHub |

## 3. System Components

### 3.1 Frontend

The frontend handles the user interface and allows users to interact with the application. It includes navigation, forms, dashboards, clothing catalogues and wardrobe management screens.

### 3.2 Backend

The backend manages application logic, API requests, user authentication, authorization and data validation. It processes requests received from the frontend and communicates with the database.

### 3.3 Database

MongoDB is used to store user information, clothing details, outfit combinations, product information and wishlist records.

### 3.4 External Services

Cloudinary is used to store and manage clothing and product images.

JWT is used to manage user authentication and access to protected resources.

## 4. Main Application Modules

1. User Authentication
2. User Dashboard
3. Clothing Catalogue
4. Personal Wardrobe Management
5. Outfit Planner
6. Wishlist Management
7. Admin Management

## 5. Application Architecture

StyleSync follows a client-server architecture. The React frontend communicates with the Node.js and Express backend through REST APIs.

The backend processes user requests, validates the information and performs the required database operations using MongoDB. Cloudinary is used for image storage.

### 5.1 Working Process

1. The user interacts with the React frontend.
2. The frontend sends requests to the backend.
3. The backend validates and processes the requests.
4. MongoDB stores or retrieves the required information.
5. Cloudinary handles image uploads and storage.
6. The backend sends a response to the frontend.
7. The frontend displays the updated information.

## 6. Project Scope

The initial version of StyleSync will include user registration and login, personal wardrobe management, clothing catalogue browsing, outfit creation, wishlist management and product management for administrators.

The application will be designed to work on both desktop and mobile screens.

## 7. Database Design

MongoDB will be used as the primary database. The application will contain the following collections.

### 7.1 User Model

This collection stores registered user information.

| Field | Data Type | Description |
|---|---|---|
| _id | ObjectId | Unique user ID |
| name | String | Full name |
| email | String | Unique email |
| password | String | Hashed password |
| role | String | User or admin |
| createdAt | Date | Registration date |

### 7.2 Clothing Model

This collection stores clothing items added by users.

| Field | Data Type | Description |
|---|---|---|
| _id | ObjectId | Clothing ID |
| userId | ObjectId | Owner's user ID |
| name | String | Clothing name |
| category | String | Shirt, jeans, dress, etc. |
| color | String | Clothing colour |
| size | String | Clothing size |
| imageUrl | String | Image URL |
| createdAt | Date | Creation date |

### 7.3 Outfit Model

This collection stores outfit combinations created by users.

| Field | Data Type | Description |
|---|---|---|
| _id | ObjectId | Outfit ID |
| userId | ObjectId | Owner's user ID |
| name | String | Outfit name |
| clothingItems | Array of ObjectId | Clothing references |
| occasion | String | Casual, party or formal |
| createdAt | Date | Creation date |

### 7.4 Product Model

This collection stores products available in the clothing catalogue.

| Field | Data Type | Description |
|---|---|---|
| _id | ObjectId | Product ID |
| name | String | Product name |
| category | String | Product category |
| brand | String | Brand name |
| price | Number | Product price |
| size | Array of String | Available sizes |
| imageUrl | String | Product image |
| description | String | Product details |

### 7.5 Wishlist Model

This collection stores products saved by users.

| Field | Data Type | Description |
|---|---|---|
| _id | ObjectId | Wishlist ID |
| userId | ObjectId | User reference |
| productId | ObjectId | Product reference |
| createdAt | Date | Date added |

### 7.6 Database Relationships

1. One user can have multiple clothing items.
2. One user can create multiple outfits.
3. One outfit can contain multiple clothing items.
4. One user can have multiple wishlist entries.
5. Each wishlist entry references a product.

## 8. API Routes

The application will use REST APIs for communication between the frontend and backend.

### 8.1 Authentication Routes

| HTTP Method | API Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Authenticate a user |
| GET | /api/auth/me | Get current user details |

### 8.2 Clothing Routes

| HTTP Method | API Endpoint | Description |
|---|---|---|
| GET | /api/clothing | Get user's clothing items |
| POST | /api/clothing | Add a clothing item |
| GET | /api/clothing/:id | Get clothing item details |
| PUT | /api/clothing/:id | Update clothing details |
| DELETE | /api/clothing/:id | Delete a clothing item |

### 8.3 Outfit Routes

| HTTP Method | API Endpoint | Description |
|---|---|---|
| GET | /api/outfits | Get all user outfits |
| POST | /api/outfits | Create a new outfit |
| GET | /api/outfits/:id | Get outfit details |
| PUT | /api/outfits/:id | Update an outfit |
| DELETE | /api/outfits/:id | Delete an outfit |

### 8.4 Product Routes

| HTTP Method | API Endpoint | Description |
|---|---|---|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product details |
| POST | /api/products | Add a new product (Admin) |
| PUT | /api/products/:id | Update product details (Admin) |
| DELETE | /api/products/:id | Delete a product (Admin) |

### 8.5 Wishlist Routes

| HTTP Method | API Endpoint | Description |
|---|---|---|
| GET | /api/wishlist | Get user's wishlist |
| POST | /api/wishlist | Add product to wishlist |
| DELETE | /api/wishlist/:id | Remove product from wishlist |

## 9. Frontend Screens

| Screen | Description |
|---|---|
| Landing Page | Introduces StyleSync and its features |
| Registration Page | Allows new users to create an account |
| Login Page | Allows existing users to log in |
| Dashboard | Displays wardrobe overview and activity |
| Clothing Catalogue | Displays available fashion products |
| My Wardrobe | Allows users to manage their clothing items |
| Outfit Planner | Allows users to create and manage outfits |
| Wishlist | Displays saved products |
| Admin Dashboard | Allows administrators to manage products and users |

## 10. Conclusion

StyleSync is a proposed fashion and wardrobe management application built around React.js, Node.js, Express.js and MongoDB.

The architecture defines the main application components, database collections, API endpoints and frontend screens. It provides a clear structure for the development of the application in the future.
