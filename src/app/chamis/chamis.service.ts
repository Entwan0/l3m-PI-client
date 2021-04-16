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

    postChamis(loginPassed:string): Observable<Chamis>{
        const newChamisLogin = {
            age: 20,
            login: loginPassed
        };

        console.log("login recu : " + newChamisLogin.login);
        return this.http.post<Chamis>('http://localhost:5000/api/users/'+newChamisLogin.login,newChamisLogin);
    }
}