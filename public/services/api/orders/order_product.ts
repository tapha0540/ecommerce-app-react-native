import ip from "@/services/ip";

interface ServerResponse {
  message: string;
  success: boolean;
}

const OrderProduct = async (productId: number) => {
  try {
    const res = await fetch(
      `http://${ip}/controllers/orders/order_product.php`,
      {
        method: "POST",
        body: JSON.stringify({ productId }),
      },
    );
    const data = (await res.json()) as ServerResponse;

    return data;
  } catch (err) {
    console.error(err);

    return {
      message: "Erreur vérifier votre connexion !",
      success: false,
    } as ServerResponse;
  }
};

export default OrderProduct;
