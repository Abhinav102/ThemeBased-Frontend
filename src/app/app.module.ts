import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SportComponent } from './sport/sport.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInDialog } from './header/header.component';

import { BlogService } from './services/blog.service';
import { userService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SportComponent,
    HomeComponent,
    UserComponent,
    SignInDialog
  ],
  imports: [
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  entryComponents: [
    SignInDialog
  ],
  providers: [
    BlogService,
    userService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
