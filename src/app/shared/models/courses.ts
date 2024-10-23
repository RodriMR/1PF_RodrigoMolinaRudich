import { Student } from '@models/students';

export interface Course {
  id: number;
  title: string;
  description: string;
  students: Student[];
  createdAt: Date;
}
