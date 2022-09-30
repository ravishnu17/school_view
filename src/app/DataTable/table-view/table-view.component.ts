import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/Service/main-service.service';
import { SubServiceService } from 'src/app/Service/sub-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  data:any;
  constructor(private main: MainServiceService , private subService:SubServiceService , private rout:Router) { }

  ngOnInit(): void {
    
    this.main.get('/SchoolProfileData').subscribe((response:any)=>{
      this.data = response;
      
    });
  }

  add(){
    this.rout.navigate(['/modify']);
  }

  remove(id:any){
    console.log(id);
    Swal.fire({
      title:"Please confirm",
      text:'Are you sure to delete ?',
      icon:'warning',
      showCancelButton:true,
      cancelButtonColor:'green',
      confirmButtonColor:'red',
      confirmButtonText:'Yes'
    }).then((result) =>{
      if(result.isConfirmed){
        this.subService.deleteSchoolProfile(id).subscribe((data:any)=>{
          Swal.fire("Deleted successfully","","success");
          location.reload();
        });
      }
    });
    
  }

  edit(id:any){
    this.rout.navigate(['/modify',{'id':id}]);
  }

  viewAll(){

  }

}
