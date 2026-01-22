import Product from "@/components/interfaces/api/product";
import ip from "../../ip";

interface ServerResponse {
  message: string;
  success: boolean;
  products: Product[];
}

const getSomeProductsForEachCategories = async (): Promise<
  Product[] | null
> => {
  try {
    const res = await fetch(
      `http://${ip}/controllers/products/get_some_products_for_each_category.php`,
    );

    if (!res.ok) {
      return null;
    }

    const data: ServerResponse = (await res.json()) as ServerResponse;

    return data.products as Product[];
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getSomeProductsForEachCategories;
