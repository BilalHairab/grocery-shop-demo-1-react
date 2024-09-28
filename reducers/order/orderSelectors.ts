import { RootState } from "../store";

export const activeOrderSelector = (state: RootState) => state.orderReducer.activeOrder;
