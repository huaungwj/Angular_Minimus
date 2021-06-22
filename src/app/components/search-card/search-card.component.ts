import { Component, OnInit,SimpleChange,Input } from '@angular/core';
import {GetWeatherApiService} from '../../services/get-weather-api.service';
import { ModeToggleService} from '../../services/mode-toggle.service';
import { Router } from '@angular/router';
import {FbService} from '../../services/fb/fb.service';
import { StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.less']
})
export class SearchCardComponent implements OnInit {

  // @Input() weatherData:any;
  // 主题标识
  public themeFlag = false;
  //接收add-city的数据
  @Input() searchCard:any;
  @Input() searchFlag:boolean;
  @Input() mateData:any

  public Data:any[]=[

  ];
  constructor(public storage: StorageService,public fb : FbService ,public modetoggle: ModeToggleService, public http: GetWeatherApiService,public router: Router) {
  }

  // 请求数据放这里
  ngOnInit() {
    // console.log(this.weatherData)

    // this.getData()

    // console.log(this.mateData)

  }


  // async getData(){
  //   // this.getWeather.getWeatherData().then(
  //   //     //   (res) => {console.log(res)}
  //   //     // )
  //
  //   let data = await this.http.getWeatherData()
  //   // console.log(data)
  //   // console.log(data['errmsg'])
  //   if (data['errmsg'] == 'city不存在'){
  //
  //   }else{
  //     this.Data = []
  //     this.Data.push(data)
  //
  //   }
  //
  //
  //   console.log(this.Data)
  //
  // }


  ngOnChanges(changes: SimpleChange) {
    if (changes['searchCard']) {
      // this.Data = []
      if (this.searchCard.code == '400') {
        alert('您输入的城市暂无数据')
      } else {
        this.Data = [this.searchCard]

      }
    }
  }

  //查找数组中的重复元素
  deleteEle(arr){
    let newArr = arr;
    for (let i=newArr?.length-1; i>=0; i--)
    {
      let targetNode = newArr[i];
      for (let j=0; j<i; j++)
      {
        if(targetNode == newArr[j]){
          newArr.splice(i,1);
          break;
        }
      }
    }
    return newArr;
  }

  // 添加城市到主页中
  addCity(){

    //将数据保存到云端、
    // console.log(this.searchCard.city)
    // this.fb.addCity(this.searchCard.city).subscribe((res) => {
    //   console.log('成功')
    //   console.log(this.searchCard.city)
    //
    // },(err)=>{
    //   console.log('错误')
    //   console.log(err)
    // });

    let flags = false;

    // console.log(this.searchCard)
    this.http.addCityForHome.filter((item) => {
      if (item.city === this.searchCard.city){
        alert('请勿重复添加')
        flags  = true;
      }
    })
    //将数据保存到localStroages中


    this.http.citys?.push(this.searchCard.city)

    let arr = this.deleteEle(this.http.citys)
    // console.log(arr)
    this.storage.set('citys',arr)

      //判断当前数据与服务的数据是否有重复
    this.http.addCityForHome.push(this.searchCard)

    let flag = this.http.addCityForHome.filter((item) => {

      return item.city != this.searchCard.city

    })


    this.http.addCityForHome = flag
    this.http.addCityForHome.push(this.searchCard)
    // console.log(this.http.addCityForHome)

    // var flag2 = this.http.mateData.filter((item) => {
    //
    //   return item.daily[0].windSpeedNight === this.mateData.daily[0].windSpeedNight
    //
    // })
    if (this.http.addCityForHome.length > this.http.mateData.length){
      this.http.mateData.push(this.mateData)
    }
    // console.log(this.mateData)


    this.router.navigate(['/home'])

    }





  //切换黑暗模式
  ngDoCheck(){
    this.themeFlag = this.modetoggle.flag
    // this.getData()
  }
}
