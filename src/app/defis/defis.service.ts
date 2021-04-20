import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface defis {
    id:string;
    titre:string;
    dateDeCreation:Date;
    description:string;
    longinAuteur:string;
    latitue:string;
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
   
    afficheUndefis(id : string){  
        console.log("id recu : " + id);
        return this.http.get('http://localhost:5000/api/defis/'+id);
    }

    initializeNouveauDefis():defis{
        let leDefis:defis = {
            id: "",
            titre: "",
            dateDeCreation: new Date('01-01-0000'),
            description: "",
            longinAuteur: "",
            latitue: "",
            longitude: ""
        }
        return leDefis;
    }
}