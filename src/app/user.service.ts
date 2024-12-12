import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'https://reqres.in/api/users';
  private userList: User[] = [];
  currentPage = 1;
  itemsPerPage = 6
  totalItems = 0
  totalPages = 0
  loading = false

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    this.loading = true;
    const url = `${this.baseUrl}?page=${this.currentPage}&per_page=${this.itemsPerPage}`;
    return this.httpClient.get<any>(url).pipe(
      tap((response) => {
        this.userList = response.data;
        this.totalItems = response.total;
        this.totalPages = response.total_pages;
        this.loading = false;
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
        return throwError(() => new Error('Error fetching users'));
      })
    );
  }
  getUser(id: number): Observable<User> {
    const cachedUser = this.userList.find((user) => user.id === id);
    if (cachedUser) {
      return of(cachedUser);
    } else {
      return this.httpClient.get<any>(`${this.baseUrl}/${id}`).pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error(`Error fetching user with id ${id}:`, error);
          return throwError(() => new Error(`Error fetching user with id ${id}`));
          })
      )
    }
  }
  

  onPageChange(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return; // Guard against invalid page changes
    this.currentPage = newPage;
    this.getUsers();
  }


}
