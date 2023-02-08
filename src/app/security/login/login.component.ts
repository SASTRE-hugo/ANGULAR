import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../authentification.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  processRunning=false;
  private formSubmitAttempt:boolean;

  constructor(
    private fb:FormBuilder,
    private authentificationService:AuthentificationService,
    public router:Router,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form =this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field:string){
    return(
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit(){
    if (this.form.valid){
      this.processRunning = true;
      this.authentificationService.loginwithRole(
        this.form.get('userName').value,
        this.form.get('password').value,
        'ROLE_SUPER_ADMIN'
      ).subscribe(()=> {
        if(AuthentificationService.isLoggedIn()){
          this.processRunning = false;
          this.router.navigate([this.authentificationService.redirectUrl]);
        }else{
          throw new Error();
        }
      },(error:HttpErrorResponse) =>{
          this.processRunning = false;
          this.snackBar.open('Login ou mot de passe invalide !', 'X');
      });
    }
    this.formSubmitAttempt= true;
  }

}
