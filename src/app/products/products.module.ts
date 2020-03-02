import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';



@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductUpdateComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
