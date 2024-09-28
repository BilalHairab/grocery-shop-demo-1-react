import { RootState } from "../store";

export const activeOrderSelector = (state: RootState) => state.orderReducer.activeOrder;

export const ordersSelector = (state: RootState) => state.orderReducer.orders;
