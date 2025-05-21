const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./User");

const Reward = sequelize.define("Reward", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("discount", "freebie", "points", "badge", "achievement"),
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pointsRequired: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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

// User-Reward junction table for tracking user rewards
const UserReward = sequelize.define("UserReward", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
  rewardId: {
    type: DataTypes.UUID,
    references: {
      model: "Rewards",
      key: "id",
    },
    allowNull: false,
  },
  redeemedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isRedeemed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Define associations
User.belongsToMany(Reward, { through: UserReward });
Reward.belongsToMany(User, { through: UserReward });

module.exports = Reward;
module.exports.UserReward = UserReward;
