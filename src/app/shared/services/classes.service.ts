import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Class } from '@models/classes';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private classesSubject = new BehaviorSubject<Class[]>([]);
  classes$ = this.classesSubject.asObservable();

  private classes: Class[] = [
    {
      id: 1,
      title: 'Angular Basics 1',
      description: 'Learn the basics of Angular',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Advanced Angular 2',
      description: 'Deep dive into Angular features',
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Angular Forms 3',
      description: 'Master Angular forms',
      createdAt: new Date(),
    },
    {
      id: 4,
      title: 'Angular Routing 4',
      description: 'Learn how to use Angular Router',
      createdAt: new Date(),
    },
    {
      id: 5,
      title: 'React 1',
      description: ' Learn the basics of React',
      createdAt: new Date(),
    },
    {
      id: 6,
      title: 'React 2',
      description: 'Deep dive into React features',
      createdAt: new Date(),
    },
    {
      id: 7,
      title: 'React 3',
      description: 'Master React forms',
      createdAt: new Date(),
    },
    {
      id: 8,
      title: 'React 4',
      description: 'Learn how to use React Router',
      createdAt: new Date(),
    },
  ];

  constructor() {
    this.classesSubject.next(this.classes);
  }

  getClasses(): Observable<Class[]> {
    return this.classes$;
  }

  addClass(items: Class): Observable<void> {
    const newClass = {
      ...items,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.classes.push(newClass);
    this.classesSubject.next([...this.classes]);
    console.log(this.classes);
    return new Observable((observer) => observer.complete());
  }

  updateClassById(id: number, update: Partial<Class>): Observable<void> {
    const index = this.classes.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.classes[index] = { ...this.classes[index], ...update };
      this.classesSubject.next([...this.classes]);
    }
    return new Observable((observer) => observer.complete());
  }
  deleteClass(id: number): Observable<void> {
    const index = this.classes.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.classes.splice(index, 1);
      this.classesSubject.next([...this.classes]);
    }
    return new Observable((observer) => observer.complete());
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
