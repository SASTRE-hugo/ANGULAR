import { NgModule } from '@angular/core';
import {LdapListComponent} from "./ldap-list/ldap-list.component";
import {LdapAddComponent} from "./ldap-add/ldap-add.component";
import {LdapEditComponent} from "./ldap-edit/ldap-edit.component";
import {AlertComponent} from "../alert/alert.component";
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppMaterialModule} from "../app-material.module";
import { LdapManagementRoutingModule } from './ldap-management-routing.module';
import {NavbarComponent} from "./navbar/navbar.component";


@NgModule({
  declarations: [
    LdapListComponent,
    LdapAddComponent,
    LdapEditComponent,
    AlertComponent,
    NavbarComponent,
  ],
  exports:[
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LdapManagementRoutingModule,
  ]
})
export class LdapManagementModule { }
