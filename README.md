# 🏪 Store Rating App – Full Stack Web Application

This is a full-stack web application that allows users to register, log in, and rate various stores. Built using:

- **Backend:** Node.js, Express.js, Sequelize, MySQL
- **Frontend:** React.js, Axios, React Router
- **Authentication:** JWT

---

## 🧠 Features

- ✅ User Signup/Login (JWT-based auth)
- ✅ Admin & User roles
- ✅ Submit Ratings (1 to 5)
- ✅ View All Stores with Average Ratings
- ✅ Secure APIs with middleware
- ✅ MySQL DB with Sequelize ORM
- ✅ Fully responsive React UI

---

## 📁 Project Folder Structure

Store-Rating-app/
├── backend/
│ ├── config/ # DB config
│ │ └── db.js
│ ├── controllers/ # All controller logic
│ │ ├── authController.js
│ │ ├── storeController.js
│ │ └── ratingController.js
│ ├── middleware/ # Auth middleware
│ │ └── authMiddleware.js
│ ├── models/ # Sequelize models
│ │ ├── index.js
│ │ ├── User.js
│ │ ├── Store.js
│ │ └── Rating.js
│ ├── routes/ # Express routes
│ │ ├── authRoutes.js
│ │ ├── storeRoutes.js
│ │ ├── ratingRoutes.js
│ │ └── dashboardRoutes.js
│ ├── server.js # Entry point
│ └── .env # Environment variables
│
├── frontend/
│ ├── public/
│ └── src/
│ ├── pages/
│ │ ├── Login.js
│ │ ├── Signup.js
│ │ ├── Dashboard.js
│ │ └── Home.js
│ ├── components/
│ │ ├── Navbar.js
│ │ └── StoreCard.js
│ ├── App.js
│ └── index.js
│
├── .gitignore
└── README.md

yaml
Copy
Edit

---

## 🌐 Prerequisites

- Node.js (v16+)
- npm (Node package manager)
- MySQL Server installed & running
- Git

---

## ⚙️ Backend Setup (`/backend`)

### 1. Navigate to backend folder:
```bash
cd backend
2. Install dependencies:
bash
Copy
Edit
npm install
3. Create MySQL Database:
Open MySQL and run:

sql
Copy
Edit
CREATE DATABASE store_rating_db;
Or use GUI like phpMyAdmin, MySQL Workbench, or HeidiSQL.

4. Create .env file:
ini
Copy
Edit
DB_NAME=store_rating_db
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_DIALECT=mysql
PORT=5000
JWT_SECRET=your_jwt_secret
Replace values with your actual MySQL credentials.

5. Run the server:
bash
Copy
Edit
node server.js
If you see:

arduino
Copy
Edit
✅ Server running on port 5000
✅ DB Synced Successfully
Then your backend is working.

💻 Frontend Setup (/frontend)
1. Navigate to frontend:
bash
Copy
Edit
cd frontend
2. Install dependencies:
bash
Copy
Edit
npm install
3. Start the React app:
bash
Copy
Edit
npm start
Frontend runs on: http://localhost:3000

🔐 Authentication Flow
User registers via /api/auth/register

User logs in via /api/auth/login and receives JWT token

JWT token is stored in localStorage on frontend

Protected routes check for valid token in headers

🚧 Common Errors and Fixes
🔴 Error: Access denied for user 'root'@'localhost'
✅ Fix: Check .env DB credentials. Login using terminal:

bash
Copy
Edit
mysql -u root -p
🔴 Error: Unknown column 'Store.ownerId'
✅ Fix: Run force sync (⚠️ deletes data):

js
Copy
Edit
db.sequelize.sync({ force: true });
Or manually alter table in MySQL to add missing fields.

🔴 Error: User.findOne is not a function
✅ Fix: Ensure you're importing User like this:

js
Copy
Edit
const db = require("../models");
const User = db.User;
🧪 API Endpoints
Route	Method	Description	Auth
/api/auth/register	POST	Register new user	❌
/api/auth/login	POST	Login existing user	❌
/api/stores/	POST	Create store	✅
/api/ratings/	POST	Submit rating	✅
/api/dashboard/	GET	View store + ratings	✅

🚀 Push to GitHub (Backend + Frontend)
Step 1: Initialize Git
bash
Copy
Edit
git init
Step 2: Create .gitignore in root
plaintext
Copy
Edit
node_modules/
.env
Step 3: Add & Commit
bash
Copy
Edit
git add .
git commit -m "Initial commit - Store Rating App"
Step 4: Create repo on GitHub, then:
bash
Copy
Edit
git remote add origin https://github.com/your-username/store-rating-app.git
git push -u origin main
🔮 Future Enhancements
⭐ Star-based UI rating widget

📊 Charts on admin dashboard

🖼️ Store image uploads

📱 Mobile responsiveness

🌍 Deployment on Vercel (frontend) & Render (backend)

👤 Author
Shaik Fairoz
Full Stack Developer
