import { CartActionAdd, CartActionClear, CartActionRemove, CartActionViewItem, CartItem } from "./cartReducer.types";

export default {
    addItem: (item: CartItem): CartActionAdd => {
        return {
            type: 'add',
            payload: {
                item
            }
        }
    },
    removeItem: (item: CartItem): CartActionRemove => {
        return {
            type: 'remove',
            payload: {
                item
            }
        }
    },
    setViewingItem: (item: CartItem): CartActionViewItem => {
        return {
            type: 'viewItem',
            payload: {
                item
            }
        }
    },
    clearCart: (): CartActionClear => {
        return {
            type: 'clear',
            payload: {
            }
        }
    },
}