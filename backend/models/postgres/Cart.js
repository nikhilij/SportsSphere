const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
   },
   userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
         model: "Users",
         key: "id",
      },
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

const CartItem = sequelize.define("CartItem", {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
   },
   cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
         model: "Carts",
         key: "id",
      },
   },
   productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
         model: "Products",
         key: "id",
      },
   },
   quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
         min: { args: 1, msg: "Quantity must be at least 1" },
      },
   },
   addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
   },
});

// Define associations
Cart.belongsTo(User, { foreignKey: "userId" });
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

module.exports = { Cart, CartItem };
