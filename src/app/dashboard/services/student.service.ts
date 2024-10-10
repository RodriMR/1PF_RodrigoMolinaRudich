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
      createdAt: new Date('2024-01-01T10:00:00'),
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      createdAt: new Date('2024-01-02T10:00:00'),
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.johnson@example.com',
      createdAt: new Date('2024-01-03T10:00:00'),
    },
    {
      id: 4,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
      createdAt: new Date('2024-01-04T10:00:00'),
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@example.com',
      createdAt: new Date('2024-01-05T10:00:00'),
    },
    {
      id: 6,
      firstName: 'Sarah',
      lastName: 'Jones',
      email: 'sarah.jones@example.com',
      createdAt: new Date('2024-01-06T10:00:00'),
    },
    {
      id: 7,
      firstName: 'Daniel',
      lastName: 'Garcia',
      email: 'daniel.garcia@example.com',
      createdAt: new Date('2024-01-07T10:00:00'),
    },
    {
      id: 8,
      firstName: 'Laura',
      lastName: 'Martinez',
      email: 'laura.martinez@example.com',
      createdAt: new Date('2024-01-08T10:00:00'),
    },
    {
      id: 9,
      firstName: 'Chris',
      lastName: 'Davis',
      email: 'chris.davis@example.com',
      createdAt: new Date('2024-01-09T10:00:00'),
    },
    {
      id: 10,
      firstName: 'Amanda',
      lastName: 'Rodriguez',
      email: 'amanda.rodriguez@example.com',
      createdAt: new Date('2024-01-10T10:00:00'),
    },
    {
      id: 11,
      firstName: 'James',
      lastName: 'Miller',
      email: 'james.miller@example.com',
      createdAt: new Date('2024-01-11T10:00:00'),
    },
    {
      id: 12,
      firstName: 'Olivia',
      lastName: 'Hernandez',
      email: 'olivia.hernandez@example.com',
      createdAt: new Date('2024-01-12T10:00:00'),
    },
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    student.createdAt = new Date();
    this.students.push(student);
  }

  updateStudentById(id: string, update: Student): void {
    const index = this.students.findIndex(
      (student) => student.id === Number(id)
    );
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...update };
    }
  }
}
