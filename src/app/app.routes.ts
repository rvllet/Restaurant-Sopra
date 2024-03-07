import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DetailDishComponent } from './detail-dish/detail-dish.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { DishAddComponent } from './dish-add/dish-add.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';
import { WrongRouteComponent } from './wrong-route/wrong-route.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { isAdminGuard } from './guards/is-admin.guard';
import { isLoguedGuard } from './guards/is-logued.guard';
import { ShopComponent } from './shop/shop.component';


export const routes: Routes = [

  { path: 'dishes/edit/:id', component: DishEditComponent, canActivate: [isAdminGuard]},
  { path: 'dishes/edit', component: AdminMenuComponent, canActivate: [isAdminGuard]},
  { path: 'dishes/add', component: DishAddComponent, canActivate: [isAdminGuard]},
  { path: 'dishes/:id', component: DetailDishComponent},
  { path: 'dishes', component: MenuComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [isLoguedGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [isLoguedGuard] },
  { path: 'login', component: LoginComponent },


  { path: 'welcome', component: WelcomeComponent },

  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: WrongRouteComponent },
];

