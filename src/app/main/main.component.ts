import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import Swal from 'sweetalert2'
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  weather_data:any = [];
  no:any = 1;

  news:any = [];
  constructor(private _APIService: APIService) { }

  ngOnInit(): void {
    let penang = document.getElementById('penang-weather');
    let kulim = document.getElementById('kulim-weather');
    let batukawan = document.getElementById('batu-kawan-weather');
    penang.style.display = 'none';
    kulim.style.display = 'none';
    batukawan.style.display = 'none';

    this.changeWeatherAPI_data();
    this.getAllWeatherAPI_data(1);
    this.getAllWeatherAPI_data(2);
    this.getAllWeatherAPI_data(3);
    this.getAllNewsAPI_data();

    setInterval(this.showDate, 1000);
    setInterval(() => { this.changeWeatherAPI_data(); }, 3600000);

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

        var html = "";
        if(location == 1){
          let penang = document.getElementById('penang-weather');
          html += "<h2><img src='"+v.data.db_result.image+"' />Bayan Lepas,\nPenang</h2>";
          html += "<h4>"+ v.data.db_result.temperature + " &#8451; &nbsp;|&nbsp; Wind:&nbsp;"+v.data.db_result.wind+"km/h</h4>";
          penang.innerHTML = html;
        }
        else if(location == 2){
          let kulim = document.getElementById('kulim-weather');
          html += "<h2><img src='"+v.data.db_result.image+"' />Kulim,<br>Kedah</h2>";
          html += "<h4>"+ v.data.db_result.temperature + " &#8451; &nbsp;|&nbsp; Wind:&nbsp;"+v.data.db_result.wind+"km/h</h4>";
          kulim.innerHTML = html;
        }
        else if(location == 3){
          let batukawan = document.getElementById('batu-kawan-weather');
          html += "<h2><img src='"+v.data.db_result.image+"' />Batu Kawan,\nPenang</h2>";
          html += "<h4>"+ v.data.db_result.temperature + " &#8451; &nbsp;|&nbsp; Wind:&nbsp;"+v.data.db_result.wind+"km/h</h4>";
          batukawan.innerHTML = html;
        }

      });
  }

  getAllNewsAPI_data(){
    this._APIService.getAllNewsAPI_data().subscribe(
      v =>{
        this.news = v.data.db_result;

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
    }
    else if(this.no == 2){
      this.no += 1;
      penang.style.display = 'none';
      kulim.style.display = 'block';
      batukawan.style.display = 'none';
    }
    else if(this.no == 3){
      this.no = 1;
      penang.style.display = 'none';
      kulim.style.display = 'none';
      batukawan.style.display = 'block';
    }
  }

  openAppsPanel(){
    Swal.fire({
      html:
      `
        <div class="text-white">
          <h2><span class="badge badge-light">Apps</span></h2>
          <div class="row">
            <div class="col-sm-6 pointer mt-5">
              <img src="assets/img/minecraft.png" class="img-fluid" width="50" />
              <br><br>
              <span>Minecraft</span>
            </div>
            <div class="col-sm-6 pointer mt-5">
              <img src="assets/img/stock-market.png" class="img-fluid" width="50" />
              <br><br>
              <span>Stock</span>
            </div>
            <div class="col-sm-6 pointer mt-5">
              <img src="assets/img/web-search-engine.png" class="img-fluid" width="50" />
              <br><br>
              <span>Web Search</span>
            </div>
            <div class="col-sm-6 pointer mt-5">
              <img src="assets/img/fast-food.png" class="img-fluid" width="50" />
              <br><br>
              <span>Random Food</span>
            </div>
          </div>
        </div>
      `,
      width: 700,
      padding: '3em',
      background: '#232323',
      backdrop: `
        rgba(0,0,0,0.7)
      `,
      showCloseButton: true,
      showConfirmButton: false
    })
  }
}

