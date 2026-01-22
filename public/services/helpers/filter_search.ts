import Product from "@/components/interfaces/api/product";

export const filterProductsByCategorieId = (
  products: Product[] | null,
  categoryId: number,
) => {
  if (categoryId === -1) {
    return products;
  }
  return products?.filter((each) => each.categoryId === categoryId);
};
