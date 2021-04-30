import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Feature, FeatureCollection} from 'geojson';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FeatureLigne extends Feature {
  // type: 'Feature';
  geometry: GeometryMultiLineString;
  properties: {
    CODE: string; // "SEM_C1"
    COULEUR: string; // "253,234,0"
    COULEUR_TEXTE: string; // "0,0,0"
    LIBELLE: string; // "GRENOBLE Cité Jean Macé / MEYLAN Maupertuis"
    NUMERO: string; // "C1"
    PMR: number; // 1
    ZONES_ARRET: string[];
    id: string; // "SEM_C1"
    type: string; // "ligne" 'arret'
  };
}

export interface FeatureLigneCollection extends FeatureCollection {
  // type: 'FeatureCollection';
  features: FeatureLigne[];
} 

export interface GeometryMultiLineString {
  type: 'MultiLineString';
  coordinates: GeoPoint[][];
}

export type GeoPoint = [lng: number, lat: number];

@Injectable()
export class LignesService{
    private _url: string = "https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM"
    constructor(private http:HttpClient) { 
    }

    fetchLignes():Observable<FeatureLigneCollection>{
        return this.http.get<FeatureLigneCollection>(this._url).pipe(map((obs: { features: any; }) => obs.features));
    }
}