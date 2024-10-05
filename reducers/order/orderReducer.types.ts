import { CartItemCounter } from "../cart/cartReducer.types";


export type OrderCartState = {
    activeOrder?: OrderItem,
    orders: OrderItem[],
}

export const PaymentMethods = [{
    key: 'cod',
    label: "Cash On Delivery",
    fees: 5
}, {
    key: 'credit_debit',
    label: "Credit/Debit Card",
    fees: 0
}] as const;


export type PaymentOption = typeof PaymentMethods[number];

export const DeliveryMethods = [{ key: 'no', label: "Pickup from Store", subLabel: '1 Hour', fees: 0 },
{ key: 'normal', label: "Normal Delivery", subLabel: 'Tomorrow', fees: 5 },
{ key: 'express', label: "Instant Delivery", subLabel: '90 Minutes', fees: 10 }] as const;


export type DeliveryOption = typeof DeliveryMethods[number];

export enum OrderState {
    INITIALIZED = 0,
    CONFIGURED,
    PAID,
    IN_DELIVERY,
    DELIVERED,
    FINISHED,
}

export type OrderItem = {
    state: OrderState;
    cart: CartItemCounter[];
    date: number;
    payment?: PaymentOption;
    delivery?: DeliveryOption;
};

export type OrderAction = OrderInitAction | OrderSetPaymentAction | OrderSetDeliveryAction | OrderSetStateAction | OrderFinishAction


export type OrderInitAction = {
    type: "init",
    payload: {
        cartItems: CartItemCounter[],
    }
}

export type OrderSetPaymentAction = {
    type: "setPayment",
    payload: {
        payment?: PaymentOption;
    }
}
export type OrderSetDeliveryAction = {
    type: "setDelivery",
    payload: {
        delivery: DeliveryOption;
    }
}

export type OrderSetStateAction = {
    type: "setState",
    payload: {
        state: OrderState;
    }
}

export type OrderFinishAction = {
    type: "finishOrder",
    payload: {
    }
}