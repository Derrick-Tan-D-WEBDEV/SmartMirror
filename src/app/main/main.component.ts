import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  weather_data:any = [];
  no:any = 1;
  constructor(private _APIService: APIService) { }

  ngOnInit(): void {
    this.getAllWeatherAPI_data(1);
    this.getAllWeatherAPI_data(2);
    this.getAllWeatherAPI_data(3);
    setInterval(this.showDate, 1000);
    setInterval(() => {
      this.changeWeatherAPI_data(); 
    }, 1000);
  }


  showDate() {
    let currentDate = document.getElementById('currentDate');
    let currentTime = document.getElementById('currentTime');
    let current_datetime = new Date();
    let sec = '00';
    let min = '00';
    let hr = '00';
    if(current_datetime.getSeconds() > 9){
      sec = current_datetime.getSeconds().toString();
    }else{  
      sec = '0'+current_datetime.getSeconds().toString();
    }

    if(current_datetime.getMinutes() > 9){
      min = current_datetime.getMinutes().toString();
    }else{  
      min = '0'+current_datetime.getMinutes().toString();
    }

    if(current_datetime.getHours() > 9){
      hr = current_datetime.getHours().toString();
    }else{  
      hr = '0'+current_datetime.getHours().toString();
    }
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    let formatted_time = hr + ":" + min + ":" + sec;

    currentDate.innerHTML = formatted_date.toString();
    currentTime.innerHTML = formatted_time.toString();
  }
  
  getAllWeatherAPI_data(location){
    this._APIService.getAllWeatherAPI_data(location).subscribe(
      v =>{
        this.weather_data.push(v.data.db_result);

      });
  }

  changeWeatherAPI_data(){
 
    let penang = document.getElementById('penang-weather');
    let kulim = document.getElementById('kulim-weather');
    let batukawan = document.getElementById('batu-kawan-weather');
    if(this.no == 1){
      this.no += 1;
      penang.style.display = 'block';
      kulim.style.display = 'none';
      batukawan.style.display = 'none';
      console.log("123");
    }
    else if(this.no == 2){
      this.no += 1;
      penang.style.display = 'none';
      kulim.style.display = 'block';
      batukawan.style.display = 'none';
      console.log("2");
    }
    else if(this.no == 3){
      this.no = 1;
      penang.style.display = 'none';
      kulim.style.display = 'none';
      batukawan.style.display = 'block';
      console.log("3");
    }
  }

}

