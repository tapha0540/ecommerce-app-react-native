export default interface Payments {
  id: string;
  orderId: number;
  amount: number;
  method: "wave" | "orange money" | "kpay" | "cash";
  status: "pending" | "completed" | "failed";
  createdAt: string;
}
