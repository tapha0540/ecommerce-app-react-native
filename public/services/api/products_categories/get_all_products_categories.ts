import ProductsCategory from "@/components/interfaces/api/products_categorie";
import ip from "../../ip";

interface ServerResponse {
  message: string;
  success: boolean;
  productsCategories?: ProductsCategory[];
}

const getAllProductsCategories = async (): Promise<ServerResponse> => {
  try {
    const res = await fetch(
      `http://${ip}/categories`,
    );

    if (!res.ok) {
      throw new Error();
    }

    return (await res.json()) as ServerResponse;
  } catch(err) {
    console.error(err);
    
    return {
      message: "Problème de connexion.",
      success: false,
    };
  }
};

export default getAllProductsCategories;
