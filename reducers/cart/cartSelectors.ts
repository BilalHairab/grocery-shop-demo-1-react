import { RootState } from "../store";

export const fullCartSelector = (state: RootState) => state.cartReducer.items;

export const cartItemSelector = (itemId: number) => (state: RootState) => state.cartReducer.items[itemId];

export const cartViewingItemSelector = (state: RootState) => state.cartReducer.viewingItem;