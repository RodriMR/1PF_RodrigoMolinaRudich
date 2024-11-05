import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Teacher } from '@models/teachers';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teachers: Teacher[] = [];
  private teachersSubject = new BehaviorSubject<Teacher[]>([]);
  private apiUrl = 'https://67296d766d5fa4901b6d1b1b.mockapi.io/api/v1/users';

  constructor(private http: HttpClient) {
    this.fetchTeachers();
  }

  private fetchTeachers(): any {
    this.http.get<Teacher[]>(this.apiUrl).pipe(
      tap((teachers) => {
        this.teachers = teachers;
        this.teachersSubject.next(this.teachers);
      })
    ).subscribe();
  }

  getTeachers(): Observable<Teacher[]> {
    return this.teachersSubject.asObservable();
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher).pipe(
      tap((newTeacher) => {
        this.teachers.push(newTeacher);
        this.teachersSubject.next(this.teachers);
      })
    );
  }

  updateTeacherById(id: string, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher).pipe(
      tap((updatedTeacher) => {
        const index = this.teachers.findIndex((s) => s.id === Number(id));
        if (index !== -1) {
          this.teachers[index] = updatedTeacher;
          this.teachersSubject.next(this.teachers);
        }
      })
    );
  }

  deleteTeacher(id: string):any {
    console.log('id', id);
  this.http
      .delete<Teacher>(`${this.apiUrl}/${id}`)
      .pipe(concatMap(() => this.fetchTeachers()));
  }
}
