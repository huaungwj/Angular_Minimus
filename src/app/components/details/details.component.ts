import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GetWeatherApiService} from '../../services/get-weather-api.service';
// 引入切换主题服务
import { ModeToggleService} from '../../services/mode-toggle.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  //获取动态路由传过来的值
  public  city: any;
  // 获取到的city的id会保存在这里
  // public  cityID: number;

  public cityData: any = [];
  //保存七天数据
  public mateData:any[] = [];
  public TheamFlag:boolean = false;

  //当前时间戳
  public date0 = (new Date()).getTime();
  public date1 = this.date0  + 1 * 24 * 3600 * 1000;
  public date2 = this.date0 +  2 * 24 * 3600 * 1000;
  public date3 = this.date0 + 3 * 24 * 3600 * 1000;
  public date4 = this.date0  + 4 * 24 * 3600 * 1000;
  public date = new Date().getHours()


  constructor( public router: ActivatedRoute,public http : GetWeatherApiService,public mode:ModeToggleService) { }

  ngOnInit(): void {
    // console.log(this.router.params)
    //获取动态传过来的值
    this.router.params.subscribe(
      (res) => {
        this.city = res.city
        // console.log(this.city)
      }

    )

  //  通过传过来的城市 获取该城市的id
    this.http.getCityID(this.city).then(
      (res:any) => {
        // this.cityID = res.location[0].id
        // console.log(res.location[0].id)
        //  通过城市id获取天气数据

        this.http.getWeatherData(res.location[0].id).then(
          (res:any) =>{
            // console.log(res)
            this.cityData = res
            this.cityData.city = this.city
            // console.log(JSON.parse('{"code":"200","updateTime":"2020-09-20T14:35+08:00","fxLink":"http://hfx.link/3jt1","daily":[{"fxDate":"2020-09-20","sunrise":"06:20","sunset":"18:28","moonrise":"09:02","moonset":"20:52","moonPhase":"峨眉月","tempMax":"30","tempMin":"24","iconDay":"307","textDay":"大雨","iconNight":"306","textNight":"中雨","wind360Day":"0","windDirDay":"北风","windScaleDay":"1-2","windSpeedDay":"3","wind360Night":"0","windDirNight":"北风","windScaleNight":"1-2","windSpeedNight":"3","humidity":"91","precip":"29.6","pressure":"1006","vis":"24","cloud":"77","uvIndex":"2"},{"fxDate":"2020-09-21","sunrise":"06:20","sunset":"18:27","moonrise":"10:06","moonset":"21:38","moonPhase":"峨眉月","tempMax":"31","tempMin":"26","iconDay":"302","textDay":"雷阵雨","iconNight":"302","textNight":"雷阵雨","wind360Day":"0","windDirDay":"北风","windScaleDay":"1-2","windSpeedDay":"3","wind360Night":"0","windDirNight":"北风","windScaleNight":"1-2","windSpeedNight":"3","humidity":"91","precip":"8.2","pressure":"1005","vis":"24","cloud":"61","uvIndex":"7"},{"fxDate":"2020-09-22","sunrise":"06:21","sunset":"18:26","moonrise":"11:11","moonset":"22:27","moonPhase":"峨眉月","tempMax":"31","tempMin":"25","iconDay":"302","textDay":"雷阵雨","iconNight":"302","textNight":"雷阵雨","wind360Day":"0","windDirDay":"北风","windScaleDay":"1-2","windSpeedDay":"3","wind360Night":"0","windDirNight":"北风","windScaleNight":"1-2","windSpeedNight":"3","humidity":"92","precip":"8.1","pressure":"1004","vis":"22","cloud":"61","uvIndex":"3"},{"fxDate":"2020-09-23","sunrise":"06:21","sunset":"18:25","moonrise":"12:14","moonset":"23:20","moonPhase":"峨眉月","tempMax":"32","tempMin":"27","iconDay":"300","textDay":"阵雨","iconNight":"101","textNight":"多云","wind360Day":"0","windDirDay":"北风","windScaleDay":"1-2","windSpeedDay":"3","wind360Night":"0","windDirNight":"北风","windScaleNight":"1-2","windSpeedNight":"3","humidity":"93","precip":"3.8","pressure":"1006","vis":"24","cloud":"64","uvIndex":"4"},{"fxDate":"2020-09-24","sunrise":"06:21","sunset":"18:24","moonrise":"13:15","moonset":"00:00","moonPhase":"上弦月","tempMax":"32","tempMin":"26","iconDay":"300","textDay":"阵雨","iconNight":"101","textNight":"多云","wind360Day":"0","windDirDay":"北风","windScaleDay":"1-2","windSpeedDay":"3","wind360Night":"0","windDirNight":"北风","windScaleNight":"1-2","windSpeedNight":"3","humidity":"88","precip":"1.0","pressure":"1005","vis":"24","cloud":"60","uvIndex":"9"},{"fxDate":"2020-09-25","sunrise":"06:22","sunset":"18:23","moonrise":"14:11","moonset":"00:15","moonPhase":"盈凸月","tempMax":"32","tempMin":"26","iconDay":"300","textDay":"阵雨","iconNight":"101","textNight":"多云","wind360Day":"0","windDirDay":"北风","windScaleDay":"1-2","windSpeedDay":"3","wind360Night":"0","windDirNight":"北风","windScaleNight":"1-2","windSpeedNight":"3","humidity":"91","precip":"1.0","pressure":"1004","vis":"23","cloud":"60","uvIndex":"7"},{"fxDate":"2020-09-26","sunrise":"06:22","sunset":"18:23","moonrise":"15:03","moonset":"01:12","moonPhase":"盈凸月","tempMax":"32","tempMin":"25","iconDay":"305","textDay":"小雨","iconNight":"305","textNight":"小雨","wind360Day":"0","windDirDay":"北风","windScaleDay":"1-2","windSpeedDay":"3","wind360Night":"0","windDirNight":"北风","windScaleNight":"1-2","windSpeedNight":"3","humidity":"92","precip":"5.1","pressure":"1005","vis":"24","cloud":"80","uvIndex":"2"}],"refer":{"sources":["Weather China"],"license":["no commercial use"]}}'))
          }
        )


        //  获取五天后的数据
        this.http.getWeatherDataMate(res.location[0].id).then(
          (res:any) => {
            res.daily.forEach((data)=>{
              if (res.daily.length){
               var datas =  data.fxDate.replace('2020-','')
                // console.log(datas)
                data.fxDate = datas
                // console.log(data)
                this.mateData.push(data)
              }
            })
            this.mateData.length = 5
            // console.log(res)
            // console.log(this.mateData);
          }
        )


      })


  // console.log(this.date)


    console.log(this.date)




  }

  ngDoCheck(){

    this.TheamFlag = this.mode.flag

  }



}
