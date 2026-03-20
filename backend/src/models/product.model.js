import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 150], // remplace max, min, isNull
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    category_id: DataTypes.INTEGER,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255], // remplace max, min, isNull
      },
    },
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING,
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
  },
);

export default Product;
