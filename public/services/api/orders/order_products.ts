import ip from "@/services/ip";
import getSessionToken from "@/services/session/get_session_token";

interface ServerResponse {
  message: string;
  success: boolean;
}
interface Item {
  productId: number;
  quantity: number;
}

const OrderProducts = async (orderData: Item[]) => {
  const token = await getSessionToken();

  try {
    const res = await fetch(`http://${ip}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderData,
      }),
    });
    const data = (await res.json()) as ServerResponse;
    console.log("Order: ");
    console.log(data);
    console.log("token: ");
    console.log(token);

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
