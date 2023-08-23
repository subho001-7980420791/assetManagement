import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { UsersComponent } from '@pages/users/users.component';
import { CountryComponent } from '@pages/country/country.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AddBuildingComponent } from './add-building/add-building.component';
import { AddRoomComponent } from './add-room/add-room.component';


const routes: Routes = [
  {
      path: '',
      pathMatch:'full',
      redirectTo:'home',
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
          path: 'profile',
          component: ProfileComponent
      },
      {
          path: 'blank',
          component: BlankComponent
      },
      {
          path: 'sub-menu-1',
          component: SubMenuComponent
      },
      {
          path: 'sub-menu-2',
          component: BlankComponent
      },
      {
          path: '',
          component: DashboardComponent
      },
      {
        path:'user',
        component: UsersComponent
      },
      {
        path:'country',
        component: CountryComponent
      },
      {
        path:'add/room',
        component:AddRoomComponent
    },
    {
        path:'add/building',
        component:AddBuildingComponent
    },
    {
        path:'asset',
        component:AddAssetComponent
    }

  ]
  },
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [NonAuthGuard]
  },
  {
      path: 'register',
      component: RegisterComponent,
      canActivate: [NonAuthGuard]
  },
  {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
      canActivate: [NonAuthGuard]
  },
  {
      path: 'recover-password',
      component: RecoverPasswordComponent,
      canActivate: [NonAuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
