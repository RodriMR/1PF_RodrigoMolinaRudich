import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../../shared/services/course.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { ClassService } from 'src/app/shared/services/classes.service';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';
import { Course } from '@models/courses';
import { Student } from '@models/students';
import { Class } from '@models/classes';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseServiceMock: jasmine.SpyObj<CourseService>;
  let studentServiceMock: jasmine.SpyObj<StudentService>;
  let classServiceMock: jasmine.SpyObj<ClassService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    courseServiceMock = jasmine.createSpyObj('CourseService', [
      'getCourses',
      'deleteCourse',
      'updateCourseById',
      'addCourse',
    ]);
    studentServiceMock = jasmine.createSpyObj('StudentService', [
      'getStudents',
    ]);
    classServiceMock = jasmine.createSpyObj('ClassService', [
      'getClasses',
      'deleteClass',
      'updateClassById',
      'addClass',
    ]);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: StudentService, useValue: studentServiceMock },
        { provide: ClassService, useValue: classServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize courses, students, and classes', () => {
      const mockCourses: Course[] = [
        {
          id: 1,
          title: 'Course 1',
          description: '',
          students: [],
          classes: [],
          createdAt: new Date(),
        },
      ];
      const mockStudents: Student[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          createdAt: new Date(),
          email: 'john.doe@example.com',
        },
      ];
      const mockClasses: Class[] = [
        { id: 1, title: 'Class 1', description: '', createdAt: new Date() },
      ];

      courseServiceMock.getCourses.and.returnValue(of(mockCourses));
      studentServiceMock.getStudents.and.returnValue(of(mockStudents));
      classServiceMock.getClasses.and.returnValue(of(mockClasses));

      component.ngOnInit();

      expect(component.courses).toEqual(mockCourses);
      expect(component.students).toEqual(mockStudents);
      expect(component.classes).toEqual(mockClasses);
    });
  });

  describe('getStudentNames', () => {
    it('should return "No students enrolled" if no student IDs are provided', () => {
      expect(component.getStudentNames([])).toBe('No students enrolled');
    });

    it('should return student names based on IDs', () => {
      component.students = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          createdAt: new Date(),
          email: 'john.doe@example.com',
        },
      ];
      expect(component.getStudentNames([1])).toBe('John Doe');
    });
  });

  describe('getClassName', () => {
    it('should return "No classes assigned" if no class IDs are provided', () => {
      expect(component.getClassName([])).toBe('No classes assigned');
    });

    it('should return class titles based on IDs', () => {
      component.classes = [
        { id: 1, title: 'Class 1', description: '', createdAt: new Date() },
      ];
      expect(component.getClassName([1])).toBe('Class 1');
    });
  });

  describe('openCourseDialog', () => {
    it('should open course dialog and handle dialog close', () => {
      const mockCourse = {
        id: 1,
        title: 'Course 1',
        description: '',
      } as Course;
      const dialogRefSpyObj = jasmine.createSpyObj({
        afterClosed: of({ action: 'delete', course: { course: mockCourse } }),
      });
      dialogMock.open.and.returnValue(dialogRefSpyObj);

      component.openCourseDialog(mockCourse);

      expect(dialogMock.open).toHaveBeenCalledWith(CourseDialogComponent, {
        data: { course: mockCourse },
      });
      expect(courseServiceMock.deleteCourse).toHaveBeenCalledWith(
        mockCourse.id
      );
    });
  });

  describe('editCourse', () => {
    it('should open the course dialog for editing a course', () => {
      const mockCourse = {
        id: 1,
        title: 'Course 1',
        description: '',
      } as Course;
      spyOn(component, 'openCourseDialog');

      component.editCourse(mockCourse);

      expect(component.openCourseDialog).toHaveBeenCalledWith(mockCourse);
    });
  });

  describe('openClassDialog', () => {
    it('should open class dialog and handle dialog close', () => {
      const mockClass = { id: 1, title: 'Class 1', description: '' } as Class;
      const dialogRefSpyObj = jasmine.createSpyObj({
        afterClosed: of({ action: 'delete', item: { item: mockClass } }),
      });
      dialogMock.open.and.returnValue(dialogRefSpyObj);

      component.openClassDialog(mockClass);

      expect(dialogMock.open).toHaveBeenCalledWith(ClassDialogComponent, {
        data: { item: mockClass },
      });
      expect(classServiceMock.deleteClass).toHaveBeenCalledWith(mockClass.id);
    });
  });

  describe('editClass', () => {
    it('should open the class dialog for editing a class', () => {
      const mockClass = { id: 1, title: 'Class 1', description: '' } as Class;
      spyOn(component, 'openClassDialog');

      component.editClass(mockClass);

      expect(component.openClassDialog).toHaveBeenCalledWith(mockClass);
    });
  });
});
