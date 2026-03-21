import Product from "@/components/interfaces/api/product";
import ip from "../../ip";

interface ServerResponse {
  message: string;
  success: boolean;
  products: Product[];
}

const searchProductsByCategoryId = async (
  search: string,
  categoryId: number,
): Promise<Product[] | null> => {
  try {
    const res = await fetch(`http://${ip}/products?category_id=${categoryId}&search=${search}`);

    if (!res.ok) {
      throw new Error();
    }

    const data: ServerResponse = (await res.json()) as ServerResponse;

    return data.products as Product[];
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default searchProductsByCategoryId;
