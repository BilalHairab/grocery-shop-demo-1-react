import { CartItemCounter } from "../cart/cartReducer.types"
import { DeliveryOption, OrderInitAction, OrderSetDeliveryAction, OrderSetPaymentAction, OrderSetStateAction, OrderState, PaymentOption } from "./orderReducer.types"

export default {
    initActiveOrder: (items: CartItemCounter[]): OrderInitAction => {
        return {
            type: 'init',
            payload: {
                cartItems: items
            }
        }
    },
    setOrderPayment: (payment?: PaymentOption): OrderSetPaymentAction => {
        return {
            type: 'setPayment',
            payload: {
                payment
            }
        }
    },
    setOrderDelivery: (delivery: DeliveryOption): OrderSetDeliveryAction => {
        return {
            type: 'setDelivery',
            payload: {
                delivery
            }
        }
    },
    updateActiveOrderState: (state: OrderState): OrderSetStateAction => {
        return {
            type: 'setState',
            payload: {
                state
            }
        }
    },
}