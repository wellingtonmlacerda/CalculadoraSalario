import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // public InssAliquota: number
  // public Cota: number
  // public IrrfAliquota: number
  // public IrrfDeducao: number
  // public DeducaoDependente: number
  
  constructor() {}

  calcularSalario(){
    let resultado: number = 10 * 11;
    return resultado;
  }
}
