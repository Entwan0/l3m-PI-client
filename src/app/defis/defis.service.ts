import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface defis {
    id:string;
    titre:string;
    dateDeCreation:Date;
    description:string;
    loginAuteur:string;
    latitude:string;
    longitude:string;
}

@Injectable()
export class DefisService{
    private _url: string = "http://localhost:5000/api/defis/"
    constructor(private http:HttpClient) { 
    }

    fetchDefis():Observable<defis>{
        return this.http.get<defis>(this._url);
    }

    recuperUnDefis(id:string):Observable<defis>{
        return this.http.get<defis>(this._url+id);
    }
   
    afficheUndefis(id : string){  
        console.log("id recu : " + id);
        return this.http.get(this._url+id);
    }

    initializeNouveauDefis():defis{
        let leDefis:defis = {
            id: "",
            titre: "",
            dateDeCreation: new Date('01-01-0000'),
            description: "",
            loginAuteur: "",
            latitude: "",
            longitude: ""
        }
        return leDefis;
    }

    updateDefis(nId: string, nTitre: string, nDate: any, nDescription: string, nLoginAuteur: string, nLatitude: string, nLongitude: string):Observable<defis> {
        let newDefis:defis = {
            id:nId,
            titre:nTitre,
            dateDeCreation:nDate,
            description:nDescription,
            loginAuteur:nLoginAuteur,
            latitude:nLatitude,
            longitude:nLongitude
        };
    console.log("id /" + newDefis.id + "/ titre /" + newDefis.titre + "/ date /" + newDefis.dateDeCreation + "/ description /" + newDefis.description + "/ login auteur /" + newDefis.loginAuteur + "/ latitude /" + newDefis.latitude + "/ longitude /" + newDefis.longitude);
    return this.http.put<defis>(this._url+newDefis.id,newDefis);
    }

    postDefis(nId: string, nTitre: string, nDate: any, nDescription:string, nLoginAuteur:string, nLatitude:string, nLongitude:string): Observable<defis> {
        const newDefis:defis = {
            id:nId,
            titre:nTitre,
            dateDeCreation:nDate,
            description:nDescription,
            loginAuteur:nLoginAuteur,
            latitude:nLatitude,
            longitude:nLongitude
        };
        
        console.log("la latitude : " + newDefis.latitude + " et la longitude : " + newDefis.longitude);
        return this.http.post<defis>(
          this._url + nId,
          newDefis
        );
      }
}