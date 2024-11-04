import { Student } from '@models/students';
import { Class } from '@models/classes';
export interface Course {
  id: number;
  title: string;
  description: string;
  students: Student[];
  classes: Class[];
  createdAt: Date;
}
