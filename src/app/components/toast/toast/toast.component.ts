import { Component, Inject, inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { EventTypesDTO } from '../../../models/event-types.dto';

// https://material.angular.io/components/snack-bar/overview

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
  imports: [MatButtonModule]
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {message: string, action: string, type: EventTypesDTO},
  ) { }
  
  snackBarRef = inject(MatSnackBarRef);

}
