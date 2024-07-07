export type AuthState = {
    authenticated: boolean;
    username?: string;
    address?: string;
    longtitude?: number;
    latitude?: number;
};

export type AuthAction = AuthActionLogin | AuthActionLogout;

export type AuthActionLogin = {
    type: "login";
    payload: {
        username: string;
        address: string;
        longtitude: number;
        latitude: number;    
    }
};

export type AuthActionLogout = {
    type: "logout";
    payload: {
    }
};
