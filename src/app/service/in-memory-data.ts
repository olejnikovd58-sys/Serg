import { Injectable, Service } from '@angular/core';
import { Student } from '../models/student';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryData implements InMemoryDbService{
    createDb(){
        const students = [
            {id: 0, name: 'name', surname:"surname"},
            {id: 1, name: 'name 1', surname:"surname 1"},
            {id: 2, name: 'name 2', surname:"surname 2"},
        ];
        return {students};
    }
    genId(students: Student[]): number{
        return students.length > 0 ? Math.max(...students.map(student => student.id ? student.id: 0)) + 1: 11;
    }
}
