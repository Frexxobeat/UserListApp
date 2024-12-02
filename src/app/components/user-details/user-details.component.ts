import { Component, inject, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';
import { User } from '../../user';


@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
loading = true
error = ""


  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  user: User | undefined;

  constructor() {
    const userId = Number(this.route.snapshot.params["id"])
    this.userService.getUser(userId).subscribe({
      next: user => (this.user = user, this.loading = false),
      error: err => {
        this.error = `Error fetching user: ${err.message}`
        console.error(`Error fetching user: ${err.message}`)
        this.loading = false
      }
    });
  }
}

