import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from "src/app/state/app.state";
import * as ProductActions from "./product.actions";
import { Product } from "../product";

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode:true,
    currentProduct:null,
    products:[],
    error: ''
}

// Feature Selector
const getProductFeatureState = createFeatureSelector<ProductState>('products');
// Selectos
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
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
            currentProduct: action.product
        }
    }),
    on(ProductActions.clearCurrentProduct, (state) : ProductState =>{
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            currentProduct: null
        }
    }),
    on(ProductActions.initCurrentProduct, (state, action) : ProductState =>{
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
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