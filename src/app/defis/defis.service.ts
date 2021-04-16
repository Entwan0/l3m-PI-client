import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DefisService{
    private _url: string = "http://localhost:5000/api/defis/"
    constructor(private http:HttpClient) { 
    }

    fetchDefis():Observable<Object>{
        return this.http.get(this._url);
    }
   
}