import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule, MatTooltipModule, 
  MatSliderModule, MatIconModule, MatInputModule, 
  MatFormFieldModule, MatButtonModule, MatNativeDateModule, MatCardModule, MatSelectModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddComponent } from './add/add.component';
import { ProfileComponent } from './profile/profile.component';

const routes:Routes=[
  { path: '', component: HomeComponent },
  { path: 'sign-in-user', component: LoginComponent },
  { path: 'sign-up-user', component: RegisterComponent },
  { path: 'add-todo', component: AddComponent },
  { path: 'user-profile', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    AddComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    MatBadgeModule, MatTooltipModule, 
    MatSliderModule, MatIconModule, MatInputModule, 
    MatFormFieldModule, MatButtonModule, MatNativeDateModule,
    MatToolbarModule, MatDatepickerModule, MatMenuModule,
    MatButtonToggleModule, MatCardModule, MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
