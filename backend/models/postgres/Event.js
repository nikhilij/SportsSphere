const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Event = sequelize.define(
   "Event",
   {
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
         allowNull: false,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [3, 200],
         },
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      sportType: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      eventType: {
         type: DataTypes.ENUM("tournament", "match", "training", "workshop", "other"),
         defaultValue: "tournament",
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM("draft", "published", "ongoing", "completed", "cancelled"),
         defaultValue: "draft",
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
      registrationStartDate: {
         type: DataTypes.DATE,
         allowNull: true,
      },
      registrationEndDate: {
         type: DataTypes.DATE,
         allowNull: true,
      },
      venue: {
         type: DataTypes.JSONB,
         allowNull: false,
      },
      maxParticipants: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      registrationFee: {
         type: DataTypes.FLOAT,
         defaultValue: 0,
      },
      prizes: {
         type: DataTypes.JSONB,
         defaultValue: [],
      },
      rules: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      requirements: {
         type: DataTypes.JSONB,
         defaultValue: [],
      },
      images: {
         type: DataTypes.JSONB,
         defaultValue: [],
      },
      organizer: {
         type: DataTypes.JSONB,
         allowNull: false,
      },
      contactInfo: {
         type: DataTypes.JSONB,
         allowNull: false,
      },
      tags: {
         type: DataTypes.JSONB,
         defaultValue: [],
      },
      isPublic: {
         type: DataTypes.BOOLEAN,
         defaultValue: true,
      },
      isFeatured: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
      viewCount: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
      },
      registrationCount: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
      },
   },
   {
      validate: {
         endDateAfterStartDate() {
            if (this.endDate <= this.startDate) {
               throw new Error("End date must be after start date");
            }
         },
         registrationDatesValid() {
            if (this.registrationEndDate && this.registrationStartDate) {
               if (this.registrationEndDate <= this.registrationStartDate) {
                  throw new Error("Registration end date must be after start date");
               }
            }
         },
      },
   }
);

module.exports = Event;
