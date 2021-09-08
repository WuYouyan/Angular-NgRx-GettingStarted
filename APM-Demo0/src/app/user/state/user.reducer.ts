import { createReducer, on } from "@ngrx/store";
import { UserPageActions } from "./actions";

export interface UserState {
    maskUserName: boolean;
}

const initialState : UserState = {
    maskUserName: true
}

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserPageActions.maskUserName, (state): UserState => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);