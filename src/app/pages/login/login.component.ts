declare var google: any;

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {

    //OAuth 2.0, current version of OAuth protocol, which is designed to allow third-party applications(your web appli.) access to a user's resources without exposing their credentials

    google.accounts.id.initialize({
      client_id: '1047225567452-5f5jr7mgf7i2nq14frpos92bjjf9jgqd.apps.googleusercontent.com',
      callback: (resp: any) => {
        console.log(resp);
        this.handleLogin(resp);
      }
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 300,
      length: 'small'
    })
  }
  private decodeToken(token: string) {
    // The atob() function in JavaScript is used to decode a string of data which has been encoded using Base64 encoding. 
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleLogin(response: any) {
    if (response) {
      //decode the token
      const payload = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      //navigate to home/browse
      this.router.navigate(['browse']);
    }

  }

}
