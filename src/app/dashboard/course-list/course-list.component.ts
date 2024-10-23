import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/services/course.service';
import { Course } from '@models/courses';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }
}
