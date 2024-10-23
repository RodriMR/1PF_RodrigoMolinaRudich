import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../shared/services/student.service';
import { Student } from '@models/students';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

@Component({
  selector: 'app-alumni-list',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './alumni-list.component.html',
  styleUrls: ['./alumni-list.component.scss'],
})
export class AlumniListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  editStudent(student: Student): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data: { editingStudent: student },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'delete') {
          this.studentService.deleteStudent(result.student.id.toString());
        } else {
          this.studentService.updateStudentById(result.id.toString(), result);
        }
      }
    });
  }

  openModal(editingUser?: Student): void {
    this.dialog
      .open(StudentDialogComponent, {
        data: { editingUser },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.studentService.addStudent(result);
        }
      });
  }
}
