# SmartERP

A modern, cloud-based Enterprise Resource Planning (ERP) system developed to streamline business operations such as inventory management, customer and supplier management, purchase and sales tracking, dashboard analytics, and report generation.

This project was developed using the **PERN-inspired stack**:
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Deployment:** Vercel (Frontend), Railway (Backend)

---

## 🌐 Live Demo

### Frontend
https://serpy-eight.vercel.app

### Backend API
https://smarterp-production-93e5.up.railway.app

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using bcrypt

---

## Multi-Company Management

- Create up to 5 companies
- Select active company
- Company-specific data isolation

---

## Customer Management

- Add Customers
- Edit Customers
- Delete Customers
- Prevent deletion if linked to Sales

---

## Supplier Management

- Add Suppliers
- Edit Suppliers
- Delete Suppliers
- Prevent deletion if linked to Purchases

---

## Inventory Management

- Manage Stock Items
- Track Current Quantity
- View Inventory Value
- Low Stock Detection

---

## Purchase Management

- Create Purchase Vouchers
- Automatic Voucher Number Generation
- Increase Stock Quantity
- Purchase History

---

## Sales Management

- Create Sales Vouchers
- Automatic Voucher Number Generation
- Prevent Sales Beyond Available Stock
- Automatic Stock Reduction
- Sales History

---

## Dashboard

- Customer Count
- Supplier Count
- Stock Item Count
- Purchase Count
- Sales Count
- Purchase Total
- Sales Total
- Inventory Value
- Low Stock Summary

---

## Reports

- Purchase Report
- Sales Report
- Inventory Report

---

## User Interface

- Responsive Dashboard
- Professional Layout
- Sidebar Navigation
- Dashboard Analytics
- Styled Forms
- Styled Tables
- Empty State Handling

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- Prisma ORM
- JWT
- bcrypt

## Database

- PostgreSQL

## Deployment

- Vercel
- Railway

---

# Project Structure

```
SmartERP
│
├── client
│   ├── app
│   ├── components
│   ├── services
│   ├── utils
│   └── ...
│
└── server
    ├── src
    │   ├── controllers
    │   ├── routes
    │   ├── services
    │   ├── middleware
    │   ├── config
    │   └── ...
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/mdkaif2k3/SmartERP.git
cd SmartERP
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run Prisma:

```bash
npx prisma migrate deploy
```

Start Backend:

```bash
npm start
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start Frontend:

```bash
npm run dev
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# API Modules

- Authentication
- Company
- Customer
- Supplier
- Stock
- Purchase
- Sales
- Dashboard
- Reports

---

# Future Improvements

- Invoice Generation (PDF)
- Sales & Purchase Returns
- Expense Management
- GST Reports
- Role-Based Access Control
- Data Export (Excel/PDF)
- Email Notifications

---

# Author

**Mohammed Kaif**

GitHub: https://github.com/mdkaif2k3

---

# License

This project was developed for educational and internship purposes.