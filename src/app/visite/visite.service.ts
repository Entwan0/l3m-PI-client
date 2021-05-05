import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface visites {
  idVisite : string;
  idDefi : string;
  nomVisiteur : string;
  dateVisite : Date;
  mode : string;
  score : string;
  temps : string; 
  status : string;
}

@Injectable()
export class VisitesService {
  private _url: string = "http://localhost:5000/api/visites/"
 
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
      idDefi: "",
      nomVisiteur: "",
      dateVisite: new Date('01-01-0000'),
      mode: "",
      score: "",
      temps: "",
      status: ""
  }
  return laVisite;
}

updateVisite(nIdVisite: string, nIdDefi: string, nNomVisiteur: any, nDateVisite: Date, nMode: string, nScore: string, nTemps: string, nStatus: string):Observable<visites> {
  let newVisites:visites = {
    idVisite: nIdVisite,
    idDefi: nIdDefi,
    nomVisiteur: nNomVisiteur,
    dateVisite: nDateVisite,
    mode: nMode,
    score: nScore,
    temps: nTemps,
    status: nStatus
  };
  console.log("id de visite /" + newVisites.idVisite + "/ id du defi /" + newVisites.idDefi + "/ nom du visiteur /" + newVisites.nomVisiteur + "/ date de la visite /" + newVisites.dateVisite + "/ mode de la visite /" + newVisites.mode + "/ score /" + newVisites.score + "/ temps de visite /" + newVisites.temps + "/ status de la visite /" + newVisites.status);
  return this.http.put<visites>(this._url + newVisites.idVisite,newVisites);
  }

  postVisite(nIdVisite: string, nIdDefi: string, nNomVisiteur: any, nDateVisite: Date, nMode: string, nScore: string, nTemps: string, nStatus: string):Observable<visites>  {
    const newVisites:visites = {
      idVisite: nIdVisite,
      idDefi: nIdDefi,
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
