import { createReducer, on } from "@ngrx/store";
import { UserPageActions } from "./actions";


export interface UserState {
    maskUserName: boolean;
}

const initialState : UserState = {
    maskUserName: true
}

export const userReducer = createReducer(
    initialState,
    on(UserPageActions.maskUserName, state => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);