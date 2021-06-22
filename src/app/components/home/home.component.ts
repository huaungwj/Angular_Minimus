import { Component, OnInit , ViewChild} from '@angular/core';
//引入服务
import {GetWeatherApiService} from '../../services/get-weather-api.service';
import {FbService} from '../../services/fb/fb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild('slideMenuDark') slideMenuDark: any

  // public weatherData:any[] = [
  //   JSON.parse('{"cityid":"101281801","date":"2020-09-17","week":"星期四","update_time":"08:08","city":"阳江","cityEn":"yangjiang","country":"中国","countryEn":"China","wea":"多云","wea_img":"yun","tem":"26","tem1":"32","tem2":"25","win":"东北风","win_speed":"3级","win_meter":"小于12km/h","humidity":"96%","visibility":"23.97km","pressure":"996","air":"36","air_pm25":"16","air_level":"优","air_tips":"空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！","alarm":{"alarm_type":"台风","alarm_level":"白色","alarm_content":"阳江市气象台于09月16日10时51分发布阳江市辖区、阳东区台风白色预警信号，请注意防御。（预警信息来源：国家预警信息发布中心）"},"aqi":{"update_time":"07:24","cityid":"101281801","city":"阳江","cityEn":"yangjiang","country":"中国","countryEn":"China","air":"36","air_level":"优","air_tips":"空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！","pm25":"16","pm25_desc":"优","pm10":"36","pm10_desc":"优","o3":"4","o3_desc":"优","no2":"29","no2_desc":"优","so2":"12","so2_desc":"优","co":"1","co_desc":"优","kouzhao":"不用佩戴口罩","yundong":"非常适宜运动","waichu":"适宜外出","kaichuang":"适宜开窗","jinghuaqi":"关闭净化器"}}'),
  //   JSON.parse('{\"cityid\":\"101281001\",\"date\":\"2020-09-17\",\"week\":\"星期四\",\"update_time\":\"08:18\",\"city\":\"湛江\",\"cityEn\":\"zhanjiang\",\"country\":\"中国\",\"countryEn\":\"China\",\"wea\":\"阴\",\"wea_img\":\"yin\",\"tem\":\"28\",\"tem1\":\"32\",\"tem2\":\"25\",\"win\":\"北风\",\"win_speed\":\"2级\",\"win_meter\":\"小于12km/h\",\"humidity\":\"90%\",\"visibility\":\"暂缺\",\"pressure\":\"1000\",\"air\":\"16\",\"air_pm25\":\"8\",\"air_level\":\"优\",\"air_tips\":\"空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！\",\"alarm\":{\"alarm_type\":\"\",\"alarm_level\":\"\",\"alarm_content\":\"\"},\"aqi\":{\"update_time\":\"07:21\",\"cityid\":\"101281001\",\"city\":\"湛江\",\"cityEn\":\"zhanjiang\",\"country\":\"中国\",\"countryEn\":\"China\",\"air\":\"16\",\"air_level\":\"优\",\"air_tips\":\"空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！\",\"pm25\":\"8\",\"pm25_desc\":\"优\",\"pm10\":\"16\",\"pm10_desc\":\"优\",\"o3\":\"17\",\"o3_desc\":\"优\",\"no2\":\"8\",\"no2_desc\":\"优\",\"so2\":\"6\",\"so2_desc\":\"优\",\"co\":\"1\",\"co_desc\":\"优\",\"kouzhao\":\"不用佩戴口罩\",\"yundong\":\"非常适宜运动\",\"waichu\":\"适宜外出\",\"kaichuang\":\"适宜开窗\",\"jinghuaqi\":\"关闭净化器\"}}'),
  //   JSON.parse('{"cityid":"101280803","date":"2020-09-17","week":"星期四","update_time":"08:07","city":"南海","cityEn":"nanhai","country":"中国","countryEn":"China","wea":"多云","wea_img":"yun","tem":"26","tem1":"33","tem2":"25","win":"北风","win_speed":"2级","win_meter":"小于12km/h","humidity":"95%","visibility":"7.88km","pressure":"1004","air":"53","air_pm25":"27","air_level":"良","air_tips":"空气好，可以外出活动，除极少数对污染物特别敏感的人群以外，对公众没有危害！","alarm":{"alarm_type":"","alarm_level":"","alarm_content":""},"aqi":{"update_time":"08:39","cityid":"101280803","city":"南海","cityEn":"nanhai","country":"中国","countryEn":"China","air":"53","air_level":"良","air_tips":"空气好，可以外出活动，除极少数对污染物特别敏感的人群以外，对公众没有危害！","pm25":"27","pm25_desc":"优","pm10":"56","pm10_desc":"良","o3":"4","o3_desc":"优","no2":"39","no2_desc":"优","so2":"8","so2_desc":"优","co":"2","co_desc":"优","kouzhao":"不用佩戴口罩","yundong":"适宜运动","waichu":"适宜外出","kaichuang":"适宜开窗","jinghuaqi":"关闭净化器"}}')
  // ]

  constructor(public getWeather: GetWeatherApiService,public fb: FbService) {

  }

  public cities: any;
  ngOnInit(): void {
    this.fb.getCities()
    this.cities = this.fb.getCities();
    // console.log(this.cities)
    // this.getData()
  }

  // async getData(){
  //   // this.getWeather.getWeatherData().then(
  //   //   (res) => {console.log(res)}
  //   // )
  //
  //   let data = await this.getWeather.getWeatherData()
  //   // console.log(data)
  //   this.weatherData.push(data)
  //   console.log(this.weatherData)
  //
  // }


}
