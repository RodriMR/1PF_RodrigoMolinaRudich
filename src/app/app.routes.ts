import { Routes } from '@angular/router';
import { AlumniListComponent } from './dashboard/alumni-list/alumni-list.component';
import { CourseListComponent } from './dashboard/course-list/course-list.component';
import { TeacherListComponent } from './dashboard/teacher-list/teacher-list.component';

export const routes: Routes = [
  { path: 'alumni', component: AlumniListComponent },
  { path: 'courses-classes', component: CourseListComponent },
  { path: 'teachers', component: TeacherListComponent },

  { path: '**', redirectTo: '/alumni', pathMatch: 'full' },
];
