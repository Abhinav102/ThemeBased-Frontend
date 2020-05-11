import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allPosts: any[];
  form: FormGroup;
  commenticon = false;
  currentCommentIndex:any;
  commentValue: any;
  constructor(
    public blogService: BlogService,
    public fb: FormBuilder,
    public router: Router
  ) {
    this.form = this.fb.group({
      title: [''],
      desc: ['']
    })
   }

  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.getposts();
    } else {
      this.router.navigateByUrl('');
    }
  }

  getposts(){
    this.blogService.getPost().subscribe(res => {
      console.log(res.posts);
      this.allPosts = res.posts;
    })
  }
  
  sendpost(){
    let data = {
      title: this.form.get('title').value,
      body: this.form.get('desc').value
    }
      this.blogService.sendPost(data, localStorage.getItem('id')).subscribe(res => {
      this.getposts();
      this.form.reset();
    })
  }

  toggleicon(index){
    if(this.currentCommentIndex != index){
      this.commenticon = false;
    }
    this.currentCommentIndex = index;
    this.commenticon = !this.commenticon; 
  }

  sendcomment(postId){
    let data = {
      comment: this.commentValue,
      postId: postId,
      userId: localStorage.getItem('name')
    }
    this.blogService.sendComment(data).subscribe(res => {
      // console.log(res);
      this.getposts();
      this.commentValue = '';
    })
  }
  
}
