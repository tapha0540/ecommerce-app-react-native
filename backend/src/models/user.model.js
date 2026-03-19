import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const UserRole = {
  Customer: "customer",
  Admin: "admin",
};

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50], // remplace max, min, isNull
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50], // remplace max, min, isNull
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 100], // remplace max, min, isNull
      },
    },
    password: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [7, 20],
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

export default User;
