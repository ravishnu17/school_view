import { Component, OnInit } from '@angular/core';
import { SubServiceService } from 'src/app/Service/sub-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name:any;

  constructor(private subService:SubServiceService) { }

  ngOnInit(): void {
    this.subService.getUser().subscribe((data:any)=>{
      this.name = data.name;
    });
  }

}
