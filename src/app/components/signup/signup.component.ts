import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
  };

  constructor(private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      res => {
        if (res){
          this.router.navigate(['/']);
        }
      }
    );
  }

  onSubmit({value, valid}: {value: User, valid: boolean}){
    if (!valid){
      this.flashMessage.show('Something went wrong, try agian later!!', {
        cssClass: 'ui black message',
        timeout: 3000
      });
    }
    else {
      this.authService.SignUp(value)
      .then(() => {
          this.flashMessage.show('Your account was created successfully', {
            cssClass: 'ui black message',
            timeout: 4000
          });
          this.router.navigate(['/']);
          })
      .catch( (error) => {
        this.flashMessage.show('Something went wrong, try again later', {
          cssClass: 'ui black message',
          timeout: 4000
          });
        console.log(error);
      });
    }
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
  }
}
