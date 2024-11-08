import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '@models/students';
import { SharedModule } from '../../shared.module';

interface StudentDialogData {
  editingStudent?: Student;
}

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [SharedModule],

  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: StudentDialogData
  ) {
    this.studentForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          this.lettersOnlyValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          this.lettersOnlyValidator,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
    this.patchFormValue();
  }

  public get isEditing() {
    return !!this.data?.editingStudent;
  }
  lettersOnlyValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const lettersOnly = /^[A-Za-z]+$/.test(value);
    return lettersOnly ? null : { lettersOnly: true };
  }
  patchFormValue() {
    if (this.data?.editingStudent) {
      this.studentForm.patchValue(this.data.editingStudent);
    }
  }

  onSave(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.studentForm.value,
        id: this.isEditing
          ? this.data!.editingStudent!.id
          : this.generateRandomString(4),
        createdAt: this.isEditing
          ? this.data!.editingStudent!.createdAt
          : new Date(),
      });
    }
  }

  onDelete(): void {
    this.matDialogRef.close({
      action: 'delete',
      student: this.data!.editingStudent,
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
