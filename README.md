# Zentro - Frontend

The frontend application for **Zentro**, a SaaS-based e-commerce and inventory management platform 

Zentro provides a multi-vendor marketplace where customers can browse products and place orders, vendors can manage their stores and inventory, and administrators can manage the overall platform.

##  Features

### Customer

- Browse products without authentication
- Search and filter products
- View product details
- Shopping cart
- Multi-vendor checkout
- Cash on Delivery checkout
- Order confirmation
- Responsive user interface

### Vendor

- Vendor registration
- Vendor approval workflow
- Vendor dashboard
- Product management
- Product image uploads
- Inventory management
- Stock and minimum-stock tracking
- Order management
- Approve or reject orders
- Sales and order statistics
- Vendor notifications

### Admin

- Admin dashboard
- Vendor management
- Pending vendor approvals
- Approve or reject vendors
- Vendor store management
- Admin profile management
- Dashboard statistics
- Vendor approval notifications

### Authentication

- Login and registration
- Role-based navigation
- Protected routes
- JWT authentication using HTTP-only cookies
- Customer, vendor, and admin access control

##  Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- React Toastify
- Lucide React
- JavaScript

## 📁 Project Structure

```text
zentro-frontend/
│
├── public/
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── index.html
```

##  Backend

The frontend communicates with the Zentro backend API.

**Backend Repository:**  
https://github.com/mahmad120133548-blip/zentro-backend

##  Deployment

The Zentro frontend is deployed separately from the backend and communicates with the production backend API.

##  Local Development

Clone the repository:

```bash
git clone https://github.com/mahmad120133548-blip/zentro-frontend.git
```

Navigate to the project:

```bash
cd zentro-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available through the local Vite development server.

##  Environment Variables

The frontend uses environment variables for configuration such as the backend API URL.

Create a `.env` file when required and configure the appropriate values.

**Do not commit environment files containing sensitive information.**

##  Author

**Muhammad Ahmad**

Bachelor's in Business and Information Technology  
University of the Punjab

Developed as a full-stack web development internship final project.
