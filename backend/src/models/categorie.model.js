import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Category = sequelize.define(
  "Category",
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
        len: [3, 100], // remplace max, min, isNull
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    iconUrl: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 75], // remplace max, min, isNull
      },
    },
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
  },
  {
    tableName: "categories",
    timestamps: true,
    underscored: true,
  },
);

export default Category;
