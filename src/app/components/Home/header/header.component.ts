import { Component, OnInit } from '@angular/core';
import { HeaderMenus } from 'src/app/models/header-menu.dto';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderMenusService } from 'src/app/services/header-menus.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  user_name: string;

  constructor(
    private headerMenusService: HeaderMenusService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.showAuthSection = false;
    this.user_name = '';
  }

  ngOnInit(): void {
    this.user_name = this.storageService.getUser().author_name; 

    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        console.log("headerInfo is :" + headerInfo.showAuthSection);
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
        }
      }
    );
    this.headerMenusService.headerManagement.next({ showAuthSection: this.storageService.isLoggedIn() });

  }

  logout(): void {

    this.authService.logout().subscribe({
      next: res => {
        console.log('logging out...')
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        this.headerMenusService.headerManagement.next({ showAuthSection: false });

      },
      error: err => console.log(err)
    })


  }

}