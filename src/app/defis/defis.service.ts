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
    etapes : string;
    indice : string;
    question: string;
    reponse : string;
}

@Injectable()
export class DefisService{
    private _url: string = "https://projet-integrateur.herokuapp.com/api/defis/"
    //private _url: string = "http://localhost:5000/api/defis/"

    constructor(private http:HttpClient) { 
    }

    fetchDefis():Observable<defis>{
        return this.http.get<defis>(this._url);
    }

    public recuperUnDefis(id:string):Observable<defis>{
        return this.http.get<defis>(this._url+id);
    }

    initializeNouveauDefis():defis{
        let leDefis:defis = {
            id: "",
            titre: "",
            dateDeCreation: new Date('01-01-0000'),
            description: "",
            loginAuteur: "",
            latitude: "",
            longitude: "",
            etapes : "",
            indice : "",
            question : "",
            reponse : ""
        }
        return leDefis;
    }

    updateDefis(nId: string, nTitre: string, nDate: any, nDescription: string, nLoginAuteur: string, nLatitude: string, nLongitude: string, nEtapes:string, nIndice : string, nQuestion : string, nReponse : string):Observable<defis> {
        let newDefis:defis = {
            id:nId,
            titre:nTitre,
            dateDeCreation:nDate,
            description:nDescription,
            loginAuteur:nLoginAuteur,
            latitude:nLatitude,
            longitude:nLongitude,
            etapes : nEtapes,
            indice : nIndice,
            question : nQuestion,
            reponse : nReponse 
        };
    return this.http.put<defis>(this._url+newDefis.id,newDefis);
    }

    postDefis(nId: string, nTitre: string, nDate: any, nDescription:string, nLoginAuteur:string, nLatitude:string, nLongitude:string, nEtapes:string, nIndice : string, nQuestion : string, nReponse : string): Observable<defis> {
        const newDefis:defis = {
            id:nId,
            titre:nTitre,
            dateDeCreation:nDate,
            description:nDescription,
            loginAuteur:nLoginAuteur,
            latitude:nLatitude,
            longitude:nLongitude,
            etapes : nEtapes,
            indice : nIndice,
            question : nQuestion,
            reponse : nReponse 
        };
        return this.http.post<defis>(
          this._url + nId,
          newDefis
        );
    }
}