// https://betterprogramming.pub/how-to-create-a-toast-service-using-angular-13-and-bootstrap-5-494e5c66627
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast/toast.component';
import { EventTypesDTO } from '../models/event-types.dto';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) { 
    
  }

  openSnackBar(message: string, action: string, type: EventTypesDTO) {
    let panelClass = ''
    if (type == EventTypesDTO.Success) {
      panelClass = 'success-snackbar';
    }
    else if (type == EventTypesDTO.Error) {
      panelClass = 'error-snackbar';
    }
    this._snackBar.openFromComponent(ToastComponent, {
      data: {
        message: message,
        action: action,
        type: type,
      },
      duration: 5000,
      panelClass: [panelClass]
    });
  }

}
