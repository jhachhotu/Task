Food Ordering API
A GraphQL API for a food ordering system built with NestJS, Prisma 7, and Supabase PostgreSQL.

Tech Stack
NestJS — Node.js framework
GraphQL (Apollo Server) — API layer
Prisma 7 — ORM with @prisma/adapter-pg
Supabase — PostgreSQL database
JWT — Authentication
bcryptjs — Password hashing
Prerequisites
Node.js v18+
npm v9+
A Supabase account with a project created
Installation
1. Clone the repository
git clone <your-repo-url>
cd food-ordering
2. Install dependencies
npm install
3. Configure environment variables
Copy the example env file and fill in your values:

cp .env.example .env
Edit .env:

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
JWT_SECRET="your-secret-key-here"
Get your DATABASE_URL from Supabase → Project Settings → Database → Connection string (use port 6543 for the pooler)

4. Run database migrations
npx prisma migrate dev --name init
5. Generate Prisma client
npx prisma generate
Running the App
Development (watch mode)
npm run start:dev
Production
npm run build
npm run start:prod
The server starts at http://localhost:3000

GraphQL Playground
Once the server is running, open your browser and go to:

http://localhost:3000/graphql
API Usage
Authentication
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
    user { id email role }
  }
}
Login
mutation {
  login(input: {
    email: "user@example.com"
    password: "password123"
  }) {
    token
    user { id email role }
  }
}
Setting the Auth Token
In the GraphQL Playground, click the Headers tab at the bottom and add:

{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
Restaurants
Get all restaurants
query {
  restaurants {
    id
    name
    country
    menuItems { id name price }
  }
}
Create restaurant (ADMIN / MANAGER only)
mutation {
  createRestaurant(input: { name: "Pizza Palace", country: INDIA }) {
    id name country
  }
}
Add menu item (ADMIN / MANAGER only)
mutation {
  createMenuItem(input: {
    name: "Margherita Pizza"
    price: 12.99
    description: "Classic pizza"
    restaurantId: 1
  }) {
    id name price
  }
}
Cart
Add to cart
mutation {
  addToCart(input: { menuItemId: 1, quantity: 2 }) {
    id menuItemName quantity price
  }
}
View cart
query {
  myCart {
    id menuItemName quantity price
  }
}
Remove from cart
mutation {
  removeFromCart(cartItemId: 1) {
    id menuItemName
  }
}
Orders
Place order (from cart)
mutation {
  placeOrder(input: { restaurantId: 1 }) {
    id status totalAmount
    items { menuItemId quantity price }
  }
}
View my orders
query {
  myOrders {
    id status totalAmount createdAt
  }
}
Update order status (ADMIN / MANAGER only)
mutation {
  updateOrderStatus(id: 1, input: { status: CONFIRMED }) {
    id status
  }
}
Payments
Add payment method
mutation {
  addPaymentMethod(input: { type: "VISA", last4: "4242", isDefault: true }) {
    id type last4 isDefault
  }
}
View payment methods
query {
  myPaymentMethods {
    id type last4 isDefault
  }
}
Roles & Permissions
Operation	MEMBER	MANAGER	ADMIN
Register / Login	✅	✅	✅
View restaurants & menu	✅	✅	✅
Manage cart & orders	✅	✅	✅
Create / edit restaurants	❌	✅	✅
Update order status	❌	✅	✅
View all orders	❌	✅	✅
View all users	❌	❌	✅
Delete restaurant	❌	❌	✅
Project Structure
src/
├── auth/          # JWT auth, register, login
├── cart/          # Cart management
├── common/        # Guards, decorators, enums
├── orders/        # Order placement and tracking
├── payments/      # Payment methods
├── prisma/        # Prisma service
├── restaurants/   # Restaurants and menu items
├── users/         # User profile management
└── main.ts
prisma/
├── schema.prisma  # Database schema
└── migrations/    # Migration history
