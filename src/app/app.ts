import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentEditor } from './student-editor/student-editor';

import {MaterialTable} from './material-table/material-table'


@Component({
  imports: [FormsModule, StudentEditor, MaterialTable],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ВОТ ТУТА');
}
