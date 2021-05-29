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
}
