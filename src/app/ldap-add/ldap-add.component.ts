import { Component, OnInit } from '@angular/core';
import {LdapDetailComponent} from "../ldap-detail/ldap-detail.component";
import {UsersService} from "../service/users.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit {
  constructor( private usersService:UsersService,
               fb: FormBuilder,
               router: Router,) {
    super(true,fb,router);
  }

  ngOnInit(): void {
    super.OnInit();
  }

  validateForm():void{
    console.log('LdapAddComponent - validateForm');
  }
}
