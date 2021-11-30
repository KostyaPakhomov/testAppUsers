import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigatorComponent} from "./navigator/navigator.component";
import {ErrorScreenComponent} from "./shared/error-screen/error-screen.component";
import {ListPageComponent} from "./list-page/list-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/listPage/navigator', pathMatch: 'full'},
  {
    path: 'listPage',
    component: ListPageComponent,
    children: [
      {path: 'navigator', component: NavigatorComponent},
    ]
  },
  {path: 'errorScreen', component: ErrorScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
