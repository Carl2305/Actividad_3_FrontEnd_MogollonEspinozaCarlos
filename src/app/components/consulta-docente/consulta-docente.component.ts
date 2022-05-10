import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-docente',
  templateUrl: './consulta-docente.component.html',
  styleUrls: ['./consulta-docente.component.css']
})
export class ConsultaDocenteComponent implements OnInit {

  //Ng model
  nombre:string="";
  dni:string="";
  estado:boolean=false;
  selDepartamento:string = "-1"; 
  selProvincia:string = "-1"; 
  selDistrito:number = -1;

  
  //Ubigeo
  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

  //Grila
  docentes: Docente[] = [];

  constructor(private ubigeoService: UbigeoService,private docenteService:DocenteService) { 
      ubigeoService.listarDepartamento().subscribe(
          (x) => this.departamentos = x
      );
  }

  cargaProvincia(){
      this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
            (x)  => this.provincias = x      
      );
      this.selProvincia = "-1";
      this.distritos = [];
      this.selDistrito = -1;
  }
  cargaDistrito(){
      this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
            (x)  => this.distritos = x      
      );
      this.selDistrito = -1;
  }

  consultaDocente(){
    let est:number=(this.estado==true)? 1: 0;

    this.docenteService.listaDocente(this.nombre!, this.dni!, this.selDistrito, est).subscribe(resp=>{
      this.docentes=resp.data!;
      console.log(this.docentes);
      
    }, error=>{
      console.log(error);
    })
  }


  ngOnInit(): void {}

}
