import { CartAction, CartItemCounter, CartState } from "./cartReducer.types";

const initialState: CartState = {
    items: {},
    viewingItem: undefined,
};

export default function reducer(state = initialState, action: CartAction): CartState {
    const items = state.items;

    switch (action.type) {
        case "add": {
            let record = items[action.payload.item.id] as CartItemCounter | undefined;

            if (record) {
                record.count += 1;
            } else {
                record = <CartItemCounter>{
                    count: 1,
                    item: action.payload.item,
                };
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.item.id]: record
                },
            }
        }
        case "remove": {
            let record = items[action.payload.item.id] as CartItemCounter | undefined;
            if (!record) {
                return state;
            }
            if (record.count === 1) {
                delete state.items[action.payload.item.id];
                return {
                    ...state,
                    items: {
                        ...state.items,
                    },
                }
            } else {
                record.count -= 1;
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.item.id]: record
                },
            }
        }
        case "clear":
            return {
                ...state,
                items: {},
            }
        case "viewItem":
            return {
                ...state,
                viewingItem: action.payload.item,
            }
        default: return state;
    }
}