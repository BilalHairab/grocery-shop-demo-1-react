import { combineReducers, createStore } from "redux";
import * as UserReducer from '@/reducers/user/userReducer';
import * as CartReducer from '@/reducers/cart/cartReducer';

const reducers = combineReducers({user: UserReducer.default, cart: CartReducer.default})
export const store = createStore(reducers)

export type RootState = ReturnType<typeof store.getState>;
