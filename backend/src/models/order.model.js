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
    user_id: DataTypes.INTEGER,
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
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING,
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
  },
);

export default Order;
