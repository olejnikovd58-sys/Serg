import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../models/student';
import { BaseService } from '../service/base-service';
import { DialogEditWrapper } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';

@Component({
  selector: 'material-table',
  styleUrl: 'material-table.css',
  templateUrl: 'material-table.html',
  imports: [MatTableModule, MatButtonModule],
})
export class MaterialTable implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'actions'];
  dataSource: Student[] = [];

  constructor(
    private baseService: BaseService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.baseService.getAllStudents().subscribe(data => {
      this.dataSource = data;
      this.cdr.detectChanges();
    });
  }

  addNewStudent(): void {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result) {
        this.baseService.addNewStudent(result).subscribe(() => {
          this.loadStudents();
        });
      }
    });
  }

  editStudent(student: Student): void {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '400px',
      data: { ...student }
    });

    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result) {
        this.baseService.editStudent(result).subscribe(() => {
          this.loadStudents();
        });
      }
    });
  }

  deleteStudent(student: Student): void {
    if (!student.id) return;
    this.baseService.deleteStudent(student.id).subscribe(() => {
      this.loadStudents();
    });
  }
}