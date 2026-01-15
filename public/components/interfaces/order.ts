export default interface Order {
  id: number;
  userId: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
  updatedAt: string;
}
