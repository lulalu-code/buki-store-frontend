import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginResponse } from 'src/app/models/auth.dto';
import { EventTypesDTO } from 'src/app/models/event-types.dto';
import { HeaderMenus } from 'src/app/models/header-menu.dto';
import { UserDTO } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderMenusService } from 'src/app/services/header-menus.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  user_name: string;
  logoutSubscription: Subscription;
  headerManagementSubscription: Subscription;

  constructor(
    private headerMenusService: HeaderMenusService,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
  ) {
    this.showAuthSection = false;
    this.user_name = '';
    this.logoutSubscription = new Subscription;
    this.headerManagementSubscription = new Subscription;
    this.user_name = this.storageService.getUser().author_name;
  }

  ngOnInit(): void {

    // Subscription to change the header any time the Auth status changes
    this.headerManagementSubscription = this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
        }
      }
    );
    // Set the Auth status to true if we have an item in the session storage
    this.headerMenusService.headerManagement.next({ showAuthSection: this.storageService.isLoggedIn() });
  }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
    this.headerManagementSubscription.unsubscribe();
  }

  getUserRoute(): string {
    this.user_name = this.storageService.getUser().author_name;
    return '/profile/' + this.user_name;
  }

  logout(): void {

    this.logoutSubscription = this.authService.logout().subscribe({
      next: () => {
        console.log('logging out...')
        this.storageService.clean();
        this.headerMenusService.headerManagement.next({ showAuthSection: false });
        this.toastService.openSnackBar('Sessión cerrada con éxito', 'OK', EventTypesDTO.Success);
      },
      error: error => {
        console.log('logout error: ' + JSON.stringify(error.error));
        this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error);
      }
    })
  }

}