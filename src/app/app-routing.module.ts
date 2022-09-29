import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './View/admin/admin.component';
import { HomeComponent } from './View/home/home.component';
import { LoginComponent } from './View/login/login.component';
import { MainComponent } from './View/main/main.component';
import { RegisterComponent } from './View/register/register.component';
import { SchoolProfileComponent } from './View/school-profile/school-profile.component';
import { UserProfileComponent } from './View/user-profile/user-profile.component';

const routes: Routes = [
  {path:'manage',component:AdminComponent},
  {path:'login',component:LoginComponent },
  {path:'register',component:RegisterComponent},
  {path:'main',component:MainComponent,
  children:[
    {path:'home',component:HomeComponent},
    {path:'userprofile',component:UserProfileComponent},
    {path:'schoolprofile',component:SchoolProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
