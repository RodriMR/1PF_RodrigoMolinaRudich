import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../shared/services/course.service';
import { Course } from '@models/courses';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { UppercaseTitlePipe } from 'src/app/shared/pipes/upperCaseTitle/uppercase-title.pipe';
import { MatTable } from '@angular/material/table';

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
  courses: Course[] = [];
  displayedColumns: string[] = ['title', 'description', 'actions'];

  constructor(private courseService: CourseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  openCourseDialog(course?: Course): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: { course },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (course) {
          this.courseService.updateCourseById(course.id, result).subscribe();
        } else {
          this.courseService.addCourse(result).subscribe();
        }
      }
    });
  }

  editCourse(course: Course): void {
    this.openCourseDialog(course);
  }
}



