import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '@models/courses';
import { Student } from '@models/students';
import { CourseService } from 'src/app/shared/services/course.service';
import { StudentService } from 'src/app/shared/services/student.service';

interface CourseDialogData {
  course?: Course;
}

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
})
export class CourseDialogComponent implements OnInit {
  courseForm: FormGroup;
  alumniList: Student[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private courseService: CourseService,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: CourseDialogData
  ) {
    this.courseForm = this.fb.group({
      title: [data.course?.title || '', [Validators.required]],
      description: [data.course?.description || '', [Validators.required]],
      students: [data.course?.students || []], // Multiple students can be selected
    });
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.alumniList = students;
    });
  }

  onSave(): void {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      if (this.data.course) {
        this.courseService.updateCourseById(this.data.course.id, courseData);
      } else {
        this.courseService.addCourse(courseData);
      }
      this.dialogRef.close(true); 
    } else {
      this.courseForm.markAllAsTouched(); 
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
