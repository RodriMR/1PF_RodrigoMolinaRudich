import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '@models/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private courses: Course[] = [
    {
      id: 1,
      title: 'Angular Basics',
      description: 'Learn the basics of Angular',
      createdAt: new Date(),
      students: [],
      classes: [],
    },
    {
      id: 2,
      title: 'Advanced Angular',
      description: 'Deep dive into Angular features',
      createdAt: new Date(),
      students: [],
      classes: [],
    },
    {
      id: 3,
      title: 'Angular Forms',
      description: 'Master Angular forms',
      createdAt: new Date(),
      students: [],
      classes: [],
    },
    {
      id: 4,
      title: 'Angular Routing',
      description: 'Learn how to use Angular Router',
      createdAt: new Date(),
      students: [],
      classes: [],
    },
  ];

  constructor() {
    this.coursesSubject.next(this.courses);
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  addCourse(course: Course): Observable<void> {
    const newCourse = {
      ...course,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.courses.push(newCourse);
    this.coursesSubject.next([...this.courses]);
    return new Observable((observer) => observer.complete());
  }

  updateCourseById(id: number, update: Partial<Course>): Observable<void> {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...update };
      this.coursesSubject.next([...this.courses]);
    }
    return new Observable((observer) => observer.complete());
  }
  deleteCourse(id: number): Observable<void> {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      this.coursesSubject.next([...this.courses]);
    }
    return new Observable((observer) => observer.complete());
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
