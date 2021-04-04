import { isEmptyExpression } from '@angular/compiler';
import { Component } from '@angular/core';
import { element } from 'protractor';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  inssAliquota: number = 0;
  inssDesconto: number = 0;
  cota: number = 0;
  irrfAliquota: number = 0;
  irrfDeducao: number = 0;
  deducaoDependente: number = 0;
  irrfDesconto: number = 0;
  descontos: number = 0;
  salarioInss: number = 0;
  salarioLiquido: number = 0;
  
  // constructor() {
  // }

  
  calcularSalario(SBruto: number, QtdDependente: number, OutrosDes: number){
    if(SBruto){
      //Pega a Alíquota do INSS
      if(SBruto <= 1100){
        this.inssAliquota = 7.5;
      }else if(SBruto >= 1100.01 && SBruto <= 2203.48){
        this.inssAliquota = 9;
      }else if(SBruto >= 2203.49 && SBruto <= 3305.22){
        this.inssAliquota = 12;
      }else if(SBruto >= 3305.23 && SBruto <= 6433.57){
        this.inssAliquota = 14;
      }

      //Pega a Cota do Salário Família
      if(SBruto <= 1503.25){
        this.cota = 51.27;
      }else{
        this.cota = 0;
      }
      
      this.inssDesconto = SBruto * (this.inssAliquota / 100);
      this.salarioInss = SBruto - this.inssDesconto;
      
      //Pega Alíquota do IRRF
      if(this.salarioInss >= 1903.99 && this.salarioInss <= 2826.65){
        this.irrfAliquota = 7.5;
        this.irrfDeducao = 142.80;
      }else if(this.salarioInss >= 2826.66 && this.salarioInss <= 3751.05){
        this.irrfAliquota = 15;
        this.irrfDeducao = 354.80;
      }else if(this.salarioInss >= 3751.06 && this.salarioInss <= 4664.68){
        this.irrfAliquota = 22.5;
        this.irrfDeducao = 636.13;
      }else if(this.salarioInss > 4664.68){
        this.irrfAliquota = 27.5;
        this.irrfDeducao = 869.36;
      }
    }

    //Pega a dedução por dependente
    if(QtdDependente){
      this.deducaoDependente = QtdDependente * 189.59;
    }

    //Pega o desconto do IRRF
    this.irrfDesconto = (this.salarioInss * (this.irrfAliquota / 100)) - this.irrfDeducao;
    if(this.irrfDesconto >= this.deducaoDependente){
      this.irrfDesconto -= this.deducaoDependente;
    }else{
      this.irrfDesconto = 0;
      this.irrfAliquota = 0;
    }
    let outrosDescontos: number = 0;
    if(OutrosDes){
      outrosDescontos = parseInt(OutrosDes.toString());
    }
    this.descontos = (this.inssDesconto + this.irrfDesconto + outrosDescontos);
    this.salarioLiquido = (SBruto - this.descontos) + this.cota;
  }
}
