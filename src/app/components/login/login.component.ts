import {Component, OnInit} from '@angular/core';
import {FbService} from '../../services/fb/fb.service';
import {first, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(public fb: FbService, public router: Router) {
  }

  ngOnInit() {
  }

  login(e) {
    this.fb.signin(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      console.log('成功')

      this.router.navigateByUrl('');
    },(err) => {
      alert('请求超时');
      this.errorMessage = err;
      if (this.errorMessage){
        alert(this.errorMessage)
      }
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

}
