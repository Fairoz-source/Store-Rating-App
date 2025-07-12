module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Rating", {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });
};
