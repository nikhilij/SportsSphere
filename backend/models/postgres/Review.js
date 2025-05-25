const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const User = require("./User");
const Product = require("./Product");

const Review = sequelize.define("Review", {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
   },
   productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
         model: "Products",
         key: "id",
      },
   },
   userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
         model: "Users",
         key: "id",
      },
   },
   rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
         min: { args: 1, msg: "Rating must be between 1 and 5" },
         max: { args: 5, msg: "Rating must be between 1 and 5" },
      },
   },
   comment: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
   isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
   },
   helpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
   },
   createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
   },
   updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
   },
});

// Define associations
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

module.exports = Review;
