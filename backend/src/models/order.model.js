import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import OrderStatus from "../constants/orderStatus.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM(
        OrderStatus.Pending,
        OrderStatus.Processing,
        OrderStatus.Shipped,
        OrderStatus.Delivered,
        OrderStatus.Cancelled,
      ),
      allowNull: false,
      defaultValue: OrderStatus.Pending,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
  },
);

export default Order;
