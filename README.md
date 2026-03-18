# 🍔 Food Ordering API

A **GraphQL-based backend API** for a role-based food ordering system built with **NestJS, Prisma 7, and Supabase PostgreSQL**.

This project demonstrates:

- Role-Based Access Control (RBAC)
- Country-based access restrictions
- Authentication with JWT
- Restaurant & menu management
- Cart & order management
- Payment method handling

---

# 🚀 Tech Stack

| Technology | Purpose |
|------------|--------|
| **NestJS** | Backend framework |
| **GraphQL (Apollo Server)** | API layer |
| **Prisma 7** | ORM with `@prisma/adapter-pg` |
| **Supabase** | PostgreSQL database |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |

---

# 📋 Prerequisites

Before running the project, make sure you have:

- **Node.js v18+**
- **npm v9+**
- **Supabase account**
- A **Supabase project with PostgreSQL enabled**

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd food-ordering


##2️⃣ Install dependencies

   npm install
##3️⃣ Configure Environment Variables
cp .env.example .env
Update the .env file with your credentials:

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"

JWT_SECRET="your-secret-key"

##4️⃣ Run database migrations
npx prisma migrate dev --name init

## 5️⃣ Generate Prisma client
   npx prisma generate

## ▶️ Running the Application
  npm run start:dev

Server will start at:http://localhost:3000

## 🔍 GraphQL Playground
 http://localhost:3000/graphql

### 🔐 Authentication
Register
mutation {
  register(input: {
    email: "user@example.com"
    password: "password123"
    name: "John Doe"
    role: MEMBER
    country: INDIA
  }) {
    token
    user {
      id
      email
      role
    }
  }
}

## Login
mutation {
  login(input: {
    email: "user@example.com"
    password: "password123"
  }) {
    token
    user {
      id
      email
      role
    }
  }
}

Setting the Auth Token

In GraphQL Playground, open the Headers tab and add:

{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}

🍽 Restaurants
Get All Restaurants

query {
  restaurants {
    id
    name
    country
    menuItems {
      id
      name
      price
    }
  }
}

Create Restaurant

(ADMIN / MANAGER only)

mutation {
  createRestaurant(input: {
    name: "Pizza Palace"
    country: INDIA
  }) {
    id
    name
    country
  }
}

Add Menu Item

(ADMIN / MANAGER only)

mutation {
  createMenuItem(input: {
    name: "Margherita Pizza"
    price: 12.99
    description: "Classic pizza"
    restaurantId: 1
  }) {
    id
    name
    price
  }
}


🛒 Cart
Add Item to Cart
mutation {
  addToCart(input: {
    menuItemId: 1
    quantity: 2
  }) {
    id
    menuItemName
    quantity
    price
  }
}

View Cart
query {
  myCart {
    id
    menuItemName
    quantity
    price
  }
}

Remove Item from Cart:
mutation {
  removeFromCart(cartItemId: 1) {
    id
    menuItemName
  }
}

📦 Orders
Place Order (from cart)
mutation {
  placeOrder(input: { restaurantId: 1 }) {
    id
    status
    totalAmount
    items {
      menuItemId
      quantity
      price
    }
  }
}
View My Orders
query {
  myOrders {
    id
    status
    totalAmount
    createdAt
  }
}

Update Order Status

(ADMIN / MANAGER only)

mutation {
  updateOrderStatus(id: 1, input: { status: CONFIRMED }) {
    id
    status
  }
}

💳 Payments
Add Payment Method
mutation {
  addPaymentMethod(input: {
    type: "VISA"
    last4: "4242"
    isDefault: true
  }) {
    id
    type
    last4
    isDefault
  }
}

View Payment Methods
query {
  myPaymentMethods {
    id
    type
    last4
    isDefault
  }
}

### 🔐 Roles & Permissions
Operation	MEMBER	MANAGER	ADMIN
Register / Login	✅	✅	✅
View restaurants & menu	✅	✅	✅
Manage cart & orders	✅	✅	✅
Create / edit restaurants	❌	✅	✅
Update order status	❌	✅	✅
View all orders	❌	✅	✅
View all users	❌	❌	✅
Delete restaurant	❌	❌	✅





