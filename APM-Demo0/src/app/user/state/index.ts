import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as AppState from "src/app/state/app.state";

import { UserState } from "./user.reducer";

export interface State extends AppState.State {
    user: UserState;
}

export const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);
