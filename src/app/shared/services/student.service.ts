import { Injectable } from '@angular/core';
import { Student } from '@models/students';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // Create a BehaviorSubject to store the students' data
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  // Expose the students as an Observable
  students$: Observable<Student[]> = this.studentsSubject.asObservable();

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
  ];

  constructor() {
    // Initialize the BehaviorSubject with the students' data
    this.studentsSubject.next(this.students);
  }

  // Get students as an Observable
  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  // Add a new student to the list and emit the updated list
  addStudent(student: Student): void {
    student.createdAt = new Date();
    // Create a new array reference and emit it
    this.students = [...this.students, student];
    this.studentsSubject.next(this.students);
  }
  
  // Update a student by ID and emit the updated list
  updateStudentById(id: string, update: Student): void {
    const index = this.students.findIndex(
      (student) => student.id === Number(id)
    );
    if (index !== -1) {
      const updatedStudents = this.students.map((student) =>
        student.id === Number(id) ? { ...student, ...update } : student
      );
      this.students = updatedStudents;
      this.studentsSubject.next(this.students);
    }
  }

  // Delete a student by ID and emit the updated list
  deleteStudent(id: string): void {
    this.students = this.students.filter(
      (student) => student.id !== Number(id)
    );
    this.studentsSubject.next(this.students);
  }
}
