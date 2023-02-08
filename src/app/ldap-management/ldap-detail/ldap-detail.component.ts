import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../service/users.service';
import { UserLdap } from '../ldap-list/user-ldap';
import { FormBuilder } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordsValidator } from './passwords-validator.directive';
import { InMemoryUsersService } from 'src/app/service/in-memory-users.service';
import { LDAP_USERS } from '../ldap-list/ldap-mock-data';
import { LdapEditComponent } from '../ldap-edit/ldap-edit.component';

export abstract class LdapDetailComponent   {

  user: UserLdap;
  routeId: ActivatedRoute;

  processLoadRunning =false;
  processValidateRunning=false;
  passwordPlaceHolder:string;
  errorMessage = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  memoryUserService = new InMemoryUsersService();

  userFormDisabled = {value:'', disabled:true};

  userForm = this.fb.group({
    id:{value:'', disabled:true},
    login:[''],
    nom:[''],
    prenom:[''],
    mail:this.userFormDisabled,
    employeNumero:[''],
    employeNiveau:[''],
    dateEmbauche:[''],
    publisherId:[''],
    active:[''],
    role:[''],

    passwordGroup: this.fb.group({
      password:[''],
      confirmPassword:['']
    },{validators: passwordsValidator}),

  });

  protected constructor(
    //private route: ActivatedRoute,
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe ' + (this.addForm ? '' : '(vide si inchangé)')
  }

  protected onInit(): void {
    // this.getUser();
  }

  isFormValid():boolean{
    return this.userForm.valid && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm():void;


  private formGetValue(name:string): any {
    return this.userForm.get(name).value;
  }

  goToLdap(): void{
    this.router.navigate(['/users/list']);
  }

  onSubmitForm(): void { this.validateForm();}

  updateLogin(): void {
    if (this.addForm){
      this.userForm.get('login').setValue((
        this.formGetValue('prenom') +
        '.' +
        this.formGetValue('nom')).toLowerCase()
      );
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm){
      this.userForm.get('mail').setValue(
        this.formGetValue('login').toLowerCase() +
        '@mail.com');
    }
  }

  protected copyUserToFormControl() {
    this.userForm.get('id').setValue(this.user.id.toString());

    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);

    this.userForm.get('employeNumero').setValue(this.user.employeNumero.toString());
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau.toString());

    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('publisherId').setValue(this.user.publisherId.toString());

    this.userForm.get('active').setValue(this.user.active.toString());
    this.userForm.get('role').setValue(this.user.role);

  }

  protected getUserFromFormControl(): UserLdap{

    if (this.addForm){
      return {
        id:this.memoryUserService.genId(LDAP_USERS),

        login: this.userForm.get('login').value,
        nom: this.userForm.get('nom').value,
        prenom: this.userForm.get('prenom').value,
        nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
        mail: this.userForm.get('mail').value,

        employeNumero: Number(this.userForm.get('employeNumero').value),
        employeNiveau: Number(this.userForm.get('employeNiveau').value),

        dateEmbauche: this.userForm.get('dateEmbauche').value,
        publisherId: Number(this.userForm.get('publisherId').value),

        active: Boolean(this.userForm.get('active').value),
        role: this.userForm.get('role').value,
        motDePasse: '',

      };
    }else{
      return{
        id: Number(this.userForm.get('id').value),

        login: this.userForm.get('login').value,
        nom: this.userForm.get('nom').value,
        prenom: this.userForm.get('prenom').value,
        nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
        mail: this.userForm.get('mail').value,

        employeNumero: Number(this.userForm.get('employeNumero').value),
        employeNiveau: Number(this.userForm.get('employeNiveau').value),

        dateEmbauche: this.userForm.get('dateEmbauche').value,
        publisherId: Number(this.userForm.get('publisherId').value),

        active: Boolean(this.userForm.get('active').value),
        role: this.userForm.get('role').value,
        motDePasse: '',
      };
    }
  }
}
