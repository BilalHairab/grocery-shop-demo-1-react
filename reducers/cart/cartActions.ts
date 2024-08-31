import { CartAction, CartItem } from "./cartReducer.types";

export default {
    addItem: (item: CartItem): CartAction => {
        return {
            type: 'add',
            payload: {
                item
            }
        }
    },
    removeItem: (item: CartItem): CartAction => {
        return {
            type: 'remove',
            payload: {
                item
            }
        }
    },
    setViewingItem: (item: CartItem): CartAction => {
        return {
            type: 'viewItem',
            payload: {
                item
            }
        }
    },
}