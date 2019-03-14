import { Component } from '@angular/core';
import {MyserviceService} from "./myservice.service";
import {FormControl, FormGroup} from "@angular/forms";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data;
  update:boolean = false;
  updateid;
  studFrom = new FormGroup({
    snm: new FormControl(),
    saddress: new FormControl(),
    smob: new FormControl()
  });
  constructor(private dataser:MyserviceService){
    this.viewstud();
  }
  viewstud(){
    this.dataser.getstud().subscribe((res)=>{
      console.log(res);
      this.data=res;
    });
  }
  onSubmit(){
    console.log(this.studFrom.value);
    var stud = new FormData();
    stud.append('snm', this.studFrom.value.snm);
    stud.append('saddress', this.studFrom.value.saddress);
    stud.append('smob', this.studFrom.value.smob);
    if(this.update){
      this.dataser.updateStud(stud,this.updateid).subscribe((res)=>{
        this.update=false;
        this.viewstud();
      });
    }
    else {

      console.log(stud);
      this.dataser.insertstud(stud).subscribe((res) => {
        this.viewstud();
      });
    }
    this.studFrom.reset();
  }
  onDelete(id){
    var r = confirm("Press Ok button to delete!");
    if(r==true) {
      this.dataser.deletestud(id).subscribe((res) => {
        this.viewstud();
      });
    }
  }
  onUpdate(id){
    console.log(id);
    for(let d of this.data){
      console.log(d.sid);
      if(d.sid==id){
        console.log('in');
        this.studFrom.patchValue({
          snm: d.snm,
          saddress: d.saddress,
          smob: d.smob
        });
        // this.studFrom.value.snm=d.snm;
        // this.studFrom.value.saddress=d.saddress;
        // this.studFrom.value.smob=d.smob;
        this.updateid=id;
        this.update=true;
        break;
      }
    }
  }

}
