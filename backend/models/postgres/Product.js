const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Product = sequelize.define("Product", {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notEmpty: { msg: "Product name is required" },
         len: { args: [2, 200], msg: "Product name must be between 2 and 200 characters" },
      },
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
         notEmpty: { msg: "Product description is required" },
      },
   },
   price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
         min: { args: 0, msg: "Price must be a positive number" },
      },
   },
   currency: {
      type: DataTypes.STRING,
      defaultValue: "USD",
      allowNull: false,
   },
   category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notEmpty: { msg: "Product category is required" },
      },
   },
   brand: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
   },
   stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
         min: { args: 0, msg: "Stock quantity cannot be negative" },
      },
   },
   lowStockThreshold: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
   },
   images: {
      type: DataTypes.JSONB,
      defaultValue: [],
   },
   specifications: {
      type: DataTypes.JSONB,
      defaultValue: {},
   },
   tags: {
      type: DataTypes.JSONB,
      defaultValue: [],
   },
   weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
   },
   dimensions: {
      type: DataTypes.JSONB,
      allowNull: true,
   },
   rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
         min: 0,
         max: 5,
      },
   },
   reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
   },
   isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
   },
   isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
   },
   discount: {
      type: DataTypes.JSONB,
      defaultValue: {
         type: null, // 'percentage' or 'fixed'
         value: 0,
         startDate: null,
         endDate: null,
      },
   },
   createdBy: {
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

module.exports = Product;
