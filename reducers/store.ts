import { combineReducers, createStore } from "redux";
import userReducer from '@/reducers/user/userReducer';
import cartReducer from '@/reducers/cart/cartReducer';

const reducers = combineReducers({userReducer, cartReducer})
export const store = createStore(reducers)

export type RootState = ReturnType<typeof store.getState>;
