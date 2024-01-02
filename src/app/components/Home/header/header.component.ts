import { Component, OnInit } from '@angular/core';
import { HeaderMenus } from 'src/app/models/header-menu.dto';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderMenusService } from 'src/app/services/header-menus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;

  constructor(
    private headerMenusService: HeaderMenusService,
    private authService: AuthService
  ) {
    this.showAuthSection = false;
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        console.log("headerInfo is :" + headerInfo.showAuthSection);
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
        }
      }
    );
  }

  logout(): void {

    console.log("Logging out...")

    this.authService.logout();

    this.headerMenusService.headerManagement.next({ showAuthSection: false });

  }

}