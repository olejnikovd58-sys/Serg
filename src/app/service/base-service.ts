import { Injectable} from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'}
)
export class BaseService {

    private studentsUrl = 'https://4e5e878747659d6b.mokky.dev/DataOfStudents';

    constructor(private http: HttpClient){

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
  return this.http.put<Student>(`${this.studentsUrl}/${student.id}`, student);
}

}

