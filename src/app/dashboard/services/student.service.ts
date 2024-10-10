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
    }
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
  deleteStudent(id: string): void {
    this.students = this.students.filter((student) => student.id !== id);
  }
}
