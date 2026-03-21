import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
      },
    },
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
  },
  {
    tableName: "reviews",
    timestamps: true,
    underscored: true,
  },
);

export default Order;
