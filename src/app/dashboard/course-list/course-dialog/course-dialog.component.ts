import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '@models/courses';
import { Student } from '@models/students';
import { CourseService } from 'src/app/shared/services/course.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { SharedModule } from '../../shared.module';


interface CourseDialogData {
  course?: Course;
  editingCourse?: Course;
}

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [

    SharedModule
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
    this.courseForm = this.fb.group({
      title: [
        data.course?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        data.course?.description || '',
        [Validators.required, Validators.minLength(10)],
      ],
      students: [data.course?.students || []],
    });
  }
  public get isEditing() {
    return !!this.data?.editingCourse;
  }

  patchFormValue() {
    if (this.data?.editingCourse) {
      this.courseForm.patchValue(this.data.editingCourse);
    }
  }

  ngOnInit(): void {
    // Fetch the list of students to populate the dropdown
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.alumniList = students;
    });
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close({
        ...this.courseForm.value,
        id: this.isEditing
          ? this.data!.editingCourse!.id
          : this.generateRandomString(4),
        createdAt: this.isEditing
          ? this.data!.editingCourse!.createdAt
          : new Date(),
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
  onDelete(): void {
    this.dialogRef.close({
      action: 'delete',
      course: this.data,
    });
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
