import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '@models/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  private courses: Course[] = [
    { id: 1, title: 'Angular Basics', description: 'Learn the basics of Angular', createdAt: new Date() },
    { id: 2, title: 'Advanced Angular', description: 'Deep dive into Angular features', createdAt: new Date() },
    { id: 3, title: 'Angular Forms', description: 'Master Angular forms', createdAt: new Date() },
    { id: 4, title: 'Angular Routing', description: 'Learn how to use Angular Router', createdAt: new Date() },
  ];

  constructor() {
    this.coursesSubject.next(this.courses);
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  addCourse(course: Course): void {
    this.courses = [...this.courses, { ...course, id: this.courses.length + 1, createdAt: new Date() }];
    this.coursesSubject.next(this.courses);
  }

  updateCourseById(id: number, update: Partial<Course>): void {
    this.courses = this.courses.map(course => 
      course.id === id ? { ...course, ...update } : course
    );
    this.coursesSubject.next(this.courses);
  }

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
    this.coursesSubject.next(this.courses);
  }
}
