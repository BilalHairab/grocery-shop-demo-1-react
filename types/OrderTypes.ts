import { CartItemCounter } from "@/reducers/cart/cartReducer.types"

export type Order = {
    items: CartItemCounter[];
    delivery: DeliveryType;
}

export type DeliveryType = {
    key: "no" | "normal" | "express",
    label: string;
    fees: number;
}
