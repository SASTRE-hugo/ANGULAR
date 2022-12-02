import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LdapListComponent} from "./Model/ldap-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'user/list', component: LdapListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
