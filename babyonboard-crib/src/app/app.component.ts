import { Component, OnDestroy, OnInit, Input, } from '@angular/core';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable"
import { HttpClient } from '@angular/common/http';
import { Move } from './move.enum';
import { MoveDecorator } from './move.decorator';
import { APIService } from './api.service';


declare var myIP: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@MoveDecorator
export class AppComponent implements OnInit {
  title = 'Baby on Board';


  private interval = 5000;;
  private endpoint_m = 'movement/';
  private ip: string;
  private url;

  private results_m = {};

  move: Move;


  constructor(private apiService:APIService) {

    this.move = Move.none;

    this.ip = window.location.hostname;
    this.url = 'http://' + this.ip + ':8000/api/v1/';
  }


  ngOnInit(): void {

    //Constantly requiring the information
    Observable.timer(0, this.interval).subscribe(val => {

        this.getMovement();

        if(this.results_m == "resting" && this.move != Move.none){
            this.onSubmitCancel();
        }
    });
  }

  onSubmitCancel():void {
    this.move = Move.none // screen back to default
  }


  getMovement(){
    this.apiService.getData(this.url+this.endpoint_m).subscribe(data => {
      this.results_m = data['status'];
    },
    error => {
      console.log('API não encontrada');
    });
  }

  onSubmitFrontMove(value: string): void {
    this.apiService.setMovement(this.url+this.endpoint_m, value, 'front')
    this.move = Move.front_move;
    console.log('front move ativado por ' + value + ' minutos.');
  }

  onSubmitSideMove(value: string): void {
    this.apiService.setMovement(this.url+this.endpoint_m, value, 'side')
    this.move = Move.side_move;
    console.log('side move ativado por ' + value + ' minutos.');
  }

  onSubmitVibrate(value: string): void {
    this.apiService.setMovement(this.url+this.endpoint_m, value, 'vibration')
    this.move = Move.vibrate;
    console.log('vibrar ativado por ' + value + ' minutos.');
  }
}
