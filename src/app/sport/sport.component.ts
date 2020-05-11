import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  sportName: string;
  private data: any;
  constructor( 
    private route: ActivatedRoute,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    this.data = this.route.params.subscribe(params => {
      this.sportName = params['name'];
    });
  }

}
