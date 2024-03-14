import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../interface/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  suscription: Subscription | null = null;

  errores: string = '';

  user: User = {
    id: '',
    username: '',
    password: '',
    email: '',
    role: '',
  }

  users: User[] | null = null;

  constructor(private router: Router,
    private userService: UserService,
  ) { }


  ngOnDestroy(): void { // unsuscribes from the server
    this.suscription?.unsubscribe();
  }

  checkUser() { // checks if the ueser exist in the database
    this.suscription = this.userService.getUser(this.user.username).subscribe({
      next: response => {
        if (this.user.username == response.username) {
          this.user = response
          this.userService.storeSession(this.user);
          this.router.navigate(['welcome']);

        }
      },
      error: err => console.error(err),
      complete: () => console.log('Plat obtingut')
    });
  }


}
