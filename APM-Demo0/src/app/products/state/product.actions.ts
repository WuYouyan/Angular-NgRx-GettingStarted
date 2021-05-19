import { createAction, props } from "@ngrx/store";
import { Product } from "../product";
// Actions
export const toggleProductCode = createAction('[Product List Page] Toggle Product Code');
export const setCurrentProduct = createAction(
    '[Product List Page] Set Current Product',
    props<{ product: Product}>()
);
export const clearCurrentProduct = createAction('[Product Edit Page] Clear Current Product');
export const initCurrentProduct = createAction('[Product List Page] Init Current Product');
export const loadProducts = createAction('[Product List Page] Load Products');
export const loadProductsSuccess = createAction('[Product API] Load Success');
export const loadProductsFailure = createAction('[Product API] Load Fail');
