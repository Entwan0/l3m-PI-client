import { ChamisService } from './chamis/chamis.service';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { DefisService } from './defis/defis.service';

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
  chamis$:any;
  defis$:any;
  post$:any;

  constructor(public auth: AngularFireAuth,private chamisService:ChamisService, private defisservice: DefisService) {
    this.chamis$ = this.chamisService.fetchChamis();
    this.defis$ = this.defisservice.fetchDefis();
  }

  creerNouveauChamis(login:any): void{
    this.post$ = this.chamisService.postChamis(login,"testNom","testPrenom");
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
}