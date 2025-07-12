const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Store = require("./Store")(sequelize, Sequelize.DataTypes);
db.Rating = require("./Rating")(sequelize, Sequelize.DataTypes);

// ✅ Associations

// One Store has many Ratings
db.Store.hasMany(db.Rating, { foreignKey: "storeId" });
db.Rating.belongsTo(db.Store, { foreignKey: "storeId" });

// One User has many Ratings
db.User.hasMany(db.Rating, { foreignKey: "userId" });
db.Rating.belongsTo(db.User, { foreignKey: "userId" });

// One User can own one Store (for owner role)
db.User.hasOne(db.Store, { foreignKey: "ownerId" });
db.Store.belongsTo(db.User, { foreignKey: "ownerId" });

module.exports = db;
