const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./User");
const Club = require("./Club");

const Event = sequelize.define("Event", {
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
    allowNull: true,
  },
  eventType: {
    type: DataTypes.ENUM("tournament", "match", "training", "meetup", "other"),
    allowNull: false,
  },
  sportType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  registrationDeadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  registrationFee: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("upcoming", "ongoing", "completed", "cancelled"),
    defaultValue: "upcoming",
  },
  organizerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  clubId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Clubs",
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
Event.belongsTo(User, { as: "organizer", foreignKey: "organizerId" });
Event.belongsTo(Club, { foreignKey: "clubId" });

module.exports = Event;
