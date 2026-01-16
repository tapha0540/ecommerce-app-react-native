export default interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
}
