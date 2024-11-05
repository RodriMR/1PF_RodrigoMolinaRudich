import { TestBed } from '@angular/core/testing';
import { StudentService } from './student.service';
import { Student } from '@models/students';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentService],
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default students', (done) => {
    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(4);
      done();
    });
  });

  it('should add a new student', (done) => {
    const newStudent: Student = {
      id: 5,
      firstName: 'Alice',
      lastName: 'Walker',
      email: 'alice.walker@example.com',
      createdAt: new Date(),
    };

    service.addStudent(newStudent);
    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(5);
      expect(students).toContain(newStudent);
      done();
    });
  });

  it('should update a student by ID', (done) => {
    const update: Partial<Student> = { firstName: 'Johnathan' };

    service.updateStudentById('1', update as Student);
    service.getStudents().subscribe((students) => {
      expect(students.find((s) => s.id === 1)?.firstName).toBe('Johnathan');
      done();
    });
  });

  it('should delete a student by ID', (done) => {
    service.deleteStudent('1');
    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(3);
      expect(students.find((s) => s.id === 1)).toBeUndefined();
      done();
    });
  });
});
