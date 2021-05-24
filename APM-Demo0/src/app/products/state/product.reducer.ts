import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from "src/app/state/app.state";
import * as ProductActions from "./product.actions";
import { Product } from "../product";

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

// Feature Selector
const getProductFeatureState = createFeatureSelector<ProductState>('products');
// Selectos
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getCurrentProductById = createSelector(getProductFeatureState, getCurrentProductId, (state, currentProductId) => {
    if (currentProductId === 0) {
        return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
        };
    }
    return currentProductId? state.products.find(p => p.id === currentProductId) : null;
});
export const getProducts = createSelector(getProductFeatureState, state => state.products);
export const getError = createSelector(getProductFeatureState, state => state.error);

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action) : ProductState =>{
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            currentProductId: action.currentProductId
        }
    }),
    on(ProductActions.clearCurrentProduct, (state) : ProductState =>{
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            currentProductId: null
        }
    }),
    on(ProductActions.initCurrentProduct, (state, action) : ProductState =>{
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            currentProductId: 0
        }
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    })
);