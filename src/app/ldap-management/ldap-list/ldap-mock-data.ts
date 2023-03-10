import {UserLdap} from "./user-ldap";

export const LDAP_USERS:UserLdap[]=[
  {
    id:1,
    login:'test_v1',
    nom:'V1',
    prenom:'Test',
    nomComplet:'V1 Test',
    motDePasse : 'hugo',
    mail:'test.v1@espi.fr',
    role:'ROLE_SUPER_ADMIN',
    employeNumero : 1234,
    employeNiveau : 120,
    dateEmbauche:'2020-01-01',
    publisherId : 1,
    active : true,
  },
  {
    id:2,
    login:'test_v2',
    nom:'V2',
    prenom:'Test',
    nomComplet:'V2 Test',
    motDePasse : 'hugo',
    mail:'test.v2@espi.fr',
    role:'ROLE_SUPER_ADMIN',
    employeNumero : 2234,
    employeNiveau : 220,
    dateEmbauche:'2020-02-02',
    publisherId : 2,
    active : true,
  }
  ];
