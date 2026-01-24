import Product from "@/components/interfaces/api/product";
import ip from "@/services/ip";

interface ServerResponse {
  message: string;
  success: boolean;
  product?: Product | null;
}

const getProduct = async (): Promise<ServerResponse> => {
  try {
    const res = await fetch(
      `http://${ip}/controllers/products/get_product.php`,
    );

    if (!res.ok) {
      throw new Error();
    }

    const data = (await res.json()) as ServerResponse;

    return data;
  } catch (err) {
    console.error(err);
    return {
      message: "",
      success: false,
    } as ServerResponse;
  }
};

export default getProduct;
