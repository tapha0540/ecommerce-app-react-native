import Logger from "../config/logger.js";
import sequelize from "../config/sequelize.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";

const OrderController = {
  orderProducts: async (req, res) => {
    const user = req.user;
    const { orderData } = req.body;

    // begin tranction
    const transaction = await sequelize.transaction();

    try {
      // get products by ids
      const products = await Product.findAll({
        where: { id: orderData.map((i) => i.productId) },
        transaction,
      });

      // creer un hashmap product.id => product
      const productsMap = new Map();

      products.forEach((p) => productsMap.set(p.id, p));

      let total = 0;
      const orderItemsData = [];
      for (const item of orderData) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
          throw new Error("Quantite or productId est null or invalide.");
        }

        const product = productsMap.get(item.productId);
        if (!product) {
          throw new Error(`Produit ${item.productId} introuvable`);
        }

        orderItemsData.push({
          productId: product.id,
          price: product.price,
          quantity: item.quantity,
        });

        total += product.price * item.quantity;
      }

      const newOrder = await Order.create(
        {
          userId: user.id,
          total,
        },
        { transaction },
      );

      const orderItemsWithOrderId = orderItemsData.map((item) => ({
        ...item,
        orderId: newOrder.id,
      }));

      await OrderItem.bulkCreate(orderItemsWithOrderId, { transaction });

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Commande créée avec succès",
        orderId: newOrder.id,
      });
    } catch (err) {
      // n'enregistrer les changements parce qu'il y'a eu probablement un erreur.
      await transaction.rollback();

      Logger.log(err);

      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
      });
    }
  },
  getOrdersByUserId: async (req, res) => {
    const user = req.user;

    const orders = await Order.findAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });

    if (!orders) {
      return res.status(500).json({
        success: false,
        message: "Auncune Categories de produits trouvé.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Opération réussie: Categories de produit trouvées.",
      orders,
    });
  },
};

export default OrderController;
