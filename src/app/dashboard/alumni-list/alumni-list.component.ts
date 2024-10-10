import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StudentService, Student } from '../services/student.service';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
@Component({
  selector: 'app-alumni-list',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './alumni-list.component.html',
  styleUrl: './alumni-list.component.scss',
})
export class AlumniListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  editStudent(student: Student): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',
      data: { editingStudent: student },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.students.findIndex((s) => s.id === result.id);
        if (index !== -1) {
          this.students[index] = result;
        }
      }
    });
  }
  openModal(editingUser?: Student): void {
    this.dialog
      .open(StudentDialogComponent, {
        data: {
          editingUser,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingUser) {
              this.handleUpdate(editingUser.id, result);
            } else {
              this.students = [...this.students, result];
            }
          }
        },
      });
  }

  handleUpdate(id: number, update: Student): void {
    this.students = this.students.map((student) =>
      student.id === id ? update : student
    );
  }
}
