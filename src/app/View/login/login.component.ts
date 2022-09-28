import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubServiceService } from 'src/app/Service/sub-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
  loginForm!: FormGroup;
  data: any;
  error : any;
  form!: FormData;
  step=0;
  submitted = false;
  fieldType = false;
  constructor(private fb: FormBuilder, private subService: SubServiceService,private route:Router) { 
  }

  ngOnInit(): void {

    localStorage.clear();
    
    this.loginForm = this.fb.group({
      login:this.fb.group({
        username: ['',Validators.required],
        password: ['',Validators.required]
      }),
      forgotPassword:this.fb.group({
        username: ['',Validators.required],
        pin:['',[Validators.required]],
        password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]]
      })
    });
  }

  plus()
  {
    this.fieldType=false;
    this.error = null;
    this.step=1;
  }

  minus()
  {
    this.fieldType=false;
    this.error = null;
    this.step=0;
  }

//password view
view(){
  this.fieldType = !this.fieldType;
}

//get pin method
  check(){    
    this.subService.pin({"username":this.loginForm.get('forgotPassword.username')?.value}).subscribe(data=>{
      this.data = data;      
      
      if (this.data[0].pin!=null){
        this.error=null;
        alert('Your pin is: '+this.data[0].pin)
      }
    },error=>{
      this.error = error.error.detail;
    });
  }

//forgot password method
  forgotPwd(){
    if (this.loginForm.controls['forgotPassword'].invalid) {
      this.submitted = true;
      alert("Field should not be Empty");
    }
    else{
      this.subService.forgotPassword(this.loginForm.controls['forgotPassword'].value).subscribe(data=>{
        this.data = data;
        Swal.fire({
          title:'Successfully changed',
          icon:'success',
          confirmButtonColor:'blue',
        }).then((response)=>{
          if(response.isConfirmed){
            location.reload();
          }else{
            location.reload();
          }
        });
      },error =>{
        this.data = error;
        this.error = this.data.error.detail;
        // console.log(this.data , this.error);
        
      });
    }
  }

//login method
  submit() {

    if (this.loginForm.controls['login'].invalid) {      
      this.error="Enter login credentials";
    }
    else {
        // const login = JSON.parse(JSON.stringify(this.loginForm.value))
        // console.log("login data",this.loginForm.value)

        this.form = new FormData();
        this.form.append("username",this.loginForm.get('login.username')?.value);
        this.form.append("password",this.loginForm.get('login.password')?.value);

      this.subService.login(this.form).subscribe( next => {
        this.data=next;

        if(this.data.access_token != null && this.data.role != 2 ){ 
          localStorage.setItem('token',this.data.access_token);
          localStorage.setItem('type',this.data.token_type); 

          // console.log("login token",localStorage.getItem('token'));
          Swal.fire({
            title:"Login successfully",
            showConfirmButton:false,
            icon:'success',
            timer:1000
          });
          this.route.navigate(['/main/home']);
          }
          else if (this.data.role == 2){
            localStorage.setItem('token',this.data.access_token);
            localStorage.setItem('type',this.data.token_type); 
            this.route.navigate(['/manage']);
          }
      },error =>{
        this.error = error.error.detail;
        
      });      
    }
  }
}