import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SubServiceService } from 'src/app/Service/sub-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  data: any;
  type: any;
  name : any;
  page:any = 'DashBoard';
  constructor(private observer:BreakpointObserver ,private subservice:SubServiceService , private route:Router) { }
 
  ngOnInit(): void {
    this.subservice.getUser().subscribe(
      next =>{         
      this.data = next;
      this.type = this.data.role ;
      this.name = this.data.name ;      
    },
      error =>{
      this.route.navigate(['/login']);
    });
    
    
    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['/login']);
    }

    if (window.location.href.endsWith('schoolProfile')){
      this.page='School Profile';
    }else if(window.location.href.endsWith('profile')){
      this.page='User Profile';
    }else if (window.location.href.endsWith('home')){
      this.page = 'DashBoard';
    }
  }
  // menu action
  path(path:any , page:any){
    if(page ==''){
      localStorage.clear();
    }
    if (this.sidenav.mode == 'over'){
      this.sidenav.close();
    }
    this.page=page;
    this.route.navigate([path]);
  }
  ngAfterViewInit(){
    this.observer.observe(['(max-width:900px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{
        this.sidenav.mode ='side';
        if(this.sidenav.opened){
          //do nothing;
        }else{
          this.sidenav.open()
        }
      }
    });
  }


}
