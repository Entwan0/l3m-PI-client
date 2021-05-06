import { Chamis, ChamisService } from './chamis/chamis.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { defis, DefisService } from './defis/defis.service';
import { Router } from '@angular/router';
import { LignesService, FeatureLigne} from './lignes/lignes.service'
import { arret, ArretService } from './arret/arret.service';
import { visites, VisitesService } from './visite/visite.service';

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
  visite$:any;
  isDefisSelectionne:boolean;
  leDefis:defis;
  leChamis:Chamis;
  Arret : arret;
  laVisite:visites;
  isAfficheListeDefis:boolean;
  isAfficheListeChamis:boolean;
  isChamisSelectionne: boolean;
  isSincrireChamis:boolean;
  isAfficheEditDefis:boolean;
  isAfficheEditChamis:boolean;
  isAfficheEditArret:boolean;
  isAfficheEditArrets:boolean;
  isAfficheListeVisite:boolean;
  isVisiteCommence:boolean;
  isAfficheEditVisite:boolean;
  isIndice:boolean;
  popupEditDefis:boolean;
  popupEditChamis:boolean;
  popupEditArrets:boolean;
  popupEditVisite:boolean;
  point:number;
  email:string;
  coutIndice:number;
  @Output() currentitem = new EventEmitter<defis>();
  reponseTrouve:number;
  idVisite:string;

  constructor(public auth: AngularFireAuth,private visiteService : VisitesService,private arretService : ArretService,private chamisService:ChamisService, private defisservice: DefisService,private router: Router, private lignesService:LignesService) {
    this.tousLeschamis$ = this.chamisService.RecupereTousLesChamis();
    this.defis$ = this.defisservice.fetchDefis();
    this.arret$ = this.arretService.RecupereTousLesArrets();
    this.lignes$ = this.lignesService.fetchLignes();
    this.arretTag$= this.lignesService.fetchArret();
    this.visite$ = this.visiteService.fetchVisites();
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
    this.popupEditVisite = false;
    this.isAfficheListeVisite = false;
    this.isAfficheEditVisite = false;
    this.isIndice = false;
    this.email = "visiteur";
    this.reponseTrouve = 0;
    this.point = 10;
    this.coutIndice = 5;
    this.idVisite = "";
    this.leDefis = this.defisservice.initializeNouveauDefis();
    this.leChamis = this.chamisService.initializeNouveauChamis();
    this.Arret = this.arretService.initializeNouveauArrets();
    this.laVisite = this.visiteService.initializeNouvelleVisite();
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

  creerNouveauDefis(id:string,titre:string,date:any,description:string,loginAuteur:string,latitude:string,longitude:string, etape : string, indice : string, question : string , reponse :string){
    this.defisservice.postDefis(id,titre,date,description,loginAuteur,latitude,longitude,etape,indice,question,reponse).subscribe(
      (response) => {
        console.log("post à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le post : " + error);
      }
    );
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
  }

  creerNouveauChamis(login:any,nom:string,prenom:string){
    this.post$ = this.chamisService.postChamis(login,nom,prenom);
  }

  afficheLeChamis(login:any){
    this.isChamisSelectionne = true;
    this.leChamis.login = login.login;
    this.leChamis.nom = login.nom;
    this.leChamis.prenom= login.prenom;
  }

  afficheLedefis(id:any){
    this.isDefisSelectionne = true;
    this.leDefis.id = id.id;
    this.leDefis.titre = id.titre;
    this.leDefis.dateDeCreation = id.dateDeCreation;
    this.leDefis.description = id.description;
    this.leDefis.loginAuteur = id.loginAuteur;
    this.leDefis.latitude = id.latitude;
    this.leDefis.longitude = id.longitude;
    this.leDefis.etapes = id.etape;
    this.leDefis.indice = id.indice;
    this.leDefis.question = id.question;
    this.leDefis.reponse = id.reponse;
  }

  afficheArret(id:any){
    this.Arret.nomArret = id.nomArret;
    this.Arret.code = id.code;
    this.Arret.latitude = id.latitude;
    this.Arret.longitude = id.longitude;
    this.Arret.nomVille = id.nomVille;
    this.Arret.streetView = id.streetView;
  }

  afficheTagArret(id:any){
    this.Arret.nomArret = id.properties.LIBELLE;
    this.Arret.code = id.properties.CODE;
    this.Arret.latitude = id.geometry.coordinates[0];
    this.Arret.longitude = id.geometry.coordinates[1];
  }

  afficheLaVisite(id:any){
    this.laVisite.idVisite = id.idVisite;
    this.laVisite.idDefis = id.idDefis;
    this.laVisite.nomVisiteur = id.nomVisiteur;
    this.laVisite.dateVisite = id.dateVisite;
    this.laVisite.mode = id.mode;
    this.laVisite.score = id.score;
    this.laVisite.temps = id.temps;
    this.laVisite.status = id.status;
  }

  /*
  * Change valeur du boolean, si boolean = vrai alors le rend faux. Si boolean est faux alors le rend vrai.
  */
  afficheListeDefis():void{
    if(!this.isModeEdition()){
      this.isAfficheListeDefis = !this.isAfficheListeDefis;
      this.isSincrireChamis = false;
      this.isAfficheListeVisite = false;
    }
  }

  afficheListeChamis():void{
    if(!this.isModeEdition()){
      this.isAfficheListeChamis = !this.isAfficheListeChamis
      this.isSincrireChamis = false;
      this.isAfficheListeVisite = false;
    }
  }

  afficheInscriptionChamis():void{
    if(!this.isModeEdition()){
      this.isSincrireChamis = !this.isSincrireChamis
      this.isAfficheListeDefis = false;
      this.isAfficheListeChamis = false;
      this.isAfficheListeVisite = false;
    }
  }

  afficheLesVisites():void{
    if(!this.isModeEdition()){
      this.isAfficheListeVisite = !this.isAfficheListeVisite;
      this.isSincrireChamis = false;
      this.isAfficheListeDefis = false;
      this.isAfficheListeChamis = false;
    }
  }

  isModeEdition(){
    let result:boolean = true;;
    if(!this.isAfficheEditDefis){
      if(!this.isAfficheEditChamis){
        if(!this.isAfficheEditArrets){
          if(!this.isAfficheEditVisite){
            result = false;
          }else{
            this.popupEditVisite = true;
          }
        }else{
          this.popupEditArrets = true;
        }
      }else{
        this.popupEditChamis = true;
      }
    }else{
      this.popupEditDefis = true;
    }
    return result;
  }

  AfficheEditDefis():void{
    this.isAfficheEditDefis = !this.isAfficheEditDefis;
    this.isAfficheListeDefis = this.isAfficheEditDefis;
    this.isAfficheListeChamis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditChamis = false;
    this.isAfficheListeVisite = false;
    this.isAfficheEditVisite = false;
  }

  AfficheEditChamis():void{
    this.isAfficheEditChamis = !this.isAfficheEditChamis;
    this.isAfficheListeChamis = this.isAfficheEditChamis;
    this.isAfficheListeDefis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditDefis = false;
    this.isAfficheListeVisite = false;
    this.isAfficheEditVisite = false;
  }

  AfficheEditArrets():void{
    this.isAfficheEditArrets = !this.isAfficheEditArrets;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditChamis = false;
    this.isAfficheEditDefis = false;
    this.isAfficheListeVisite = false;
    this.isAfficheEditVisite = false;
  }

  AfficheEditVisite():void{
    this.isAfficheEditVisite = !this.isAfficheEditVisite;
    this.isAfficheListeVisite =  this.isAfficheEditVisite;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
    this.isSincrireChamis = false;
    this.isAfficheEditChamis = false;
    this.isAfficheEditDefis = false;
    this.isAfficheEditArrets = false;
  }
  
  modifieDefis(id:string,titre:string,date:any,description:string,loginAuteur:string,latitude:string,longitude:string, etape : string, indice : string, question : string , reponse :string):void{
    this.defisservice.updateDefis(id,titre,date,description,loginAuteur,latitude,longitude,etape,indice,question,reponse).subscribe(
      (response) => {
        console.log("Put à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le put : " + error);
      }
    );
  }

  modifieChamis(login:string,nom:string,prenom:string):void{
    this.chamisService.updateChamis(login,nom,prenom).subscribe(
      (response) => {
        console.log("Put à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le put : " + error);
      }
    );
  }

  modifieArret(nomA :string,code:string,latitude:string,longitude :string,nomV: string, stView : string):void{
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

  updateVisite(IdVisite: string, IdDefi: string, NomVisiteur: string, DateVisite: any, Mode: string, Score: string, Temps: string, Status: string){
    this.visiteService.updateVisite(IdVisite, IdDefi, NomVisiteur, DateVisite, Mode, Score, Temps, Status).subscribe(
        (response) => {
          console.log("la sauvgarde à fonctionnée avec la valeur : " + response);
        },
        (error) => {
          console.error("Erreur sur le put : " + error);
        }
    );
  }
  
  createVisite(nIdVisite: string, nIdDefi: string, nNomVisiteur: string, nDateVisite: any, nMode: string, nScore: string, nTemps: string, nStatus: string){
    this.visiteService.postVisite(nIdVisite, nIdDefi, nNomVisiteur, nDateVisite, nMode, nScore, nTemps, nStatus).subscribe(
    (response) => {
      console.log("la création à fonctionnée avec la valeur : " + response);
    },
    (error) => {
      console.error("Erreur sur le put : " + error);
    }
    );
  }

   
  getUndefis(id : string):void{
    this.undefis$ = this.defisservice.recuperUnDefis(id);
    this.afficheLedefis(this.undefis$);
  }
   
  getGoogleMapView(lat:string,lng:string):string{
    return "https://www.google.com/maps/@" + lat + "," + lng + ",21z";
  }

  CommencerVisite():void{
    this.isAfficheListeDefis = true;
    this.isVisiteCommence = true;
  }

  afficheIndice():void{
    if(!this.isIndice)
    this.point = this.point - this.coutIndice;
    this.isIndice = true;
  }

  valideReponseVisiteur(reponse:string):void{
    if(reponse === this.leDefis.reponse)this.reponseTrouve = 2;
    else this.reponseTrouve = 1;
    this.insertPartieDansVisite(this.reponseTrouve);
  }

  valideReponseConnecte(reponse:string,login:any):void{
    if(reponse === this.leDefis.reponse)this.reponseTrouve = 2;
    else this.reponseTrouve = 1;
    this.email = login;
    this.insertPartieDansVisite(this.reponseTrouve);
  }

  insertPartieDansVisite(reponse:number):void{
    let msgVictoire:string = "";
    if(this.reponseTrouve === 1) msgVictoire = "Abandon";
    else msgVictoire = "Répondu";

    if(this.idVisite === ""){
      this.idVisite = "V1000";
      this.visiteService.postVisite(this.idVisite,this.leDefis.id,this.email,"2020-05-06","distanciel",this.point.toString(),"0",msgVictoire).subscribe(
        (response) => {
          console.log("la création à fonctionnée avec la valeur : " + response);
        },
        (error) => {
          console.error("Erreur sur le put : " + error);
        }
      );
    }
    else {
      this.visiteService.updateVisite(this.idVisite,this.leDefis.id,this.email,"2020-05-06","distanciel",this.point.toString(),"0",msgVictoire).subscribe(
        (response) => {
          console.log("la création à fonctionnée avec la valeur : " + response);
        },
        (error) => {
          console.error("Erreur sur le put : " + error);
        }
      );
    }
  }
}