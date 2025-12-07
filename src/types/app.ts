// types/app.ts
export interface Notification {
  id: string | number;
  message: string;
  time: string;
  read: boolean;
}

export type VendorPage =
  | "dashboard"
  | "orders"
  | "products"
  | "special-orders"
  | "wallet"
  | "profile"
  | "support"
  | "settings";
