const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const auth = require("../middleware/authMiddleware");
const restrictTo = require("../middleware/roleMiddleware");

// Public - All users
router.get("/", auth, storeController.getAllStores);
router.get("/search", auth, storeController.searchStores);

// Admin - Add stores
router.post("/add", auth, restrictTo("admin"), storeController.addStore);

// Store Owner
router.get("/:storeId/ratings", auth, restrictTo("owner"), storeController.getStoreRatings);
router.get("/:storeId/average", auth, restrictTo("owner"), storeController.getAverageRating);

module.exports = router;
