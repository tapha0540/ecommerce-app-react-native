import { Sequelize } from "sequelize";
import Product from "../models/product.model.js";

const ProductController = {
  getProduct: async (req, res) => {
    const id = req.params.id;

    const product = await Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(401).json({
        success: false,
        message: "Error products.id introuvable.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Opération réussie: Product trouvé.",
      product,
    });
  },
  getProducts: async (req, res) => {
    const { category_id, search } = req.query;

    const where = {};
    if (category_id && category_id != -1) where.categoryId = category_id;
    if (search) where.name = { [Sequelize.Op.like]: `%${search}%` };

    const products = await Product.findAll({ where });

    if (!products) {
      return res.status(401).json({
        success: false,
        message: "Pas produit avec un tel nom.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Opération réussie: Products trouvés.",
      products,
    });
  },
};

export default ProductController;
