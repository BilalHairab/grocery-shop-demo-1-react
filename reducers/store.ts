import { combineReducers, createStore } from "redux";
import userReducer from '@/reducers/user/userReducer';
import cartReducer from '@/reducers/cart/cartReducer';
import orderReducer from "@/reducers/order/orderReducer";

const reducers = combineReducers({userReducer, cartReducer, orderReducer})
export const store = createStore(reducers)

export type RootState = ReturnType<typeof store.getState>;
