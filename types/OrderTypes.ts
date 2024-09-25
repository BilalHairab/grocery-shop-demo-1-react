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

export const deliveryOptions: DeliveryType[] = [
    {key: 'no', label: "Pickup from Store", fees: 0},
    {key: 'normal', label: "Normal (1 days, +5 AED)", fees: 5},
    {key: 'express', label: "Instant (+10 AED)", fees: 10},
]

