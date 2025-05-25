const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Category = sequelize.define("Category", {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
         notEmpty: { msg: "Category name is required" },
         len: { args: [2, 100], msg: "Category name must be between 2 and 100 characters" },
      },
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
   slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   image: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
         model: "Categories",
         key: "id",
      },
   },
   isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
   },
   sortOrder: {
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

// Self-referencing association for parent-child categories
Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId" });
Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

module.exports = Category;
