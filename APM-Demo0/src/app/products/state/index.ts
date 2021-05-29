import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as AppState from "src/app/state/app.state";
import { ProductState } from "./product.reducer";


// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
    products: ProductState;
}

// Feature Selector
const getProductFeatureState = createFeatureSelector<ProductState>('products');
// Selectors
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
