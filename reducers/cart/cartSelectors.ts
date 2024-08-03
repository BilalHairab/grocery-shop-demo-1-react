import { RootState } from "../store";

export const fullCartSelector = (state: RootState) => state.cart.items;