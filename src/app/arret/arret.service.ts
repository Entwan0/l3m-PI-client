import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface arret {
    nomArret: string,
    code: string,
    streetMap: string,
    googleMap: string,
    nomVille: string
}

@Injectable()
export class ArretService {
    private _url: string = "http://localhost:5000/api/arrets/"
    constructor(private http:HttpClient ){
    }


    RecupereTousLesArrets(): Observable<arret>{
        return this.http.get<arret>(this._url);
    }
    
    RecuperUnArret(nomArret:string): Observable<arret>{
        return this.http.get<arret>(this._url+nomArret);
    }

    initializeNouveauArrets(): arret{
        let Arret : arret = {
            nomArret: "",
            code: "",
            streetMap: "",
            googleMap : "",
            nomVille : ""
        }
        return Arret;
    }

    updateArret(nNomArret: string, nCode: string, nStreetMap: string,nGoogleMap:string, nNomVille : string): Observable<arret> {
        let newArret : arret = {
            nomArret : nNomArret,
            code : nCode,
            streetMap : nStreetMap,
            googleMap : nGoogleMap,
            nomVille : nNomVille
           
        };
        console.log("nomArret /" + newArret.nomArret + "/ code /" + newArret.code + "/ streetMap /" + newArret.streetMap + "/ googleMap /" + newArret.googleMap+ "/ nomVille /" + newArret.nomVille);
       
        return this.http.put<arret>(this._url+ newArret.nomArret,newArret);
      }
      AjouteArret(nNomArret: string, nCode: string, nStreetMap: string,nGoogleMap:string, nNomVille : string): Observable<arret> {
        const newArret : arret = {
            nomArret : nNomArret,
            code : nCode,
            streetMap : nStreetMap,
            googleMap : nGoogleMap,
            nomVille : nNomVille
           
        };
        console.log("nomArret /" + newArret.nomArret + "/ code /" + newArret.code + "/ streetMap /" + newArret.streetMap + "/ googleMap /" + newArret.googleMap+ "/ nomVille /" + newArret.nomVille);
        return this.http.post<arret>(this._url + nNomArret,newArret);
      }
}
