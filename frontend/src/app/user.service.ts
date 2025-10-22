import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAllUsersUrl = "http://localhost:3000/user/all";
  private getOneUserUrl = ""
  private deleteUserUrl = "http://localhost:3000/user/delete/:id";
  private addUserUrl = "http://localhost:3000/user/register";
  private updateUserUrl = "";


  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get<any>(this.getAllUsersUrl);
  }
  getOneUser(id: String) {
    return this.http.get<any>(this.getOneUserUrl + id);
  }
  deleteUser(id: String) {
    return this.http.delete<any>(this.deleteUserUrl + id);
  }
  addUser(user: User) {
    return this.http.post<any>(this.addUserUrl, user);
  }
  updateUser(user: User) {
    return this.http.put<any>(this.updateUserUrl, user);

  }
}
