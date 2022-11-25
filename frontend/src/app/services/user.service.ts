import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : String = 'http://localhost:8080/api';
  fullname = localStorage.getItem('firstname')+' '+localStorage.getItem('lastname')



  constructor(private http :HttpClient) { }

  updateStatus(data:any)
  {
    return this.http.patch(this.baseUrl+'/updateStatus',data);

  }

  
  // updateProfile(user_id:any ,form:any)
  // {
  //   return this.http.patch(this.baseUrl+'/update/'+user_id,form);

  // }

  // updateProfilePicture(user_id:any,link:any)
  // {
  //   return this.http.patch(this.baseUrl+'/updateProfilePicture/'+user_id, link);

  // }


 
  

  getOneUser(user_id:any)
  {
    return this.http.get(this.baseUrl+'/getOneUser/'+user_id);
  }










  
}
