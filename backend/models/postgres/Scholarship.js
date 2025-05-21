const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./User");

const Scholarship = sequelize.define("Scholarship", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "USD",
  },
  sportType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eligibilityCriteria: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  applicationDeadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  applicationProcess: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  applicationLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  additionalDocuments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  status: {
    type: DataTypes.ENUM("active", "expired", "closed"),
    defaultValue: "active",
  },
  creatorId: {
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

// Define associations
Scholarship.belongsTo(User, { as: "creator", foreignKey: "creatorId" });

module.exports = Scholarship;
