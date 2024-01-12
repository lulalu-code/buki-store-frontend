import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ProfileDTO } from 'src/app/models/profile.dto';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: ProfileDTO;
  p: number = 1;
  connectedUserName: string;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private storageService: StorageService,
  ){
    this.user = new ProfileDTO('','','','',[]);
    this.connectedUserName = '';
  }


  ngOnInit(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('author_name') || '';
    this.getUserByName(name);

    this.connectedUserName = this.storageService.getUser().author_name;
  }

  getUserByName(name: string) {
    return  this.userService
    .getUserByName(name)
    .subscribe((user: any) => {
      this.user = user;
      if(this.user.profile_image == null) {
        this.user.profile_image = 'https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_1280.png'
      }
    });
  }

}
