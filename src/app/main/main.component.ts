import { Component, ElementRef, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeMusicPlayerService } from 'youtube-music-player';
import * as cocoSSD from '@tensorflow-models/coco-ssd';
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

  
  apps_now:any = "home";
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

  _gs_price:any = "";
  _gs_dayshigh:any = "";
  _gs_dayslow:any = "";
  _gs_weekshigh:any = "";
  _gs_weekslow:any = "";
  _gs_valuetraded:any = "";
  _gs_volumetraded:any = "";


  _stockList:any = [];

  _careerList:any = [];
  

  private video: HTMLVideoElement;

  constructor(private _APIService: APIService,private _elementRef:ElementRef, protected _sanitizer: DomSanitizer,private ympService : YoutubeMusicPlayerService) { }

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
    // this.getAllForexAPI_data("EUR");
    // this.getAllForexAPI_data("GBP");
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

    setInterval(() => { 
      var iframe = document.getElementById("facemask-iframe");
      //@ts-ignore
      var _words = iframe.contentWindow.document.getElementById("remind");
      console.log(_words);
    }, 4000);
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
        console.log(v);
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
  // board: "Board\nMain Market"
  // change_rm: "0.060"
  // changepercentage: "1.00%"
  // dayshigh: "6.030"
  // dayslow: "5.920"
  // marketcapital: "7,436,880,000"
  // noofsharedissued: "1,252,000,000"
  // open: "6.030"
  // previousclose: "6.000"
  // price: "5.940"
  // sector: "Technology"
  // shareperlot: "100"
  // shariah: "Yes"
  // stockcode: "GREATEC - 0208"
  // valuetraded: "6,522,805"
  // volumetraded: "1,095,800"
  // weekshigh: "9.900"
  // weekslow: "2.250"
  getAllGSAPI_data(){
    this._APIService.getAllGSAPI_data().subscribe(
      v =>{
        console.log(v);
        this._gs_price = v.data.db_result.price;
        this._gs_dayshigh = v.data.db_result.dayshigh;
        this._gs_dayslow = v.data.db_result.dayslow;
        this._gs_weekshigh = v.data.db_result.weekshigh;
        this._gs_weekslow = v.data.db_result.weekslow;
        this._gs_valuetraded = v.data.db_result.valuetraded;
        this._gs_volumetraded= v.data.db_result.volumetraded;
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

  public async predictWithCocoModel(){
    const model = await cocoSSD.load();
    this.detectFrame(this.video,model);
    console.log('model loaded');
  }
  
    webcam_init()
    {  
      this.video = <HTMLVideoElement> document.getElementById("vid");
    
       navigator.mediaDevices
      .getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
      }
       })
      .then(stream => {
      this.video.srcObject = stream;
      this.video.onloadedmetadata = () => {
        this.video.play();
      };
      });
    }
    
    detectFrame = (video, model) => {
      console.log(video)
      model.detect(video).then(predictions => {
        this.renderPredictions(predictions);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
      });
    }
  
    renderPredictions = predictions => {
      const canvas = <HTMLCanvasElement> document.getElementById("canvas");
      
      const ctx = canvas.getContext("2d");
      
      canvas.width  = 300;
      canvas.height = 300;
  
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Font options.
      const font = "16px sans-serif";
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.drawImage(this.video,0, 0,300,300);
  
      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });
  
      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
      });
    };
  
  
}

