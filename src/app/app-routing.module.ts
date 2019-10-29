import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'portifolio/:id', loadChildren: './pages/portifolio/portifolio.module#PortifolioPageModule' },
  { path: 'product', loadChildren: './pages/product/product.module#ProductPageModule' },
  { path: 'productadd', loadChildren: './pages/product/productadd/productadd.module#ProductaddPageModule' },
  { path: 'productadd/:id', loadChildren: './pages/product/productadd/productadd.module#ProductaddPageModule' },
  { path: 'page', loadChildren: './page/page.module#PagePageModule' },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
