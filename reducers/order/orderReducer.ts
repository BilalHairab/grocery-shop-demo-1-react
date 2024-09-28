import { OrderCartState, OrderAction, OrderState } from "./orderReducer.types";

const initialState: OrderCartState = {
    orders: [],
    activeOrder: undefined,
};

export default function reducer(state = initialState, action: OrderAction): OrderCartState {

    switch (action.type) {
        case "init": {
            return {
                ...state,
                activeOrder: {
                    state: OrderState.INITIALIZED,
                    cart: action.payload.cartItems
                }
            }
        }
        case "setPayment": {
            if(state.activeOrder === undefined) {
                return state
            }
            return {
                ...state,
                activeOrder: {
                    ...state.activeOrder,
                    payment: action.payload.payment
                }
            }
        }
        case "setDelivery": {
            if(state.activeOrder === undefined) {
                return state
            }
            return {
                ...state,
                activeOrder: {
                    ...state.activeOrder,
                    delivery: action.payload.delivery
                }
            }
        }
        case "setState": {
            if(state.activeOrder === undefined) {
                return state
            }
            return {
                ...state,
                activeOrder: {
                    ...state.activeOrder,
                    state: action.payload.state
                }
            }
        }
        default: return state;
    }
}