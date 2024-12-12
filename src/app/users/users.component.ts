import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  
  selectedId?: number;
  loading = false;
  error = '';

  

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedId = Number(params.get('id'));
      this.fetchUsers();
    });
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getUsers()
      users => {
        this.users = getuser;
        this.loading = false;
      },
      error => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    );
  }
}
