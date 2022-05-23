import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  };

  constructor(private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  onSubmit({value, valid}: {value: User, valid: boolean}){
    if (!valid) {
      this.flashMessage.show('Something went wrong, try agian later', {
        cssClass: 'ui black message',
        timeout: 4000
      });
    } else {
      this.authService.Login(value)
        .then(() => {
          this.flashMessage.show('You have successfullu logged in', {
            cssClass: 'ui black message',
            timeout: 4000
          });
          this.router.navigate(['/']);
          })
        .catch((error) => {
          this.flashMessage.show('Something went wrong, try agian later', {
            cssClass: 'ui black message',
            timeout: 4000
          });
          console.log(error);
        });
    }
    this.user.email = '';
    this.user.password = '';
  }
}
