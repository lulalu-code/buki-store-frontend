import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ProfileDTO } from 'src/app/models/profile.dto';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypesDTO } from 'src/app/models/event-types.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: ProfileDTO;
  p: number = 1;
  connectedUserName: string;
  getUserSubscription: Subscription;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService,
    private toastService: ToastService,
  ){
    this.user = new ProfileDTO('','','','',[]);
    this.connectedUserName = '';
    this.getUserSubscription = new Subscription;
  }


  ngOnInit(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('author_name') || '';
    this.getUserByName(name);
    this.connectedUserName = this.storageService.getUser().author_name;
  }

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }

  getUserByName(name: string): void {
    this.getUserSubscription = this.userService.getUserByName(name).subscribe({
      next: (user: any) => {
      this.user = user;
      if(this.user.profile_image == null) {
        this.user.profile_image = 'https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_1280.png'
      }
    },
    error: error => {
      console.log('getUserByName error: ' + JSON.stringify(error.error));
      this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error)
    }
  });
  }

}
