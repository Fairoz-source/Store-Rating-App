module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: 'ownerId' });
    Store.hasMany(models.Rating, { foreignKey: 'storeId' });
  };

  return Store;
};
