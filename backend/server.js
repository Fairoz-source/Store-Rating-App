const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require('./models'); // Includes sequelize, models, associations

const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Sync DB and start server
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch((err) => {
  console.error('❌ DB Sync Error:', err);
});
