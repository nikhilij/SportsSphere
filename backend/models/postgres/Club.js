const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Club = sequelize.define("Club", {
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
         len: [3, 100],
      },
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   sportTypes: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
   },
   logo: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   images: {
      type: DataTypes.JSONB,
      defaultValue: [],
   },
   address: {
      type: DataTypes.JSONB,
      allowNull: false,
   },
   contactInfo: {
      type: DataTypes.JSONB,
      allowNull: false,
   },
   website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
         isUrl: true,
      },
   },
   socialMedia: {
      type: DataTypes.JSONB,
      defaultValue: {},
   },
   establishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
         min: 1800,
         max: new Date().getFullYear(),
      },
   },
   membershipTypes: {
      type: DataTypes.JSONB,
      defaultValue: [],
   },
   facilities: {
      type: DataTypes.JSONB,
      defaultValue: [],
   },
   achievements: {
      type: DataTypes.JSONB,
      defaultValue: [],
   },
   coachingStaff: {
      type: DataTypes.JSONB,
      defaultValue: [],
   },
   memberCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
   },
   status: {
      type: DataTypes.ENUM("pending", "verified", "suspended", "inactive"),
      defaultValue: "pending",
      allowNull: false,
   },
   verificationDate: {
      type: DataTypes.DATE,
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
   isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
   },
   isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
   },
   subscription: {
      type: DataTypes.JSONB,
      defaultValue: {
         plan: "basic",
         expiresAt: null,
         features: [],
      },
   },
});

module.exports = Club;
