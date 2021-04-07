import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component'
import { ProductCrudComponent } from './views/product-crud/product-crud.component'
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductSearchComponent } from './views/product-search/product-search.component';
import { ProductInfoComponent } from './components/product/product-info/product-info.component';
import { ProductBuyComponent } from './components/product/product-buy/product-buy.component';
import { ContactComponent } from './views/contact/contact.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "products/update/:id",
    component: ProductUpdateComponent
  },
  {
    path: "products/delete/:id",
    component: ProductDeleteComponent
  },
  {
    path: "products/search",
    component: ProductSearchComponent
  },
  {
    path: "products/info/:id",
    component: ProductInfoComponent
  },
  {
    path: "products/buy/:id",
    component: ProductBuyComponent
  },
  {
    path: "contact",
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
