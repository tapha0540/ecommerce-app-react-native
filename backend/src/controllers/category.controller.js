import Category from "../models/categorie.model.js";

const CategoryController = {
  getAllCategories: async (req, res) => {
    const categories = await Category.findAll();

    if (!categories) {
      return res.status(500).json({
        success: false,
        message: "Auncune Categories de produits trouvé:",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Opération réussie: Categories de produit trouvées.",
      categories,
    });
  },
  getCategory: async (req, res) => {
    const id = req.params.id;

    const category = await Category.findOne({ where: { id } });

    if (!category) {
      return res.status(401).json({
        success: false,
        message: "Category id introuvable.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Opération réussie: Category trouvée",
      category
    });
  },
};

export default CategoryController;
