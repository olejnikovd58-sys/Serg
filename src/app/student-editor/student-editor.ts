import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../models/student';
import { BaseService } from '../service/base-service';
import { DialogEditWrapper } from './dialog-edit-wrapper/dialog-edit-wrapper';

@Component({
  imports: [FormsModule],
  selector: 'app-student-editor',
  styleUrl: './student-editor.css',
  templateUrl: './student-editor.html',
})
export class StudentEditor implements OnInit {
  editingStudent: Student;

  constructor(private baseService: BaseService){
    this.editingStudent = new Student();
  }

  ngOnInit(): void {
    
  }

  addStudent(): void{
    this.baseService.addNewStudent(this.editingStudent);
    this.editingStudent = new Student();
  }
}
