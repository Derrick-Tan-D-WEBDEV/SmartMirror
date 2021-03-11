import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    setInterval(this.showDate, 1000);
  }


  showDate() {
    let currentDate = document.getElementById('currentTime');
    let current = new Date();
    currentDate.innerHTML = `Current Date and Time : <b>${current}</b> `;
  }
  
  
}
