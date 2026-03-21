import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import UserRole from "../constants/userRoles.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50], // remplace max, min, isNull
      },
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50], // remplace max, min, isNull
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 100], // remplace max, min, isNull
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [4, 255], // remplace max, min, isNull
      },
    },
    role: {
      type: DataTypes.ENUM(UserRole.Admin, UserRole.Customer),
      allowNull: false,
      defaultValue: UserRole.Customer,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: [7, 20],
      },
    },
    profileUrl: {
      type: DataTypes.STRING(75),
      allowNull: true,
    },
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

export default User;
