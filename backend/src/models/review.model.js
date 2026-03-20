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
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
      },
    },
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING,
  },
  {
    tableName: "reviews",
    timestamps: true,
    underscored: true,
  },
);

export default Order;
