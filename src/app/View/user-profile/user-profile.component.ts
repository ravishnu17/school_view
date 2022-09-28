import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubServiceService } from 'src/app/Service/sub-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  data :any;
  profileForm! :FormGroup;
  role!: string;
  step!:number;
  pwd :any;
  del : any;
  status !:number;
  fieldType = false;

  constructor(private subService : SubServiceService, private fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['/login']);
    }

    this.subService.userProfile().subscribe((arg:any) =>{

      this.profileForm.patchValue(arg);

      if(arg.role == 0){
        this.role = "User";
      }
      else if (arg.role == 1){
        this.role ="Admin"
      }
      
    },error =>{
      this.route.navigate(['/login'])
    });

    this.profileForm=this.fb.group({
      name:[''],
      dob:[''],
      gender:[''],
      mobile:['',[Validators.pattern("^[0-9]*$")]],
      email:[''],
      username:[''],
      district:[''],
      passwordForm:this.fb.group({
        oldPwd:[''],
        newPwd:['',Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]
      }),
      });
  }

  change(){
    this.step=1;
  }

  previous(){
    this.fieldType = false;
    this.step-=1;
  }
  
  view(){
    this.fieldType = !this.fieldType;
  }

  submit(){
    if(this.profileForm.invalid){
      
    }
    else{      
      this.subService.changeUserData(this.profileForm.value).subscribe(arg =>{
        
        Swal.fire({
          position:'top',
          text:'Your profile updated successfully',
          icon:'success'
        });

      },error=>{ 
               
        if(error.error.detail != null){
          Swal.fire("",error.error.detail,"warning");
          this.route.navigate(['/login']);
        }
      });

    }
   
    
  }

  updatePassword(){
    if(this.profileForm.invalid){
      alert("FIll the missing");
    }
    else{
      if(this.profileForm.controls['passwordForm'].value.oldPwd == this.profileForm.controls['passwordForm'].value.newPwd ){
        this.status =0;
      }else{
        this.subService.changePassword(this.profileForm.controls['passwordForm'].value).subscribe(arg=>{         
          this.pwd = arg;
          this.status = this.pwd.status ; 
        },error =>{
          this.status = error.error.status;
          
        });
      }
    }
  }

  clearData(){
    Swal.fire({
      title:"Please confirm",
      text:"Are you sure to delete your Account ?",
      showConfirmButton:true,
      showCancelButton:true,
      confirmButtonText:"Sure",
      cancelButtonText:'Cancel',
      confirmButtonColor:'green',
      cancelButtonColor:'red',
      position:"top",
    }).then((result)=>{
      if(result.isConfirmed){
        this.subService.deleteProfile().subscribe(arg=>{
          this.del =arg;
        if(this.del.detail != null){
          Swal.fire('',"Account Deleted successfully !","success");
          this.route.navigate(['/login']);
        }
        });
      }
    });
  }

}
