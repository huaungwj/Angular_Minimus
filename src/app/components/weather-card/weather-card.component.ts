import { Component, OnInit,Input,EventEmitter,OnChanges,SimpleChange } from '@angular/core';
import { ModeToggleService} from '../../services/mode-toggle.service';
import {AddCardComponent} from '../add-card/add-card.component';
import {GetWeatherApiService} from '../../services/get-weather-api.service';
import { StorageService} from '../../services/storage.service';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.less']
})
export class WeatherCardComponent implements OnInit {

  public cityId:number;

  // @Input() weatherData:any;
  // 主题标识
  public themeFlag = false;
  // 天气图标值
  public condition:any

  public Data:any[]=[];

  public mateData:any = []
  constructor(public storage: StorageService,public modetoggle: ModeToggleService, public http: GetWeatherApiService) {
  }

  // 请求数据放这里
   ngOnInit() {
    // console.log(this.weatherData)

   // this.getData()
// console.log(this.http.addCityForHome)
     // console.log(this.Data)
     // console.log( this.storage.get('citys'))
     let citys = this.storage.get('citys')
     this.http.citys = citys
     // console.log(this.http.citys.length)
     this.http.citys?.forEach((item)=>{
         if(this.http.citys.length){
           // console.log(item)
           this.http.getCityID(item).then((res:any)=>{
             this.cityId = res.location[0].id;
             this.http.getWeatherData(this.cityId).then( (res) =>{
               //先定义一个data保存当前的数据
               let data = []
               data.push(res)
               data.forEach((city:any)=>{
                 city.city = item
               })
               // console.log(data)
               this.http.getWeatherDataMate(this.cityId).then((res:any)=>{
                 // console.log(res.daily[0].tempMax)
                 data.forEach((city:any)=>{
                   city.now.tempMax = res.daily[0].tempMax
                   city.now.tempMin = res.daily[0].tempMin

                   // console.log(data)
                   data.forEach((data:any)=>{
                     this.Data.push(data)
                   })

                   // console.log(this.Data)
                 })
               })
             })
           })
         }
       })
      setTimeout(()=>{
        // console.log(this.Data)
      },3000)
   }




  // async getData(){
  //   // this.getWeather.getWeatherData().then(
  //   //     //   (res) => {console.log(res)}
  //   //     // )
  //
  //   // let data = await this.http.getWeatherData()
  //   // console.log(data)
  //   // console.log(data['errmsg'])
  //   if (data['errmsg'] == 'city不存在'){
  //
  //   }else{
  //     this.Data.push(data)
  //
  //   }
  //
  //
  //   console.log(this.Data)
  //
  // }



  ngOnChanges(changes: SimpleChange){

  }



  //切换黑暗模式
  ngDoCheck(){
    this.themeFlag = this.modetoggle.flag

    this.mateData = this.http.mateData
    // console.log(this.http.mateData.length)
    // console.log(this.mateData)
    // console.log(this.Data)




  }

}
