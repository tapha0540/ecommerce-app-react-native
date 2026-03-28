

const OrderMiddlewares = {
    ordersProducts: (req, res, next) => {
    const { orderData } = req.body;

    if (
      !orderItems ||
      orderItems.length === 0 ||
      !orderItems[0].quantity ||
      !orderItems[0].productId
    ) {
        return res.status(400).json({
            success: false,
            message: "Error: orders est null ou vide."
        });
    }
    next();
  }
};

export default OrderMiddlewares;