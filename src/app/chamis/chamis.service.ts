import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Chamis {
    login: string,
    nom: string,
    prenom: string;
}

@Injectable()
export class ChamisService {

    constructor(private http:HttpClient){
    }

    RecupereTousLesChamis(): Observable<Object>{
        return this.http.get('http://localhost:5000/api/users/');
    }

    RecuperUnChamis(login:string): Observable<Object>{
        return this.http.get('http://localhost:5000/api/users/'+login);
    }

    postChamis(loginGoogle:string,nomChoisi:string,prenomChoisi:string): Observable<Chamis>{
        const newChamisLogin = {
            login: loginGoogle,
            nom: nomChoisi,
            prenom: prenomChoisi
        };

        return this.http.post<Chamis>('http://localhost:5000/api/users/'+loginGoogle,newChamisLogin);
    }
}