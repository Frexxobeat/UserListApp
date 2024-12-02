import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    
    { path: 'users', component: UsersComponent, title: 'User List' },
    {path: 'home', component: HomeComponent, title: 'Home Page'},
    { path: 'user-details/:id', component: UserDetailsComponent, title: 'User Details'},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]