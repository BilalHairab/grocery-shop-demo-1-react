import { RootState } from "../store";

export const isAuthenticatedSelector = (state: RootState) => state.user.authenticated;