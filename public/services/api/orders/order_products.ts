import ip from "@/services/ip";

interface ServerResponse {
  message: string;
  success: boolean;
}
interface Order {
  productId: number;
  quantity: number;
}

const OrderProducts = async (orders: Order[]) => {
  try {
    const res = await fetch(
      `http://${ip}/controllers/orders/order_products.php`,
      {
        method: "POST",
        body: JSON.stringify({ orders }),
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

export default OrderProducts;
