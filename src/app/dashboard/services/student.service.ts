import { Injectable } from '@angular/core';

export interface Student {
  createdAt: any;
  id: any;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      createdAt: undefined
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.johnson@example.com',
    },
    {
      id: 4,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@example.com',
    },
    {
      id: 6,
      firstName: 'Sarah',
      lastName: 'Jones',
      email: 'sarah.jones@example.com',
    },
    {
      id: 7,
      firstName: 'Daniel',
      lastName: 'Garcia',
      email: 'daniel.garcia@example.com',
    },
    {
      id: 8,
      firstName: 'Laura',
      lastName: 'Martinez',
      email: 'laura.martinez@example.com',
    },
    {
      id: 9,
      firstName: 'Chris',
      lastName: 'Davis',
      email: 'chris.davis@example.com',
    },
    {
      id: 10,
      firstName: 'Amanda',
      lastName: 'Rodriguez',
      email: 'amanda.rodriguez@example.com',
    },
    {
      id: 11,
      firstName: 'James',
      lastName: 'Miller',
      email: 'james.miller@example.com',
    },
    {
      id: 12,
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
  updateStudentById(id: string, update: Student): void {
    const index = this.students.findIndex(
      (student) => student.id === Number(id)
    );
    this.students[index] = update;
  }
}
