import { AuthAction, AuthState } from "./userReducer.types";

const initialState: AuthState = {
    authenticated: false
};

export default function reducer(state = initialState, action: AuthAction): AuthState {
    console.log(`reducer ${JSON.stringify(action)}`)
    switch(action.type) {
        case "login": 
        return {
            ...state,
            authenticated: true,
            username: action.payload.username,
            address: action.payload.address,
            longtitude: action.payload.longtitude,
            latitude: action.payload.latitude,
        }
        case "logout": 
        return {
            ...state,
            authenticated: false,
            username: undefined,
            address: undefined,
            longtitude: undefined,
            latitude: undefined,
        }
        default: return state;
    }
}