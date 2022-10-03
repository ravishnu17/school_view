import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  token : any;

  constructor(private http: HttpClient ) { }
 
  // baseUrl = "http://127.0.0.1:8000"
  baseUrl = "https://school-python-api.herokuapp.com";

  login(data:any,url:any){
    return this.http.post(this.baseUrl+url,data);
    
  }

  get(url :any){  
    this.token =new HttpHeaders({"Authorization":localStorage.getItem('type')+" "+localStorage.getItem('token')});
    return this.http.get(this.baseUrl+url , {headers:this.token});
  }

  post(data:any,url:any){
    return this.http.post(this.baseUrl+url,data , {headers:this.token});
  }

  put(data:any , url:any){
    return this.http.put(this.baseUrl+url,data , {headers:this.token});
  }

  delete(url :any){
    return this.http.delete(this.baseUrl+url , {headers:this.token});
  }
  
}
