const Rating = require("../models/Rating");

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    const existing = await Rating.findOne({ where: { userId, storeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ message: "Rating updated", rating: existing });
    }

    const newRating = await Rating.create({ userId, storeId, rating });
    res.status(201).json({ message: "Rating submitted", rating: newRating });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
