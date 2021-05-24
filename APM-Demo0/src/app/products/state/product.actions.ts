import { createAction, props } from "@ngrx/store";
import { Product } from "../product";
// Actions
export const toggleProductCode = createAction('[Product List Page] Toggle Product Code');
export const setCurrentProduct = createAction(
    '[Product List Page] Set Current Product',
    props<{ currentProductId: number }>()
);
export const clearCurrentProduct = createAction('[Product Edit Page] Clear Current Product');
export const initCurrentProduct = createAction('[Product List Page] Init Current Product');

export const loadProducts = createAction('[Product] Load');
export const loadProductsSuccess = createAction('[Product] Load Success', props<{products: Product[]}>());
export const loadProductsFailure = createAction('[Product] Load Fail', props<{error: string}>());
