import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

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
    on(createAction('[User] Mask User Name'), state => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);