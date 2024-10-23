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
import { CommonModule } from '@angular/common';
import { Student } from '@models/students';
import { StudentService } from 'src/app/shared/services/student.service';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
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
  students: Student[] = [];
  displayedColumns: string[] = ['title', 'description', 'students', 'actions'];

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.students = students;
    });
  }
  getStudentNames(studentIds: number[]): string {
    if (!studentIds || studentIds.length === 0) {
      return 'No students enrolled'; 
    }
    return studentIds
      .map((id) => {
        const student = this.students.find((s) => s.id === id);
        return student ? `${student.firstName} ${student.lastName}` : '';
      })
      .filter((name) => name)
      .join(', ');
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
