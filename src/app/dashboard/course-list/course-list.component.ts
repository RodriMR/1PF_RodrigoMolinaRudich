import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../shared/services/course.service';
import { Course } from '@models/courses';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { UppercaseTitlePipe } from 'src/app/shared/pipes/upperCaseTitle/uppercase-title.pipe';
import { Student } from '@models/students';
import { StudentService } from 'src/app/shared/services/student.service';
import { SharedModule } from '../shared.module';
import { Class } from '@models/classes';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [UppercaseTitlePipe, SharedModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  students: Student[] = [];
  classes: Class[] = [];
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
        if (result.action === 'delete') {
          let { course } = result;
          this.courseService.deleteCourse(course.course.id);
        } else {
          if (course) {
            this.courseService.updateCourseById(course.id, result).subscribe();
          } else {
            this.courseService.addCourse(result).subscribe();
          }
        }
      }
    });
  }

  editCourse(course: Course): void {
    this.openCourseDialog(course);
  }
  getClasses(course: Course): Class[] {
    return course.classes || [];
  }

}
