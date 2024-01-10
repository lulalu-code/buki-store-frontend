import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ProfileDTO } from 'src/app/models/profile.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: ProfileDTO;
  p: number = 1;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private userService: UserService,
  ){}


  ngOnInit(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('author_name') || '';
    console.log("Esto es la info de " + name);
    this.getUserByName(name);

  }

  getUserByName(name: string) {
    return  this.userService
    .getUserByName(name)
    .subscribe((user: any) => {
      this.user = user;
      console.log("Esto es la info de " + JSON.stringify(user));
    });
  }

}
