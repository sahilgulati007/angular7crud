import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MyserviceService {

  constructor(private http:HttpClient) { }
  getstud(){
    return this.http.get('http://localhost:3000/CodeIgniterdemo/index.php/api_controller');
  }
  insertstud(data){
    return this.http.post('http://localhost:3000/CodeIgniterdemo/index.php/api_controller/add_stud',data);
  }
  deletestud(data){
    return this.http.get('http://localhost:3000/CodeIgniterdemo/index.php/api_controller/delete_stud/'+data);
  }
  updateStud(data,id){
    return this.http.post('http://localhost:3000/CodeIgniterdemo/index.php/api_controller/update_stud/'+id,data)
  }
}
