import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/services/course.service';
import { Course } from '@models/courses';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UppercaseTitlePipe } from 'src/app/shared/pipes/upperCaseTitle/uppercase-title.pipe';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    UppercaseTitlePipe,
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  courses: Course[] = [];

  constructor(private courseService: CourseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }
}
