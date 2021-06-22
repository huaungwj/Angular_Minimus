import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgForm} from '@angular/forms';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { LoginComponent } from './components/login/login.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { AddCardComponent } from './components/add-card/add-card.component';
//引入http模块
import { HttpClientModule } from '@angular/common/http';

//引入切换主题服务
import { ModeToggleService} from './services/mode-toggle.service';
//引入请求天气服务
import { GetWeatherApiService} from './services/get-weather-api.service';
import {SearchCardComponent} from './components/search-card/search-card.component';
import { DetailsComponent } from './components/details/details.component';
//引入AngularFireLite
import {AngularFireLite} from 'angularfire-lite';
import {environment} from '../environments/environment';
import { SignupComponent } from './components/signup/signup.component';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AddCityComponent,
        LoginComponent,
        WeatherCardComponent,
        AddCardComponent,
        SearchCardComponent,
        DetailsComponent,
        SignupComponent
    ],
  imports: [
    //创建并配置具有所有路由器提供程序和指令的模块。可以选择设置应用程序侦听器来执行初始导航。
    BrowserModule.withServerTransition({ appId: 'angularfire-lite-project' }),
    AppRoutingModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    AngularFireLite.forRoot(environment.config),
  ],
  providers: [ModeToggleService,GetWeatherApiService,{
    provide:LocationStrategy,

    useClass:HashLocationStrategy
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
