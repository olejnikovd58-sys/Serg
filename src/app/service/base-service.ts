import { Injectable} from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Paginator } from '../paginator';

@Injectable({
    providedIn: 'root'}
)
export class BaseService {

    public studentsUrl = 'https://4e5e878747659d6b.mokky.dev/DataOfStudents';


    constructor(private http: HttpClient){

    }

    getStudentPage(page: number, limit: number, search: string = ''): Observable<Paginator> {
      let url = `${this.studentsUrl}?page=${page}&limit=${limit}`;
      if (search.trim()){
        url += `&surname=*${search}*`;
      }
    return this.http.get<Paginator>(url);
    }

    getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
    }

    addNewStudent(student: Student): Observable<Student> { 
        console.log("AddNewStudent");
        return this.http.post<Student>(this.studentsUrl, student)
    }

    deleteStudent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.studentsUrl}/${id}`);
}


editStudent(student: Student): Observable<Student> {
    console.log("edit student")
  return this.http.patch<Student>(`${this.studentsUrl}/${student.id}`, student);
}

}

