import { Component, OnInit, Inject, NgZone} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { BlogService } from '../services/blog.service';
import { userService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface DialogData {
  password: string;
  email: string;
  type: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  password: string;
  name: string;
  loggedInUser: any;
  constructor(public dialog: MatDialog, 
    public uservice: userService,
    public blogService: BlogService, 
    public router: Router) { 
      this.uservice.isUserLoggedIn.subscribe(value => {
        if(value){
          this.loggedInUser = localStorage.getItem('name');
        } else {
          this.loggedInUser = '';
        }
    });
    }

  ngOnInit(): void {
    if(localStorage.getItem('name')){
      this.loggedInUser = localStorage.getItem('name');
    }
  }
  
  openDialog(popup): void {
    const dialogRef = this.dialog.open(SignInDialog, {
      width: '250px',
      data: {name: this.name, password: this.password, type: popup}
    });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  signout(){
    this.blogService.signOut().subscribe(res => {
      console.log(res);
      localStorage.clear();
      this.router.navigateByUrl('');
      this.uservice.isUserLoggedIn.next(false);
    })    
  }
}


@Component({
  selector: 'sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInDialog{

  constructor(
    public dialogRef: MatDialogRef<SignInDialog>,
    public blogService: BlogService,
    public uservice: userService,
    public ngZone: NgZone,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  signin(){
    this.blogService.signIn(this.data).subscribe(res => {
      // console.log(res.user);
      localStorage.setItem('id', res.user._id);
      localStorage.setItem('name', res.user.name);
      localStorage.setItem('token', res.token);
      this.uservice.isUserLoggedIn.next(true);
      this.ngZone.run(() => this.dialogRef.close())
      this.router.navigateByUrl('/home');
    })
  }
}
