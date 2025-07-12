const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const auth = require("../middleware/authMiddleware");
const restrictTo = require("../middleware/roleMiddleware");

// User - Submit or modify rating
router.post("/", auth, restrictTo("user"), ratingController.submitRating);

router.post("/", auth, async (req, res) => {
  const { storeId, value } = req.body;

  if (!value || value < 1 || value > 5) {
    return res.status(400).json({ message: "Invalid rating value" });
  }

  try {
    // Check if user already rated this store
    const existing = await db.Rating.findOne({ where: { userId: req.user.id, storeId } });
    if (existing) {
      existing.value = value;
      await existing.save();
      return res.json({ message: "Rating updated" });
    }

    // Else, create new rating
    await db.Rating.create({ userId: req.user.id, storeId, value });
    res.json({ message: "Rating submitted" });
  } catch (err) {
    console.error("Rating error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
