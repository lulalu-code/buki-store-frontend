import { Component, Output, EventEmitter } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  filterResults(text: string) {
    this.search.emit(text);
  }
}
