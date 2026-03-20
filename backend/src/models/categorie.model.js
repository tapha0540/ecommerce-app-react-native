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
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    icon_url: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 75], // remplace max, min, isNull
      },
    },
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING,
  },
  {
    tableName: "categories",
    timestamps: true,
    underscored: true,
  },
);

export default Category;
