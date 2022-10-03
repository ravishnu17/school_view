import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubServiceService } from 'src/app/Service/sub-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  changeForm!:FormGroup;
  data :any;
  name:any[0];
  count=0;
  constructor(private fb:FormBuilder , private service : SubServiceService , private route : Router) { }
  step=0;
  ngOnInit(): void {

    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Please Login again. Login Again!",'info');
      this.route.navigate(['/login']);
    }

    this.service.getUsers().subscribe((data:any)=>{
      
      for (let val of data){
        if(val.role ==1){
          data[this.count]['role']="Admin";
        }else{
          data[this.count]['role']="User"
        }
        this.count +=1;
      }
      this.data = data;
    },error=>{
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['/login']);
    });

    this.changeForm = this.fb.group({
      username:[''],
      role:['']
    });
  }

  next(){
    this.step +=1;
  }

  previous(){
    this.step-=1;
  }

  change(){
    console.log(this.changeForm.value);
    this.service.changeRole(this.changeForm.value).subscribe((arg:any) =>{
      this.data = arg;
      alert(this.data.status);
      location.reload();
    });
  }

  exit(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }
  
  delete(id:any,name:any){
    console.log(id);
    Swal.fire({
      title:'Click ok to confirm',
      text:'Are you sure to delete the user -'+name,
      icon:'question',
      showCancelButton:true,
      cancelButtonColor:'green',
      confirmButtonColor:'red'
      
    }).then((result) =>{
      if(result.isConfirmed){
        this.service.remove(id).subscribe(data=>{
          Swal.fire("Deleted successfully","","success");
          location.reload();
        });
      }
    });

  }
  register(){
    this.route.navigate(['/register',{'action':true}]);
  }


}