import { Injectable } from '@angular/core';
//引入http请求模块
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetWeatherApiService {
  // 创建一个已经添加到home的城市数组
  public addCityForHome: any[] = [];
  public mateData: any[] = [];
  //请求的api域名
  // 请求天气api域名
  public domain: string =
    'https://devapi.heweather.net/v7/weather/now?key=27760125f4f1448faa7ec3cf16dbce45';
  // 请求天气的id
  public getId: number;
  // 查找城市id api
  public CityIdMain =
    'https://geoapi.heweather.net/v2/city/lookup?&key=27760125f4f1448faa7ec3cf16dbce45&location=';
  // 获取预计三天的数据
  public weaterData3: string =
    'https://devapi.heweather.net/v7/weather/7d?key=27760125f4f1448faa7ec3cf16dbce45';
  // public city:String;
  public citys: any[] = [];

  constructor(public http: HttpClient) {}
  //发送请求
  getWeatherData(location: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.domain}&location=${location}`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getCityID(city: String) {
    return new Promise((resolve, reject) => {
      this.http.get(this.CityIdMain + city).subscribe((res) => {
        resolve(res);
      });
    });
  }
  // 获取3天的数据
  getWeatherDataMate(location: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.weaterData3}&location=${location}`)
        .subscribe((res) => {
          resolve(res);
        });
    });
  }
}
