import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../models/student';
import { BaseService } from '../service/base-service';
import { DialogEditWrapper } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'material-table',
  styleUrl: 'material-table.css',
  templateUrl: 'material-table.html',
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
})
export class MaterialTable implements OnInit {
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  searchText = '';
  displayedColumns: string[] = ['id', 'name', 'surname', 'actions'];
  dataSource = new MatTableDataSource<Student>([])

  

  constructor(
    private baseService: BaseService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText = filterValue.trim();
    this.currentPage = 1;
    this.loadPage();
  }

  onPageChange(event: PageEvent): void{
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadPage();
  }

  loadPage(): void {
    this.baseService.getStudentPage(this.currentPage, this.pageSize, this.searchText).subscribe(res => {
      this.dataSource.data = res.items;
      this.totalItems = res.meta.total_items;
      this.cdr.detectChanges();
    })
  }

  addNewStudent(): void {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result) {
        this.baseService.addNewStudent(result).subscribe(() => {
          this.loadPage();
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
          this.loadPage();
        });
      }
    });
  }

  deleteStudent(student: Student): void {
    if (!student.id) return;
    this.baseService.deleteStudent(student.id).subscribe(() => {
      this.loadPage();
    });
  }
}