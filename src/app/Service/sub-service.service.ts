import { Injectable } from '@angular/core';
import { MainServiceService } from './main-service.service';
@Injectable({
  providedIn: 'root'
})
export class SubServiceService {

  constructor(private mainService: MainServiceService) { }

  register(data:any){
    const path='/register';
    return this.mainService.post(data , path);
  }
  pin(data:any){
    const path = '/pinGenerate';
    return this.mainService.post(data , path);
  }
  forgotPassword(data:any){
    const path = '/forgotPassword';
    return this.mainService.post(data , path);
  }


  login(data:any){
    const path = '/login';
    return this.mainService.post(data , path);
  }


  changeRole(data:any){
    const path = '/changeRole';
    return this.mainService.post(data , path);
  }

  post(data:any , path:any){
    return this.mainService.post(data,path); 
  }

  getUser(){
    const path = '/get';
    return this.mainService.get(path);
  }

  getUsers(){
    const path='/getUser';
    return this.mainService.get(path);
  }

  get(path:any){
    return this.mainService.get(path)
  }

  remove(id:any){
    const path = '/deleteID/'+id;
    return  this.mainService.delete(path);
  }

  userProfile(){
    const path = '/profile';
    return this.mainService.get(path);
  }

  changeUserData(data:any){
    const path = '/profileUpdate';
    return this.mainService.put(data , path);
  }

  changePassword(data:any){
    const path = '/password';
    return this.mainService.put(data , path);
  }

  deleteProfile(){
    const path  ='/delete';
    return this.mainService.delete(path)
  }

  schoolProfile(){
    const path = '/SchoolProfile';
    return this.mainService.get(path);
  }

  updateSchoolData(data:any){
    const path ='/schoolUpdate';
    return this.mainService.put(data,path);
  }

  changeAll(data:any){
    const path = '/changeAll';
    return this.mainService.put(data,path);
  }

  schoolData(id:any){
    const path='/schoolData/'+id
    return this.mainService.get(path);
  }

  deleteSchoolProfile(id:any){
    const path = '/deleteSchoolID/'+id ;
    return this.mainService.delete(path);
  }

  updateSchoolProfile(id:any , data:any){
    const path = '/updateSchoolProfile/'+id;
    return this.mainService.put(data,path);
  }

  getUserName(){
    const path = '/getUserName';
    return this.mainService.get(path);
  }

  addSchoolProfile(data:any){
    const path = '/newProfile';
    return this.mainService.post(data , path);
  }
}
