import { CartAction, CartItemCounter, CartState } from "./cartReducer.types";

const initialState: CartState = {
    items: new Map<number, CartItemCounter>(),
};

export default function reducer(state = initialState, action: CartAction): CartState {
    console.log(`reducer ${JSON.stringify(action)}`)
    const items = state.items;
    const newItems = state.items;

    switch (action.type) {
        case "add": {
            const record = items.get(action.payload.item.id) as CartItemCounter | undefined;

            if (record) {
                record.count += 1;
                newItems.set(action.payload.item.id, record);
            } else {
                const record = <CartItemCounter>{
                    count: 1,
                    item: action.payload.item,
                };
                newItems.set(action.payload.item.id, record);
            }
            return {
                ...state,
                items: newItems,
            }
        }
        case "remove": {
            const record = items.get(action.payload.item.id) as CartItemCounter | undefined;
            if(!record) {
                return state;
            }
            if (record.count === 1) {
                newItems.delete(action.payload.item.id);
            } else {
                record.count -= 1;
                newItems.set(action.payload.item.id, record);
            }
            return {
                ...state,
                items: newItems,
            }
        }
        case "clear":
            return {
                ...state,
                items: {} as Map<number, CartItemCounter>,
            }
        default: return state;
    }
}