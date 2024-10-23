import { Routes } from '@angular/router';
import { AlumniListComponent } from './dashboard/alumni-list/alumni-list.component';
import { CourseListComponent } from './dashboard/course-list/course-list.component';

export const routes: Routes = [
  { path: 'alumni', component: AlumniListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: '**', redirectTo: '/alumni', pathMatch: 'full' },
];
