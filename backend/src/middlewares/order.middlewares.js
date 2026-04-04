const OrderMiddlewares = {
  ordersProducts: (req, res, next) => {
    const { orderData } = req.body || {};

    console.log("BODY RAW:", req.body);

    if (
      !orderData ||
      !Array.isArray(orderData) ||
      orderData.length === 0 ||
      !orderData[0]?.quantity ||
      !orderData[0]?.productId
    ) {
      return res.status(400).json({
        success: false,
        message: "orderData invalide",
      });
    }
    next();
  },
};

export default OrderMiddlewares;
