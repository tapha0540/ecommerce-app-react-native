import ProductsCategorie from "@/components/interfaces/api/products_categorie";
import ip from "../../ip";

interface ServerResponse {
  message: string;
  success: boolean;
  productsCategories?: ProductsCategorie[];
}

const getAllProductsCategories = async (): Promise<ServerResponse> => {
  try {
    const res = await fetch(
      `http://${ip}/controllers/products_categories/get_all_products_categories.php`,
    );

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  } catch {
    return {
      message: "Problème de connexion.",
      success: false,
    };
  }
};

export default getAllProductsCategories;
