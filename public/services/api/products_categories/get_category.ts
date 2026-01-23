import ProductsCategory from "@/components/interfaces/api/products_categorie";
import ip from "@/services/ip";

interface ServerResponse {
  message: string;
  success: boolean;
  category?: ProductsCategory;
}

const getProductCategory = async (
  categoryId: number,
): Promise<ServerResponse> => {
  try {
    const res = await fetch(
      `http://${ip}/controllers/products_categories/get_product_category.php`,
      {
        method: "POST",
        body: JSON.stringify({ categoryId }),
      },
    );

    if (!res.ok) {
      throw new Error();
    }

    return (await res.json()) as ServerResponse;
  } catch (err) {
    console.error(err);

    return {
      message: "Problème de connexion.",
      success: false,
    };
  }
};

export default getProductCategory;
