import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StudentService, Student } from '../services/student.service';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './user-dialog/user-dialog.component';
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
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  editStudent(student: Student): void {
    // Implement edit functionality here
  }
  openModal(editingUser?: Student): void {
    this.matDialog
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
