import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    usernameOrEmail:'',
    password:''
  };

  router = inject(Router);
  http=inject(HttpClient);

  onLogin() {
    this.http.post("http://localhost:8085/auth/login", this.loginObj)
      .subscribe({
        next: (res: any) => {
        //  alert(JSON.stringify(res));  // Stringify to prevent object display issues
          
          if (!res.result) {
            alert("Login successful!");
            localStorage.setItem("AccessToken", res.accessToken);
            this.router.navigateByUrl('dashboard');
          } else {
            alert(res.message || "Wrong credentials.");
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          alert("An error occurred. Please try again later.");
        }
      });
  }
}


