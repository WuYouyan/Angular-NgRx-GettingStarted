import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Product } from '../product';
import { getCurrentProductById, getError, getProducts, getShowProductCode, State } from '../state';
import { ProductPageActions } from "../state/actions";
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.selectedProduct$ = this.store.select(getCurrentProductById);

    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductPageActions.loadProducts());

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct(
        { currentProductId: product.id }
      )
    );
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(ProductPageActions.deleteProduct({ productId: product.id }));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(ProductPageActions.clearCurrentProduct());
    }
  }
  saveProduct(product: Product): void {
    if (product.id === 0) {
      this.store.dispatch(ProductPageActions.createProduct({ product }));
    } else {
      this.store.dispatch(ProductPageActions.updateProduct({ product }));
    }
  }
}
