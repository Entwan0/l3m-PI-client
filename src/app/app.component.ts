import { Observable } from 'rxjs';
import { Chamis, ChamisService } from './chamis/chamis.service';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { defis, DefisService } from './defis/defis.service';
import { Router } from '@angular/router';
import { LignesService, FeatureLigne, GeometryMultiLineString } from './lignes/lignes.service'

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
  isDefisSelectionne:boolean;
  leDefis:defis;
  leChamis:Chamis;
  isAfficheListeDefis:boolean;
  isAfficheListeChamis:boolean;
  isChamisSelectionne: boolean;
  IsSincrireChamis:boolean;
  IsAfficheEditDefis:boolean;
  IsAfficheEditChamis:boolean;
  popupEditDefis:boolean;
  popupEditChamis:boolean;
  
  constructor(public auth: AngularFireAuth,private chamisService:ChamisService, private defisservice: DefisService,private router: Router, private lignesService:LignesService) {
    this.tousLeschamis$ = this.chamisService.RecupereTousLesChamis();
    this.defis$ = this.defisservice.fetchDefis();
    this.lignes$ = this.lignesService.fetchLignes();
    this.isDefisSelectionne = false;
    this.isChamisSelectionne = false;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
    this.IsSincrireChamis = false;
    this.IsAfficheEditDefis = false;
    this.IsAfficheEditChamis = false;
    this.popupEditDefis = false;
    this.popupEditChamis = false;
    this.leDefis = this.defisservice.initializeNouveauDefis();
    this.leChamis = this.chamisService.initializeNouveauChamis();
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
    this.leDefis.id = id.id;
    this.leDefis.titre = id.titre;
    this.leDefis.dateDeCreation = id.dateDeCreation;
    this.leDefis.description = id.description;
    this.leDefis.loginAuteur = id.loginAuteur;
    this.leDefis.latitude = id.latitude;
    this.leDefis.longitude = id.longitude;
    console.log(id);
  }

  /*
  * Change valeur du boolean, si boolean = vrai alors le rend faux. Si boolean est faux alors le rend vrai.
  */
  afficheListeDefis():void{
    if(!this.IsAfficheEditDefis){
      if(!this.IsAfficheEditChamis){
        this.isAfficheListeDefis = !this.isAfficheListeDefis;
        this.IsSincrireChamis = false;
      }else{
        this.popupEditChamis = true;
      }
    }else{
      this.popupEditDefis = true;
      this.popupEditChamis = true;
    }
  }

  afficheListeChamis():void{
    if(!this.IsAfficheEditDefis){
      if(!this.IsAfficheEditChamis){
        this.isAfficheListeChamis = !this.isAfficheListeChamis
        this.IsSincrireChamis = false;
      }else{
        this.popupEditChamis = true;
      }
    }else{
      this.popupEditDefis = true;
    }
  }

  afficheInscriptionChamis():void{
    if(!this.IsAfficheEditDefis){
      if(!this.IsAfficheEditChamis){
        this.IsSincrireChamis = !this.IsSincrireChamis
        this.isAfficheListeDefis = false;
        this.isAfficheListeChamis = false;
      }else{
        this.popupEditChamis = true;
      }
    }else{
      this.popupEditDefis = true;
    }
  }

  AfficheEditDefis():void{
      this.isAfficheListeDefis = !this.isAfficheListeDefis;
      this.IsAfficheEditDefis = !this.IsAfficheEditDefis;
      this.isAfficheListeChamis = false;
      this.IsSincrireChamis = false;
      this.isDefisSelectionne = false;
      this.IsAfficheEditChamis = false;
  }

  AfficheEditChamis():void{
    this.isAfficheListeChamis = !this.isAfficheListeChamis;
    this.IsAfficheEditChamis = !this.IsAfficheEditChamis;
    this.isAfficheListeDefis = false;
    this.IsSincrireChamis = false;
    this.isDefisSelectionne = false;
    this.IsAfficheEditDefis = false;
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
}