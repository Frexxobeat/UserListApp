import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';
import { map } from 'rxjs';
import { User } from './user';


@Injectable({providedIn: 'root'})
export class UserService {


readonly baseUrl = "https://reqres.in/api/users"

protected userList: User[] = [];
  constructor(private httpClient: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.httpClient.get<{ data: User[] }>(this.baseUrl).pipe( //Gets users from API
      map(response => response.data),            // Extracts the data as API doesn't match requirement
      tap(users => (this.userList = users))      // Store the data in the userList array 
    );
  }

  getUser(id: number): Observable<User> {
    const user = this.userList.find(user => user.id === id); // Find user in the array
    return user ? of(user) : throwError(() => new Error(`User with ID ${id} not found`));
  }

}
