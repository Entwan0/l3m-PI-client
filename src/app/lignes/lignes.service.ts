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

export interface FeatureArret extends Feature {
  // type: 'Feature';
  geometry: GeometryMultiLineString;
  properties: {
    CODE: string; // "SEM_C1"
    LIBELLE: string; // "GRENOBLE Cité Jean Macé / MEYLAN Maupertuis"
    type: string; // "ligne" 'arret'
    COMMUNE: string; // "C1"
    arr_visible : number; // 1
    id: string; // "SEM_C1"
    epci: string;
  };
}


export interface FeatureArretCollection extends FeatureCollection {
  // type: 'FeatureCollection';
  features: FeatureLigne[];
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
    private _urlA: string= "https://data.mobilites-m.fr/api/findType/json?types=arret&query"
    constructor(private http:HttpClient) { 
    }

    fetchLignes():Observable<FeatureLigneCollection>{
      return this.http.get<FeatureLigneCollection>(this._url).pipe(map((obs: { features: any; }) => obs.features));
    }
    fetchArret():Observable<FeatureArretCollection>{
      return this.http.get<FeatureArretCollection>(this._urlA).pipe(map((obs: { features: any; }) => obs.features));
  }
}