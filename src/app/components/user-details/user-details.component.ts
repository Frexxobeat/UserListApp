import { Component, inject, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterModule, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
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

