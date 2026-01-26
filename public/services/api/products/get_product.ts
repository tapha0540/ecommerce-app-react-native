import Product from "@/components/interfaces/api/product";
import ip from "@/services/ip";

interface ServerResponse {
  message: string;
  success: boolean;
  product?: Product | null;
}

const getProduct = async (productId: number): Promise<ServerResponse> => {
  try {
    const res = await fetch(
      `http://${ip}/controllers/products/get_product.php`,
      {
        method: "POST",
        body: JSON.stringify({ productId }),
      },
    );

    if (!res.ok) {
      throw new Error();
    }

    const data = (await res.json()) as ServerResponse;

    return data;
  } catch (err) {
    console.error(err);
    return {
      message: "Error: the sever is not responding !",
      success: false,
    } as ServerResponse;
  }
};

export default getProduct;
