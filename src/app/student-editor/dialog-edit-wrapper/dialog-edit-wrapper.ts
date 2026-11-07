import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { FormsModule, NgModel } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'


@Component({
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
  selector: 'app-dialog-edit-wrapper',
  styleUrl: './dialog-edit-wrapper.css',
  templateUrl: './dialog-edit-wrapper.html',
})
export class DialogEditWrapper implements OnInit{
  editingStudent: Student;
  constructor(
  public dialogRef: MatDialogRef<DialogEditWrapper>,
  @Inject(MAT_DIALOG_DATA) public data: Student | null
) {
  if (data && data.id != null) {
    this.editingStudent = { ...data };
  } else {
    this.editingStudent = { name: '', surname: '' };
  }
}

  ngOnInit(): void{}

  saveStudent() : void{
    this.dialogRef.close(this.editingStudent)
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}