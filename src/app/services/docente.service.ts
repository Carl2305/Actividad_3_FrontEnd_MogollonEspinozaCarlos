import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL="http://localhost:8090/rest/docente/";

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http:HttpClient) { }

  listaDocente(nombre:string, dni:string, idUbigeo:number, estado:number):Observable<any>{
    const params= new HttpParams().set("nombre",nombre).set("dni",dni).set("idUbigeo",idUbigeo).set("estado",estado);
    return this.http.get<any>(BASE_URL+"listaPorParametros", {params}!);
  }

}
