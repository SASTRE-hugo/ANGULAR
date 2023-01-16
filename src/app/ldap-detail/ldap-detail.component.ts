import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ldap-detail',
  templateUrl: './ldap-detail.component.html',
  styleUrls: ['./ldap-detail.component.scss']
})
export class LdapDetailComponent implements OnInit {

  constructor() { }

  edit(login:string){
    this.router.navigate(['/user', login]).then( (e) =>{
      if (!e){
        console.log("Navigation has failed !")
      }

    })
  }

  ngOnInit(): void {
  }

}
