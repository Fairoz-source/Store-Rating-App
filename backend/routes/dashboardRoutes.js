const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const db = require('../models');

router.get('/', auth, async (req, res) => {
  const { role, id } = req.user;

  try {
    if (role === 'admin') {
      const userCount = await db.User.count();
      const storeCount = await db.Store.count();
      const ratingCount = await db.Rating.count();
      return res.json({ userCount, storeCount, ratingCount });
    }

    if (role === 'owner') {
      const store = await db.Store.findOne({ where: { userId: id } });
      const ratings = await db.Rating.findAll({ where: { storeId: store.id } });
      const avg = ratings.reduce((sum, r) => sum + r.value, 0) / (ratings.length || 1);
      return res.json({
        storeName: store.name,
        avgRating: avg.toFixed(1),
        totalRatings: ratings.length
      });
    }

    if (role === 'user') {
      const stores = await db.Store.findAll({ include: [db.Rating] });
      const formatted = stores.map(store => {
        const ratings = store.Ratings || [];
        const avg = ratings.reduce((s, r) => s + r.value, 0) / (ratings.length || 1);
        const userRating = ratings.find(r => r.userId === id)?.value || 0;

        return {
          id: store.id,
          name: store.name,
          address: store.address,
          averageRating: avg.toFixed(1),
          userRating
        };
      });
      return res.json({ stores: formatted });
    }
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
});

module.exports = router;
