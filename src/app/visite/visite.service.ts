import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface visites {
  idVisite : string;
  idDefis : string;
  nomVisiteur : string;
  dateVisite : String;
  mode : string;
  score : string;
  temps : string; 
  status : string;
}

@Injectable()
export class VisitesService {
  private _url: string = "https://projet-integrateur.herokuapp.com/api/visites/";
 
  constructor(private http:HttpClient) { 
  }

  fetchVisites():Observable<visites>{
    return this.http.get<visites>(this._url);
  }

  recuperUneVisite(nomVisiteur:string):Observable<visites>{
    return this.http.get<visites>(this._url+nomVisiteur);
  }

  initializeNouvelleVisite():visites{
    let laVisite : visites = {
        idVisite: "",
        idDefis: "",
        nomVisiteur: "",
        dateVisite: '01-01-0000',
        mode: "",
        score: "",
        temps: "",
        status: ""
    }
    return laVisite;
  }

  updateVisite(nIdVisite: string, nIdDefi: string, nNomVisiteur: any, nDateVisite: String, nMode: string, nScore: string, nTemps: string, nStatus: string):Observable<visites> {
    let newVisites:visites = {
      idVisite: nIdVisite,
      idDefis: nIdDefi,
      nomVisiteur: nNomVisiteur,
      dateVisite: nDateVisite,
      mode: nMode,
      score: nScore,
      temps: nTemps,
      status: nStatus
    };
    console.log("id de visite /" + newVisites.idVisite + "/ id du defi /" + newVisites.idDefis + "/ nom du visiteur /" + newVisites.nomVisiteur + "/ date de la visite /" + newVisites.dateVisite + "/ mode de la visite /" + newVisites.mode + "/ score /" + newVisites.score + "/ temps de visite /" + newVisites.temps + "/ status de la visite /" + newVisites.status);
    return this.http.put<visites>(this._url + newVisites.idVisite,newVisites);
  }

  RecuperUneVisite(login: string): Observable<visites> {
    return this.http.get<visites>(login);
  }

  postVisite(nIdVisite: string, nIdDefi: string, nNomVisiteur: string, nDateVisite: String, nMode: string, nScore: string, nTemps: string, nStatus: string):Observable<visites>  {
    const newVisites:visites = {
      idVisite: nIdVisite,
      idDefis: nIdDefi,
      nomVisiteur: nNomVisiteur,
      dateVisite: nDateVisite,
      mode: nMode,
      score: nScore,
      temps: nTemps,
      status: nStatus
    };

    return this.http.post<visites>(
      this._url + nIdVisite,
      newVisites
    );
  }
}
