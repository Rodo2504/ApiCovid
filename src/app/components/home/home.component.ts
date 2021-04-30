import { Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chart.js';
import { NgModel} from '@angular/forms';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private data: DataService) { }
  paises: any //obtiene los paises disponibles para busqueda
  covid: any  //informcion de covid del pais elegido
  pais: any   //informacion general del pais elegido
  bandera: string 
  control = false
  ctrl = "0"
  datos = []
  aux_datos = []
  poblacion: any  //obtiene poblacion del pais elegido
  ctrl_extra = false //saber si hay otras ciudades del pais
  historico: any // datos historicos del pais
  label_hist = []
  data_hist = []
  aux_lbl_hist = []
  aux_dta_hist = []
  fecha: any


  ngOnInit(): void {
    this.paises = this.data.paises
    AOS.init();
  }
  getDatos(e){
    this.control = true
    //console.log(e)
    this.data.info_historic(e).subscribe( data => {
      //console.log("Datos histor",data['All'].dates)
      let j=0
      for(let i in data['All'].dates){
        if(j==15){
          break
        }
        //console.log(i," - ",data['All'].dates[i])
        this.label_hist.push(i)
        this.data_hist.push(data['All'].dates[i])        
        j++
      } 
      this.data_hist = this.data_hist.reverse()
      this.label_hist = this.label_hist.reverse()
 
      this.aux_dta_hist = this.data_hist
      this.aux_lbl_hist = this.label_hist
      this.data_hist = []
      this.label_hist = []
      //console.log("aux_data ",this.aux_dta_hist)
      //console.log("aux_lbl ",this.aux_lbl_hist)
      this.lineChartData[0].data = this.aux_dta_hist
    })
    this.data.info_pais(e).subscribe(data => {
      this.pais = data
      //console.log(data);
      this.bandera = data[0].flag
    }) 
    this.data.info_covid(e).subscribe((data) => {
      //console.log(data)
      if(Object.keys(data).length!=1){ //hay mas
        this.ctrl_extra = true
      }else{ //solo hay 1
        this.ctrl_extra = false
      }
      this.fecha = new Date()
      this.poblacion = data['All'].population
      this.covid = data
      this.datos.push(this.covid['All'].confirmed)
      this.datos.push(this.covid['All'].recovered)
      this.datos.push(this.covid['All'].deaths)
      this.datos.push(0)
      this.aux_datos = this.datos
      this.datos = []
      this.barChartData[0].data = this.aux_datos
    })
    
  }
  // ----------------- Grafica Barras ---------------------
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Confirmados', 'Recuperados', 'Muertes'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [{
    data: this.datos,
    label: 'Casos'
  }];
  public barChartPlugins = [pluginDataLabels];
  
  public barChartColors = [
    {
      backgroundColor: 'rgba(17, 114, 160)', //backgroundColor: ['rgba(17, 114, 160)', 'rgba(241, 236, 228)', 'rgba(176, 166, 151)']
    },
  ]; 
  // -------------------- Grafica Lineas --------------------------
  lineChartData: ChartDataSets[] = [
    { data: this.data_hist, label: 'Casos Confirmados'},
  ];

  lineChartLabels: Label[] = this.label_hist;

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#DCD9D4',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  
}
