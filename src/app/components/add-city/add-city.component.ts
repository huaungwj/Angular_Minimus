import { Component, OnInit , ViewChild } from '@angular/core';
//引入请求组件
import { GetWeatherApiService} from '../../services/get-weather-api.service';
//引入天气卡片组件
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.less']
})
export class AddCityComponent implements OnInit {

  //发送数据给search-card
  public searchCard:any;
  public searchFlag:boolean = false;
  //发送三天内的数据
  public mateData:any;

  //定义一条最佳居住城市的数据
  public goodCity:any[] = []

  //城市数据
  public cityList:any[] = []

  //获取dom
  // @ViewChild('searchContent') searchContent: any

  constructor(public http: GetWeatherApiService,public https: HttpClient) { }

  ngOnInit(): void {
    // 默认热门城市
    let city;
    // this.http.city = '阳江'
    this.http.getCityID('阳江').then(
      (res) => {
        // console.log(res)
        // @ts-ignore
        city = res.location[0].name;
        // console.log(city) // 阳江
        // @ts-ignore
        this.http.getWeatherData(res.location[0].id).then(
          (res) => {
            this.goodCity.push(res)
            // console.log(res)
            this.goodCity[0].city = city
          }
        )
      }
    )

  //  默认搜索列表十条数据
    new Promise( (resolve,reject) =>{
      this.https.get('https://geoapi.heweather.net/v2/city/top?key=27760125f4f1448faa7ec3cf16dbce45&number=5&range')
        .subscribe(
          (res)=> {resolve(res)}
        )
    }).then(
      (res:any) =>{
        res.topCityList.forEach((city:any) =>{
          if (res.topCityList.length) {
            this.cityList.push(city.name);
            // console.log(this.cityList)
          }
        })
      }
    )

  // this.getCityList()

  }

  //发送请求获取城市列表
  getCityList(){
    let citys = []
    let input:HTMLInputElement = document.querySelector('.search-city-input')
    return new Promise((resolve,reject)=>{
      this.https.get(`https://geoapi.heweather.net/v2/city/lookup?key=27760125f4f1448faa7ec3cf16dbce45&location=${input!.value}`)
        .subscribe(
          (res:any) => {
              resolve(res)
          }
        )
    }).then(
      (res:any) =>{

        res.location.forEach((city:any) =>{
          if (res.location.length) {

            citys.push(city.name)
            this.cityList = citys
            // console.log(this.cityList)
          }
        })
        // console.log(res) // 可以获取
      }
    )
  }

  // 显示搜索内容
  showItem(e){
  //  获取城市盒子
  //   let searchContent = document.querySelector('.search-content')
    let input:HTMLInputElement = document.querySelector('.search-city-input')

    if (input!.value != ''){
      input!.value = ''
    }
    //搜索框
    let searchContent:HTMLElement = document.querySelector('.search-content')

    // console.log(searchContent)
    searchContent!.style.display = 'inline-block'

    // console.log(this.searchContent.nativeElement)

    // console.log(e.target)


  }

  // 隐藏搜索内容
  async hiddenItem(e)      {
    //搜索框
    let searchContent: HTMLElement = document.querySelector('.search-content')
    let input:HTMLInputElement = document.querySelector('.search-city-input')


    // console.log(e.type === 'blur' )
    if (e.keyCode === 27){
      searchContent!.style.display = 'none'
    }

    if (e.type === 'blur' ){
      setTimeout(()=> {
        searchContent!.style.display = 'none'
        // console.log(searchContentUl)
      },150)
    }

    if (e.keyCode == 13){
      // console.log(input.value) //阳江
      // this.http.city = input.value
      //获取输入的值发送给给请求数据
      let cityname = await this.http.getCityID(input.value)
      // @ts-ignore
      let data =   await this.http.getWeatherData(cityname.location[0].id)
      // @ts-ignore
      let mateData = await this.http.getWeatherDataMate(cityname.location[0].id)
      // @ts-ignore
      data.city = cityname.location[0].name
      // @ts-ignore
      mateData.city =  cityname.location[0].name


      // console.log(data)
      this.searchCard = data
      // console.log(this.searchCard)
      this.searchFlag = true;
      //  给外层的mateData数据
      this.mateData = mateData
      // console.log(mateData)

    //  搜索完成失去焦点
      input.blur();


    }




  }

  async getLiValue(e){

    let input:HTMLInputElement = document.querySelector('.search-city-input')

    // event.preventDefault()
    // console.log(e.target.innerText)
    input!.value = e.target.innerText
    // 根据输入的城市发送请求
    // this.http.city = `${input!.value}`
    let cityname = await this.http.getCityID(input.value)
    // @ts-ignore
    let data =   await this.http.getWeatherData(cityname.location[0].id)
    // 预计3天天气
    // @ts-ignore
    let mateData = await this.http.getWeatherDataMate(cityname.location[0].id)
    // @ts-ignore
    data.city = cityname.location[0].name
    // @ts-ignore
    mateData.city =  cityname.location[0].name


    // console.log(data)
        this.searchCard = data
        // console.log(this.searchCard)
        this.searchFlag = true;
  //  给外层的mateData数据
    this.mateData = mateData

  //  获取放卡片的div

    // body.innerHTML = '<app-weather-card></app-weather-card>'


  }

  async getInputVlaue(e){

    let searchContent: HTMLElement = document.querySelector('.search-content')

    let input:HTMLInputElement = document.querySelector('.search-city-input')
    // console.log(input.value) //阳江
    // this.http.city = input.value

    let cityname = await this.http.getCityID(input.value)
    // @ts-ignore
    let data =   await this.http.getWeatherData(cityname.location[0].id)
    // @ts-ignore
    data.city = cityname.location[0].name
    // @ts-ignore
    let mateData = await this.http.getWeatherDataMate(cityname.location[0].id)
    // @ts-ignore
    mateData.city =  cityname.location[0].name


    // console.log(data)
    this.searchCard = data
    // console.log(this.searchCard)
    this.searchFlag = true;
    //发送
    this.mateData = mateData




  }


  async keyUpInputVlaue(e){
  // console.log(e)

    if (e.keyCode == 13){
      let input:HTMLInputElement = document.querySelector('.search-city-input')
      let cityname = await this.http.getCityID(input.value)
      // @ts-ignore
      let data =   await this.http.getWeatherData(cityname.location[0].id)
      // @ts-ignore
      let mateData = await this.http.getWeatherDataMate(cityname.location[0].id)
      // @ts-ignore
      data.city = cityname.location[0].name
      // @ts-ignore
      mateData.city =  cityname.location[0].name


      // console.log(data)
      this.searchCard = data
      // console.log(this.searchCard)
      this.searchFlag = true;
      //  给外层的mateData数据
      this.mateData = mateData
      // console.log(mateData)

    //  按下键盘enter键收起软键盘
      e.preventDefault()

      input.blur();

    }

  }

}
