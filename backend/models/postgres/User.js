const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sequelize } = require("../../config/database");

const User = sequelize.define(
   "User",
   {
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: { msg: "Name is required" },
            len: { args: [2, 100], msg: "Name must be between 2 and 100 characters" },
         },
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            isEmail: { msg: "Please provide a valid email" },
            notEmpty: { msg: "Email is required" },
         },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: { args: [6, 100], msg: "Password must be at least 6 characters" },
         },
      },
      role: {
         type: DataTypes.ENUM("user", "club_admin", "event_organizer", "government", "admin"),
         defaultValue: "user",
      },
      phone: {
         type: DataTypes.STRING,
         validate: {
            isNumeric: { msg: "Phone number must contain only numbers" },
         },
      },
      dateOfBirth: {
         type: DataTypes.DATEONLY,
      },
      address: {
         type: DataTypes.TEXT,
      },
      sportsPreferences: {
         type: DataTypes.JSON,
         defaultValue: [],
      },
      isActive: {
         type: DataTypes.BOOLEAN,
         defaultValue: true,
      },
      isVerified: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
      lastLogin: {
         type: DataTypes.DATE,
      },
      loginAttempts: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
      },
      lockUntil: {
         type: DataTypes.DATE,
      },
      passwordResetToken: {
         type: DataTypes.STRING,
      },
      passwordResetExpires: {
         type: DataTypes.DATE,
      },
      emailVerificationToken: {
         type: DataTypes.STRING,
      },
      emailVerificationExpires: {
         type: DataTypes.DATE,
      },
      passwordChangedAt: {
         type: DataTypes.DATE,
      },
   },
   {
      hooks: {
         beforeCreate: async (user) => {
            if (user.password) {
               user.password = await bcrypt.hash(user.password, 12);
            }
         },
         beforeUpdate: async (user) => {
            if (user.changed("password")) {
               user.password = await bcrypt.hash(user.password, 12);
               user.passwordChangedAt = new Date();
            }
         },
      },
      defaultScope: {
         attributes: { exclude: ["password", "passwordResetToken", "emailVerificationToken"] },
      },
      scopes: {
         withPassword: {
            attributes: { include: ["password"] },
         },
      },
   }
);

// Instance methods
User.prototype.correctPassword = async function (candidatePassword, userPassword) {
   return await bcrypt.compare(candidatePassword, userPassword);
};

User.prototype.changedPasswordAfter = function (JWTTimestamp) {
   if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
      return JWTTimestamp < changedTimestamp;
   }
   return false;
};

User.prototype.createPasswordResetToken = function () {
   const resetToken = crypto.randomBytes(32).toString("hex");
   this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
   return resetToken;
};

User.prototype.createEmailVerificationToken = function () {
   const verificationToken = crypto.randomBytes(32).toString("hex");
   this.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
   this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
   return verificationToken;
};

module.exports = User;
