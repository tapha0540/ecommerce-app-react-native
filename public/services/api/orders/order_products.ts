import ip from "@/services/ip";

interface ServerResponse {
  message: string;
  success: boolean;
}
interface Item {
  productId: number;
  quantity: number;
}

const OrderProducts = async (orderData: Item[]) => {
  try {
    const res = await fetch(
      `http://${ip}/orders/`,
      {
        method: "POST",
        body: JSON.stringify({ orderData }),
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
