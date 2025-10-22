import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/public//home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { NavbarComponent } from './components/public/share/navbar/navbar.component';
import { FooterComponent } from './components/public/share/footer/footer.component';
import { CategoryListComponent } from './components/private/admin/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/private/admin/category/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/private/admin/category/category-update/category-update.component';
import { ProductListComponent } from './components/private/admin/product/product-list/product-list.component';
import { ProductAddComponent } from './components/private/admin/product/product-add/product-add.component';
import { ProductUpdateComponent } from './components/private/admin/product/product-update/product-update.component';
import { OrderListComponent } from './components/private/admin/order/order-list/order-list.component';
import { ClientListComponent } from './components/private/admin/client/client-list/client-list.component';
import { DashboardComponent } from './components/private/admin/shared/dashboard/dashboard.component';
import { MyOrdersComponent } from './components/private/client/order/my-orders/my-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from './page404/page404.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    OrderListComponent,
    ClientListComponent,
    DashboardComponent,
    MyOrdersComponent,
    Page404Component,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
