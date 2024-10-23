import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '@models/courses';
import { Student } from '@models/students';
import { CourseService } from 'src/app/shared/services/course.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

interface CourseDialogData {
  course?: Course;
}

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
  ],
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
    // Initialize the form with validators
    this.courseForm = this.fb.group({
      title: [
        data.course?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        data.course?.description || '',
        [Validators.required, Validators.minLength(10)],
      ],
      students: [data.course?.students || []], // Allows multiple students
    });
  }

  ngOnInit(): void {
    // Fetch the list of students to populate the dropdown
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.alumniList = students;
    });
  }

  onSave(): void {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;

      if (this.data.course) {
        // If editing an existing course, update it
        this.courseService
          .updateCourseById(this.data.course.id, courseData)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      } else {
        // If creating a new course, add it
        this.courseService.addCourse(courseData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    } else {
      this.courseForm.markAllAsTouched(); // Highlight invalid fields
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog without saving
  }
}
