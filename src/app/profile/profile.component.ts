import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo:any=[];

  constructor(private api : ApiService, private router : Router, private spinner : NgxSpinnerService){}

  // imageFormData = this.fb.gr

  ngOnInit(): void {
    this.spinner.show();
    this.api.getUserDetails().subscribe((res:any)=>{
      this.userInfo = res[0];
      console.log(this.userInfo);  
      this.spinner.hide();
   
    })
  }


  onFile(e:any){
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("helooooo",file);    
      const imageFormData = new FormData();
    imageFormData.append('image', file, file.name);
      console.log(imageFormData,"IMAGE");     
      let obj={
        "image":'http://localhost:8080/get/image/info/'+imageFormData,
      }
      this.api.postEditPofile(obj)
      .subscribe((res:any) => {
       console.log(res,"SDFGHJK");
      }
      );
    }
  }




  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}

}
