import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Chamis {
  login: string;
  nom: string;
  prenom: string;
}

@Injectable()
export class ChamisService {
  private path = "http://localhost:5000/api/users/";
  constructor(private http: HttpClient) {}

  initializeNouveauChamis(): Chamis {
    let leChamis: Chamis = {
      login: "",
      nom: "",
      prenom: "",
    };
    return leChamis;
  }

  RecupereTousLesChamis(): Observable<Chamis> {
    return this.http.get<Chamis>(this.path);
  }

  RecuperUnChamis(login: string): Observable<Chamis> {
    return this.http.get<Chamis>(this.path);
  }

  postChamis(loginGoogle: string,nomChoisi: string,prenomChoisi: string): Observable<Chamis> {
    const newChamisLogin = {
      login: loginGoogle,
      nom: nomChoisi,
      prenom: prenomChoisi,
    };
    return this.http.post<Chamis>(
      this.path + loginGoogle,
      newChamisLogin
    );
  }

  updateChamis(nLogin: string,nNom: string,nPrenom: string): Observable<Chamis> {
    let newChamis: Chamis = {
      login: nLogin,
      nom: nNom,
      prenom: nPrenom,
    };
    return this.http.put<Chamis>(this.path + newChamis.login,newChamis);

  }
}
