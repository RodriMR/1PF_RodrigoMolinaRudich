import { Injectable } from '@angular/core';

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    {
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.johnson@example.com',
    },
    {
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
    },
    {
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@example.com',
    },
    { firstName: 'Sarah', lastName: 'Jones', email: 'sarah.jones@example.com' },
    {
      firstName: 'Daniel',
      lastName: 'Garcia',
      email: 'daniel.garcia@example.com',
    },
    {
      firstName: 'Laura',
      lastName: 'Martinez',
      email: 'laura.martinez@example.com',
    },
    { firstName: 'Chris', lastName: 'Davis', email: 'chris.davis@example.com' },
    {
      firstName: 'Amanda',
      lastName: 'Rodriguez',
      email: 'amanda.rodriguez@example.com',
    },
    {
      firstName: 'James',
      lastName: 'Miller',
      email: 'james.miller@example.com',
    },
    {
      firstName: 'Olivia',
      lastName: 'Hernandez',
      email: 'olivia.hernandez@example.com',
    },
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }
}
