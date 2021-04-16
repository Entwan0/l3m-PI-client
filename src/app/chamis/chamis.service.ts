import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Chamis {
    age: number,
    login: string;
}

@Injectable()
export class ChamisService {

    constructor(private http:HttpClient){
    }

    fetchChamis(): Observable<Object>{
        return this.http.get('http://localhost:5000/api/users/');
    }

    postChamis(loginGoogle:string,nomChoisi:string,prenomChoisi:string): Observable<Chamis>{
        const newChamisLogin = {
            login: loginGoogle,
            nom: nomChoisi,
            prenom: prenomChoisi
        };

        console.log("login recu : " + newChamisLogin.login);
        return this.http.post<Chamis>('http://localhost:5000/api/users/'+newChamisLogin.login,newChamisLogin);
    }
}