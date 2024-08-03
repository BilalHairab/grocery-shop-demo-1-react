import { AuthAction } from "./userReducer.types";

export default {
    login: (userData): AuthAction => {
        return {
            type: 'login',
            payload: userData
        }
    },
}