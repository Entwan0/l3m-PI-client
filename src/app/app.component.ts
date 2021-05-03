import { Chamis, ChamisService } from './chamis/chamis.service';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { defis, DefisService } from './defis/defis.service';
import { Router } from '@angular/router';
import { LignesService, FeatureLigne, FeatureLigneCollection } from './lignes/lignes.service'
import { arret, ArretService } from './arret/arret.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class AppComponent {
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;
  dataIconGoogle = 'assets/images/iconGoogle.png';
  tousLeschamis$:any;
  defis$:any;
  lignes$:any;
  post$:any;
  arret$:any;
  arretTag$:any;
  undefis$:any;
  isDefisSelectionne:boolean;
  leDefis:defis;
  leChamis:Chamis;
  Arret : arret;
  isAfficheListeDefis:boolean;
  isAfficheListeChamis:boolean;
  isChamisSelectionne: boolean;
  isSincrireChamis:boolean;
  isAfficheEditDefis:boolean;
  isAfficheEditChamis:boolean;
  isAfficheEditArret:boolean;
  isAfficheEditArrets:boolean;
  isVisiteCommence:boolean;
  popupEditDefis:boolean;
  popupEditChamis:boolean;
  popupEditArrets:boolean;
  
  constructor(public auth: AngularFireAuth,private arretService : ArretService,private chamisService:ChamisService, private defisservice: DefisService,private router: Router, private lignesService:LignesService) {
    this.tousLeschamis$ = this.chamisService.RecupereTousLesChamis();
    this.defis$ = this.defisservice.fetchDefis();
    this.arret$ = this.arretService.RecupereTousLesArrets();
    this.lignes$ = this.lignesService.fetchLignes();
    this.arretTag$= this.lignesService.fetchArret();
    this.isDefisSelectionne = false;
    this.isChamisSelectionne = false;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditDefis = false;
    this.isAfficheEditChamis = false;
    this.isAfficheEditArret = false;
    this.isAfficheEditArrets = false;
    this.isVisiteCommence = false;
    this.popupEditDefis = false;
    this.popupEditChamis = false;
    this.popupEditArrets = false;
    this.leDefis = this.defisservice.initializeNouveauDefis();
    this.leChamis = this.chamisService.initializeNouveauChamis();
    this.Arret = this.arretService.initializeNouveauArrets();
  }

  ngOnInit() {
    if (this.router.url.startsWith("/user")) {
      console.log("Nous sommes dans l'écran de gestion des utilisateurs.");        
    }
  }
  
  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
  this.auth.signInWithPopup(provider);
  }
  
  logout(): void {
    this.auth.signOut();
  }

  creerNouveauDefis(id:string,titre:string,date:any,description:string,loginAuteur:string,latitude:string,longitude:string){
    this.defisservice.postDefis(id,titre,date,description,loginAuteur,latitude,longitude).subscribe(
      (response) => {
        console.log("post à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le post : " + error);
      }
    );
    console.log("/"+latitude+"/"+longitude+"/");
  }

  creerNouveauArret(nomA :string,code:string,latitude:string,longitude :string,nomV: string, stView : string){
    this.arretService.AjouteArret(nomA,code,latitude,longitude,nomV,stView).subscribe(
      (response) => {
        console.log("post à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le post : " + error);
      }
    );
    console.log("/"+nomA+"/"+code+"/");
  }

  creerNouveauChamis(login:any,nom:string,prenom:string){
    this.post$ = this.chamisService.postChamis(login,nom,prenom);
  }

  afficheLeChamis(login:any){
    this.isChamisSelectionne = true;
    this.leChamis.login = login.login;
    this.leChamis.nom = login.nom;
    this.leChamis.prenom= login.prenom;
    console.log(login);
  }

  afficheLedefis(id:any){
    this.isDefisSelectionne = true;
    this.isVisiteCommence = true;
    this.leDefis.id = id.id;
    this.leDefis.titre = id.titre;
    this.leDefis.dateDeCreation = id.dateDeCreation;
    this.leDefis.description = id.description;
    this.leDefis.loginAuteur = id.loginAuteur;
    this.leDefis.latitude = id.latitude;
    this.leDefis.longitude = id.longitude;
    console.log(id);
  }

  afficheArret(id:any){
    this.Arret.nomArret = id.nomArret;
    this.Arret.code = id.code;
    this.Arret.latitude = id.latitude;
    this.Arret.longitude = id.longitude;
    this.Arret.nomVille = id.nomVille;
    this.Arret.streetView = id.streetView;
    console.log("eee" + id);
  }
  afficheTagArret(id:any){
    this.Arret.nomArret = id.properties.LIBELLE;
    this.Arret.code = id.properties.CODE;
    this.Arret.latitude = id.geometry.coordinates[0];
    this.Arret.longitude = id.geometry.coordinates[1];
    console.log("je suis la" + id);
  }
  /*
  * Change valeur du boolean, si boolean = vrai alors le rend faux. Si boolean est faux alors le rend vrai.
  */
  afficheListeDefis():void{
    if(!this.isAfficheEditDefis){
      if(!this.isAfficheEditChamis){
        if(!this.isAfficheEditArrets){
          this.isAfficheListeDefis = !this.isAfficheListeDefis;
          this.isSincrireChamis = false;
        }else{
          this.popupEditArrets = true;
        }
      }else{
        this.popupEditChamis = true;
      }
    }else{
      this.popupEditDefis = true;
    }
  }

  afficheListeChamis():void{
    if(!this.isAfficheEditDefis){
      if(!this.isAfficheEditChamis){
        if(!this.isAfficheEditArrets){
          this.isAfficheListeChamis = !this.isAfficheListeChamis
          this.isSincrireChamis = false;
        }else{
          this.popupEditArrets = true;
        }
      }else{
        this.popupEditChamis = true;
      }
    }else{
      this.popupEditDefis = true;
    }
  }

  afficheInscriptionChamis():void{
    if(!this.isAfficheEditDefis){
      if(!this.isAfficheEditChamis){
        if(!this.isAfficheEditArrets){
          this.isSincrireChamis = !this.isSincrireChamis
          this.isAfficheListeDefis = false;
          this.isAfficheListeChamis = false;
        }else{
          this.popupEditArrets = true;
        }
      }else{
        this.popupEditChamis = true;
      }
    }else{
      this.popupEditDefis = true;
    }
  }

  AfficheEditDefis():void{
    this.isAfficheListeDefis = !this.isAfficheListeDefis;
    this.isAfficheEditDefis = !this.isAfficheEditDefis;
    this.isAfficheListeChamis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditChamis = false;
  }

  AfficheEditChamis():void{
    this.isAfficheListeChamis = !this.isAfficheListeChamis;
    this.isAfficheEditChamis = !this.isAfficheEditChamis;
    this.isAfficheListeDefis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditDefis = false;
  }

  AfficheEditArrets():void{
    this.isAfficheEditArrets = !this.isAfficheEditArrets;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditChamis = false;
    this.isAfficheEditDefis = false;
  }
  
  modifieDefis(id:string,titre:string,date:any,description:string,loginAuteur:string,latitude:string,longitude:string){
    this.defisservice.updateDefis(id,titre,date,description,loginAuteur,latitude,longitude).subscribe(
      (response) => {
        console.log("Put à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le put : " + error);
      }
    );
  }

  modifieChamis(login:string,nom:string,prenom:string){
    this.chamisService.updateChamis(login,nom,prenom).subscribe(
      (response) => {
        console.log("Put à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le put : " + error);
      }
    );
  }

  modifieArret(nomA :string,code:string,latitude:string,longitude :string,nomV: string, stView : string){
    this.arretService.updateArret(nomA,code,latitude,longitude,nomV,stView).subscribe(
      (response) => {
        console.log("Put à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le put : " + error);
      }
    );
  }

  rgbToString(ligne: FeatureLigne):string{
    return 'rgb('+ligne.properties.COULEUR+')';
  }
  getUndefis(id : string){
    console.log("laaaa" + id);
    this.undefis$ = this.defisservice.recuperUnDefis(id);
    console.log("laaaa" + this.undefis$);
    this.afficheLedefis(this.undefis$);

    }
   
  
  getGoogleMapView(lat:string,lng:string){
    console.log("["+lat+","+lng+"]");
    return "https://www.google.com/maps/@" + lat + "," + lng + ",21z";
  }

  CommencerVisite(){
    this.isAfficheListeDefis = true;
    this.isVisiteCommence = true;
  }
  method1(){
    console.log("click reussi");
  }
}