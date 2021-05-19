import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as UserActions from "./user.actions";
export interface UserState {
    maskUserName: boolean;
}
const initialState : UserState = {
    maskUserName: true
}

export const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const userReducer = createReducer(
    initialState,
    on(UserActions.maskUserName, state => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);