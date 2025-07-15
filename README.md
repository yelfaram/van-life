# Travel Van Rental Application

A full-stack React application for browsing and renting camper vans. Users can explore van listings, view availability, filter by type, rent vans by selecting a date range, and leave reviews. Hosts can log in to view their dashboard with income stats, reviews, and van management tools.

> This project was built using a Figma UI reference for layout and design consistency.
> [Figma design reference](https://www.figma.com/design/igDA2NiMDhoaIIAqm5EnTq/-VanLife?node-id=0-1&p=f&t=ov9J0HOutGEJx9bz-0)

---

## Features

### General Users

- Browse all available vans
- View detailed descriptions, images, and pricing
- Filter vans by type (Simple, Luxury, Rugged)
- Select a start and end date for rental using a date picker
- Leave reviews on vans
- Prevent double-booking using real-time availability logic

### Hosts

- Login and access protected dashboard
- View income overview
- Manage vans (view their listings)
- See reviews left on their vans

---

## Tech Stack

### Frontend

- React (JSX) with Vite
- React Router 6
- React Context API (for Auth)
- `react-datepicker` for date picking
- `react-toastify` for toast messages
- `tippy.js` for tooltips

### Backend

- Node.js + Express
- PostgreSQL
- Cloudinary (for image uploads)
- Cookie-based sessions with express-session

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yelfaram/van-life
cd van-life
```

### 2. Set up PostgreSQL

Ensure you have a local PostgreSQL instance running.

Create a database:

```sql
CREATE DATABASE van_life;
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Set up a .env file in the backend/ folder:

```
PORT=3000
DB_HOST=localhost
DB_NAME=van_life
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=5432
SESSION_SECRET=random_string

# Cloudinary credentials (for image uploads)
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

Build and start the backend server:

```bash
npm run build
npm start
```

_Note: `SESSION_SECRET` can be any random string for local development, but should be securely generated in production._

### 4. Frontend Setup

In the client/ folder:

```bash
npm install
npm run dev
```

The frontend will run at http://localhost:5173 by default.

---

## Authentication

- Users log in via the login form (no OAuth).
- Auth state is stored using React Context.
- Protected routes redirect unauthorized users.
