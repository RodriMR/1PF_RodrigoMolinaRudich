import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { StudentService, Student } from './student.service';
@Component({
  selector: 'app-alumni-list',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
  templateUrl: './alumni-list.component.html',
  styleUrl: './alumni-list.component.scss',
})
export class AlumniListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  editStudent(student: Student): void {
    // Implement edit functionality here
  }
}
