import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


import {MaterialTable} from './material-table/material-table'


@Component({
  imports: [FormsModule, MaterialTable],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ВОТ ТУТА');
}
