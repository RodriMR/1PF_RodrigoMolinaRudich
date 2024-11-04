import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../shared/services/course.service';
import { Course } from '@models/courses';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { UppercaseTitlePipe } from 'src/app/shared/pipes/upperCaseTitle/uppercase-title.pipe';
import { Student } from '@models/students';
import { StudentService } from 'src/app/shared/services/student.service';
import { ClassService } from 'src/app/shared/services/classes.service';
import { SharedModule } from '../shared.module';
import { Class } from '@models/classes';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';
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
  displayedCourseColumns: string[] = [
    'title',
    'description',
    'classes',
    'students',
    'actions',
  ];
  displayedColumnsClasses: string[] = ['title', 'description', 'actions'];
  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.students = students;
    });
    this.classService.getClasses().subscribe((classes: Class[]) => {
      this.classes = classes;
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
  getClassName(classIds: number[]): string {
    if (!classIds || classIds.length === 0) {
      return 'No classes assigned';
    }
    return classIds
      .map((id) => {
        const classItem = this.classes.find((s) => s.id === id);
        return classItem ? `${classItem.title}` : '';
      })
      .filter((name) => name)
      .join(', ');
  }
  //------COURSES------//
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

  //------CLASSES------//
  openClassDialog(item?: Class): void {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'delete') {
          let { item } = result;
          this.classService.deleteClass(item.item.id);
        } else {
          if (item) {
            this.classService.updateClassById(item.id, result).subscribe();
          } else {
            this.classService.addClass(result).subscribe();
          }
        }
      }
    });
  }
  editClass(item: Class): void {
    this.openClassDialog(item);
  }
}
