import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';

export interface arret {
    nomArret: string,
    code: string,
    latitude: string,
    longitude: string,
    nomVille: string,
    streetView: string
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
            latitude: "",
            longitude : "",
            nomVille : "",
            streetView: ""
        }
        return Arret;
    }

    updateArret(nNomArret: string, nCode: string, nlatitude: string,nlongitude:string, nNomVille : string, nstreetView: string): Observable<arret> {
        let newArret : arret = {
            nomArret : nNomArret,
            code : nCode,
            latitude : nlatitude,
            longitude : nlongitude,
            nomVille : nNomVille,
            streetView: nstreetView
        };
        console.log("nomArret /" + newArret.nomArret + "/ code /" + newArret.code + "/ latitude /" + newArret.latitude + "/ longitude /" + newArret.longitude+ "/ nomVille /" + newArret.nomVille + "/ nstreetView /" + newArret.streetView);
       
        return this.http.put<arret>(this._url+ newArret.nomArret,newArret);
      }
      AjouteArret(nNomArret: string, nCode: string, nlatitude: string,nlongitude:string, nNomVille : string, nstreetView: string): Observable<arret> {
        const newArret : arret = {
            nomArret : nNomArret,
            code : nCode,
            latitude : nlatitude,
            longitude : nlongitude,
            nomVille : nNomVille,
            streetView : nstreetView
        };
        console.log("nomArret /" + newArret.nomArret + "/ code /" + newArret.code + "/ latitude /" + newArret.latitude + "/ longitude /" + newArret.longitude+ "/ nomVille /" + newArret.nomVille + "/ nstreetView /" + newArret.streetView ) ;
        return this.http.post<arret>(this._url + nNomArret,newArret);
      }



}

