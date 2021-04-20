import { ChamisService } from './chamis/chamis.service';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { defis, DefisService } from './defis/defis.service';

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
  defisSelectionne:boolean;
  leDefis:defis;
  isAfficheListeDefis:boolean;
  isAfficheListeChamis:boolean;
  IsSincrireChamis:boolean;

  constructor(public auth: AngularFireAuth,private chamisService:ChamisService, private defisservice: DefisService) {
    this.tousLeschamis$ = this.chamisService.RecupereTousLesChamis();
    this.defis$ = this.defisservice.fetchDefis();
    this.defisSelectionne = false;
    this.isAfficheListeDefis = false;
    this.isAfficheListeChamis = false;
    this.IsSincrireChamis = false;
    this.leDefis = this.defisservice.initializeNouveauDefis();
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
    this.defisSelectionne = true;
    this.leDefis.id = id.id;
    this.leDefis.titre = id.titre;
    this.leDefis.description = id.description;
    console.log(id);
  }

  /*
  * Change valeur du boolean, si boolean = vrai alors le rend faux. Si boolean est faux alors le rend vrai.
  */
  afficheListeDefis():void{
    this.isAfficheListeDefis = !this.isAfficheListeDefis;
  }

  afficheListeChamis():void{
    this.isAfficheListeChamis = !this.isAfficheListeChamis
  }

  afficheInscriptionChamis():void{
    this.IsSincrireChamis = !this.IsSincrireChamis
  }
}