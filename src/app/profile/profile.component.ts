import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private userservice: UserService){

  }

  getUsername():string{ //gets the username
    return this.userservice.getUsername();
  }

  getEmail():string{ // gets the user
    return this.userservice.getEmail();
  }
}
