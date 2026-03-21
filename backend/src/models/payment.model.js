import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import PaymentMethod from "../constants/paymentMethod.js";
import PaymentStatus from "../constants/paymentStatus.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM(
        PaymentMethod.Wave,
        PaymentMethod.OrangeMoney,
        PaymentMethod.Kpay,
        PaymentMethod.Cash,
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        PaymentStatus.Pending,
        PaymentStatus.Completed,
        PaymentStatus.Failed,
      ),
      defaultValue: PaymentStatus.Pending,
    },
    createdAt: DataTypes.STRING,
  },
  {
    tableName: "payments",
    underscored: true,
  },
);

export default Payment;
