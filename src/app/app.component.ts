import { Component , ViewChild,ApplicationRef,Injector,ComponentFactoryResolver,ReflectiveInjector,ComponentRef} from '@angular/core';
// 引入mode-toggle.service
import {ModeToggleService} from './services/mode-toggle.service';
import {FbService} from './services/fb/fb.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Minimus';
  //创建一个事件对象
  public date = new Date()
  userEmail = '';
  public url;

  // 侧边栏标识器
  public flags:boolean = false; /*true是关闭状态*/

  //主题切换标识器
  public themeFlags:boolean = false; // true标识白天状态

  // 获取Dom
  // 侧边栏 下部
  @ViewChild('slideMenuDark') slideMenuDark: any
  //页面导航
  @ViewChild('mainHeaderDark') mainHeaderDark: any
  //页面按钮
  @ViewChild('modeToggleBgChecked') modeToggleBgChecked: any
  // 圆点按钮
  @ViewChild('modeToggleCircleChecked') modeToggleCircleChecked: any
  //main页面的背景
  @ViewChild('mainContainerDark') mainContainerDark: any
  //侧边栏 头部
  @ViewChild('menuHeaderDark') menuHeaderDark: any

  constructor(
    public modeToggle: ModeToggleService,
    public fb: FbService,
    public router: Router,
    public componentFactoryResolver : ComponentFactoryResolver,
    public injector :Injector,
    public applicationRef : ApplicationRef
  ) {
      // console.log(modeToggle)
    setInterval(() =>{
      this.date = new Date()
    },1000)
    }


  loggedIn = this.fb.isAuth();
  sub1;


  ngOnInit (){
    this.fb.auth.userData().subscribe((user) => {
      this.userEmail = user.email;
    });
    // this.url = location.hash.slice(1)
    // console.log(this.url)

  }

  showAside(e) {

    //原生js获取dom节点
    let asideDom = document.querySelector('aside')
    let mainContainer = document.querySelector('.main-container')
    let slideMenu = document.querySelector('.slide-menu')
    let asideBg = document.querySelector('.aside_bg')

    // console.log(e)

    // @ts-ignore

    if (this.flags) {
      asideDom.style.transform = 'translate(-100%,0)'
      this.flags = !this.flags
    } else {
      asideDom.style.transform = 'translate(0,0)'
      this.flags = !this.flags
    }
    // console.log(this.router.url)
  }

  //  主题切换
  modeToggleSwitch() {
    this.slideMenuDark.navElement

    // this.themeFlags  = !this.themeFlags
    //
    // console.log(this.themeFlags)

    this.modeToggle.toggleDark()
    this.themeFlags = this.modeToggle.flag

  }
  logout() {
    this.router.navigateByUrl('/login');
    this.fb.auth.signout();
    this.flags = false;
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
    console.log('app组件销毁了')
  }




}
