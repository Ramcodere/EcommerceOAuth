# E-commerce Project - Version 1

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)


## Description
This E-commerce web application provides a platform for users to browse and purchase a variety of products. It features a clean and intuitive interface designed to enhance the shopping experience. Users can register, log in, and manage their shopping carts efficiently.

## Features
- **User Authentication:** Secure registration and login process.
- **Product Catalog:** Display products with options to filter by category, price, and popularity.
- **Shopping Cart:** Add, update, or remove products from the cart with real-time updates.
- **Checkout Process:** Easy checkout with payment integration.
- **Order History:** Users can view their past purchases and order statuses.
- **Responsive Design:** Mobile-friendly interface for seamless access on various devices.
- **Admin Panel:** Admin users can add, edit, or remove products from the catalog.

## Technologies Used
- **Frontend:**
  - React
  - Redux for state management
  - HTML5, CSS3, JavaScript
  - Bootstrap or Material-UI for styling
- **Backend:**
  - Node.js with Express.js
  - MongoDB for the database
  - JWT (JSON Web Tokens) for user authentication
- **Others:**
  - Git for version control
  - GitHub for repository hosting
  - Postman for API testing

## Installation
Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ramcodere/E-Commerce-V1


API Endpoints

The following are the main API endpoints available:

User Authentication:

POST /api/users/register - Register a new user.
POST /api/users/login - Log in a user.
Products:

GET /api/products - Retrieve all products.
GET /api/products/:id - Retrieve a specific product by ID.
Cart:

GET /api/cart - Retrieve the current user's cart.
POST /api/cart - Add a product to the cart.
DELETE /api/cart/:id - Remove a product from the cart.
Orders:

POST /api/orders - Create a new order.
GET /api/orders - Retrieve the user's order history.
