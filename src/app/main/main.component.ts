import { Component, ElementRef, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  weather_data:any = [];
  no:any = 1;

  images = [
      {path: 'assets/img/greatech/1.jpg'},
      {path: 'assets/img/greatech/2.jpg'},
      {path: 'assets/img/greatech/3.jpg'},
      {path: 'assets/img/greatech/4.jpg'},
  ];

  news:any = [];

  forex:any = {};
  current_forex:any = [];
  forexSelected:any = "EUR";
  forexKeyList:any = [];

  
  apps_now:any = "greatech_career";
  surf_path:any;

  _news_title:any = "asd";
  _news_content:any = "asdsd";
  _news_image:any = "";

  _quote_content:any = "";
  _quote_title:any = "";

  _covid_total:any = 0;
  _covid_recovered:any = 0;
  _covid_new_case:any = 0;
  _covid_icu: any = 0;
  _covid_deaths:any = 0;
  
  randomDone:any = 0;
  _food_store_name:any = "";
  _food_image:any = "";
  _food_rating:any = "";
  _food_address:any = "";
  _food_price:any = "";
  _food_phone:any = "";
  _food_qr_code:any = "";

  _fuel_ron95:any = 0;
  _fuel_ron97:any = 0;
  _fuel_diesel:any = 0;

  _meme_url:any = "";

  _cryptoList:any = [];

  _gs_market_cap:any = "";
  _gs_nosh:any = "";
  _gs_avg_volume:any = "";
  _gs_4weeks_range:any = "";
  _gs_weekspricevolatility:any = "";
  _gs_52weeksrange:any = "";
  _gs_weeksrangevolatility:any = "";
  _gs_avgpricetarget:any = "";
  _gs_pricetarget:any = "";

  _stockList:any = [];

  _careerList:any = [];
  constructor(private _APIService: APIService,private _elementRef:ElementRef, protected _sanitizer: DomSanitizer) { }

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
    this.getOneQuote_data();
    this.getCovidAPI_data();
    this.getAllForexAPI_data("EUR");
    this.getAllForexAPI_data("GBP");
    this.getAllFuelAPI_data();
    this.getAllCryptoAPI_data();
    this.getAllGSAPI_data();
    this.getAllStockAPI_data();
    this.getAllCareerAPI_data();

    this.current_forex = this.forex[this.forexSelected];
    this.getRandomFoodAPI_data();
    this.getRandomMemeAPI_data();


    console.log(this.forex);
    setInterval(this.showDate, 1000);
    setInterval(() => { this.changeWeatherAPI_data(); }, 5000);

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
          html += "<h2><img src='"+v.data.db_result.image+"' />Bayan Lepas,<br>Penang</h2>";
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
          html += "<h2><img src='"+v.data.db_result.image+"' />Batu Kawan,<br>Penang</h2>";
          html += "<h4>"+ v.data.db_result.temperature + " &#8451; &nbsp;|&nbsp; Wind:&nbsp;"+v.data.db_result.wind+"km/h</h4>";
          batukawan.innerHTML = html;
        }

      });
  }

  getRandomFoodAPI_data(){
    this._APIService.getRandomFoodAPI_data().subscribe(
      v =>{
        v = v["data"]["db_result"]
        this._food_address = v[0]["address"];
        this._food_store_name = v[0]["name"];
        this._food_image = v[0]["image"];
        this._food_rating= v[0]["rating"];
        this._food_price = v[0]["price"];
        this._food_phone = v[0]["phone"];
        var url = "https://maps.google.com/?q=";
        var URI_name = encodeURI(this._food_store_name);
        this._food_qr_code = url + URI_name;
      });    
  }

  getOneQuote_data(){

    this._APIService.getOneQuote_data().subscribe(
      v =>{
          this._quote_content = v.content;
          this._quote_title = v.originator.name;
      });
  }

  getAllNewsAPI_data(){
    this._APIService.getAllNewsAPI_data().subscribe(
      v =>{
        this.news = v.data.db_result;
      });
  }

  getAllForexAPI_data(base){
    this._APIService.getAllForexAPI_data(base).subscribe(
      v =>{
        this.forex[base] = v;
      });
  }

  getCovidAPI_data(){
    this._APIService.getAllCovidAPI_data().subscribe(
      v =>{
        this._covid_total = v.data.db_result.total_active;
        this._covid_recovered = v.data.db_result.total_recovered;
        this._covid_new_case = v.data.db_result.new_case;
        this._covid_icu = v.data.db_result.total_icu;
        this._covid_deaths = v.data.db_result.total_deaths;
        console.log(v);
      });
  }

  getAllFuelAPI_data(){
    this._APIService.getAllFuelAPI_data().subscribe(
      v =>{
        this._fuel_ron95 = v.data.db_result.ron95;
        this._fuel_ron97 = v.data.db_result.ron97;
        this._fuel_diesel = v.data.db_result.diesel;
      });    
  }

  getRandomMemeAPI_data(){
    this._APIService.getRandomMemeAPI_data().subscribe(
      v =>{
        this._meme_url = v.url
      });    
  }

  getAllCryptoAPI_data(){
    this._APIService.getAllCryptoAPI_data().subscribe(
      v =>{
        this._cryptoList = v.data.db_result;
      });    
  }

  getAllGSAPI_data(){
    this._APIService.getAllGSAPI_data().subscribe(
      v =>{
        console.log(v);
        // _gs_4weeks_range:any = "";
        // _gs_weekspricevolatility:any = "";
        // _gs_52weeksrange:any = "";
        // _gs_weeksrangevolatility:any = "";
        // _gs_avgpricetarget:any = "";
        // _gs_pricetarget:any = "";
        this._gs_market_cap = v.data.db_result.marketcap;
        this._gs_nosh = v.data.db_result.nosh;
        this._gs_avg_volume = v.data.db_result.avg_volume;
        this._gs_4weeks_range = v.data.db_result["4weeksrange"];
        this._gs_weekspricevolatility = v.data.db_result.weekspricevolatility;
        this._gs_52weeksrange = v.data.db_result["52weeksrange"];
        this._gs_weeksrangevolatility = v.data.db_result.weeksrangevolatility;
        this._gs_avgpricetarget = v.data.db_result.avgpricetarget;
        this._gs_pricetarget = v.data.db_result.pricetarget;
      });    
  }

  getAllStockAPI_data(){
    this._APIService.getAllStockAPI_data().subscribe(
      v =>{
        this._stockList = v.data.db_result;
      });    
  }

  getAllCareerAPI_data(){
    this._APIService.getAllCareerAPI_data().subscribe(
      v =>{
        console.log(v.data.db_result);
        this._careerList = v.data.db_result;
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


  changePanel(apps){
    this.apps_now = apps;
    if(apps == "forex"){
      this.forexKeyList = [];
      this.current_forex = this.forex[this.forexSelected]["rates"];
      Object.keys(this.current_forex).forEach(k => this.forexKeyList.push(k));
    }
    if(apps == "home"){
      this.getOneQuote_data();
    }
    if(apps == "randomfood"){
      this.randomDone = 0;
    }
    if(apps == "fuel"){
      this.getAllFuelAPI_data();
    }
  }

  changeNews(title,image,i){
    this.changePanel("news");
    this._news_title = title;
    this._news_content = this.news[i]["content"];
    this._news_image = image;
  }

  onChangeForex(event){
    this.forexKeyList = [];
    this.current_forex = this.forex[this.forexSelected]["rates"];
    Object.keys(this.current_forex).forEach(k => this.forexKeyList.push(k));

  }

  changeFood(){
    this.randomDone = 2;
    this.getRandomFoodAPI_data();
    setTimeout(() => { this.randomDone = 1; }, 5000);
  }

  changeMeme(){
    this.getRandomMemeAPI_data();

  }
}

