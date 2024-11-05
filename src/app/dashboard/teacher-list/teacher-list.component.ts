import { Component, OnInit } from '@angular/core';
import { Teacher } from '@models/teachers';
import { SharedModule } from '../shared.module';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data.map((teacher) => ({
        ...teacher,
        avatarUrl: this.getRandomImageUrl(),
      }));
      console.log(this.teachers);
    });
  }
  private getRandomImageUrl(): string {
    const randomIndex = Math.floor(Math.random() * 6) + 1;
    return `assets/avatar-${randomIndex}.png`;
  }
}
