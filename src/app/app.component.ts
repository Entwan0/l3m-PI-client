import { ChamisService } from './chamis/chamis.service';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { defis, DefisService } from './defis/defis.service';
import { Router } from '@angular/router';

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
  post$:any;
  isDefisSelectionne:boolean;
  leDefis:defis;
  isAfficheListeDefis:boolean;
  isAfficheListeChamis:boolean;
  IsSincrireChamis:boolean;
  IsAfficheEditDefis:boolean;
  id$:string="";

  constructor(public auth: AngularFireAuth,private chamisService:ChamisService, private defisservice: DefisService,private router: Router) {
    this.tousLeschamis$ = this.chamisService.RecupereTousLesChamis();
    this.defis$ = this.defisservice.fetchDefis();
    this.isDefisSelectionne = false;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
    this.IsSincrireChamis = false;
    this.IsAfficheEditDefis = false;
    this.leDefis = this.defisservice.initializeNouveauDefis();
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

  creerNouveauChamis(login:any,nom:string,prenom:string){
    this.post$ = this.chamisService.postChamis(login,nom,prenom);
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
      this.isAfficheListeDefis = !this.isAfficheListeDefis;
      this.IsSincrireChamis = false;
    }
  }

  afficheListeChamis():void{
    if(!this.IsAfficheEditDefis){
      this.isAfficheListeChamis = !this.isAfficheListeChamis
      this.IsSincrireChamis = false;
    }
  }

  afficheInscriptionChamis():void{
    this.IsSincrireChamis = !this.IsSincrireChamis
    this.IsAfficheEditDefis = false;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
  }

  AfficheEditDefis():void{
      this.isAfficheListeDefis = !this.isAfficheListeDefis;
      this.IsAfficheEditDefis = !this.IsAfficheEditDefis;
      this.isAfficheListeChamis = false;
      this.IsSincrireChamis = false;
      this.isDefisSelectionne = false;
  }
  
  setID(idDefis:string){
    console.log("id recu : " + idDefis);
    this.id$=idDefis;
    console.log("id recu : " + this.id$);
  }

  modifieDefis(id:string,titre:string,date:any,description:string,loginAuteur:string,latitude:string,longitude:string){
    this.defisservice.updateDefis(id,titre,date,description,loginAuteur,latitude,longitude).subscribe(
      (response) => {
        console.log("Put à fonctionné avec la valeur : " + response);
      },
      (error) => {
        console.error("Erreur sur le prut : " + error);
      }
    );
  }
}