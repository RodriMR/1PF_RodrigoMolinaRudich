import { ClassService } from 'src/app/shared/services/classes.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '@models/courses';
import { Student } from '@models/students';
import { CourseService } from 'src/app/shared/services/course.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { SharedModule } from '../../shared.module';
import { Class } from '@models/classes';

interface ClassDialogData {
  item?: Class;
  editingClass?: Class;
}

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss'],
})
export class ClassDialogComponent implements OnInit {
  classForm: FormGroup;
  alumniList: Student[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClassDialogComponent>,
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData
  ) {
    this.classForm = this.fb.group({
      title: [
        data.item?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        data.item?.description || '',
        [Validators.required, Validators.minLength(10)],
      ],
    });
    console.log('data', data);
  }
  public get isEditing() {
    return !!this.data?.editingClass;
  }

  patchFormValue() {
    if (this.data?.editingClass) {
      this.classForm.patchValue(this.data.editingClass);
    }
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
    } else {
      this.dialogRef.close({
        ...this.classForm.value,
        id: this.isEditing
          ? this.data!.editingClass!.id
          : this.generateRandomString(4),
        createdAt: this.isEditing
          ? this.data!.editingClass!.createdAt
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
      item: this.data,
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
