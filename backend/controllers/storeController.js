const Store = require("../models/Store");
const Rating = require("../models/Rating");
const User = require("../models/User");

exports.addStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address });
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const stores = await Store.findAll({
      where: {
        ...(name && { name }),
        ...(address && { address }),
      },
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const ratings = await Rating.findAll({ where: { storeId } });

    const average =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    res.json({ storeId, averageRating: average.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const ratings = await Rating.findAll({
      where: { storeId },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
