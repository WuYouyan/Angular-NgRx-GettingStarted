import * as ProductActions from './product.actions';
import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";

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
    }),
    on(ProductActions.updateProductSuccess, (state, action) => {
        const updatedProducts = state.products.map(item => action.product.id === item.id ? action.product : item);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductActions.updateProductFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductActions.createProductSuccess, (state, action) => {
        return {
            ...state,
            products: [...state.products, action.product],
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductActions.createProductFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductActions.deleteProductSuccess, (state, action) => {
        const delectedProducts = state.products.filter(product => product.id !== action.productId);
        return {
            ...state,
            products: delectedProducts,
            currentProductId: null,
            error: ''
        };
    }),
    on(ProductActions.deleteProductFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
);