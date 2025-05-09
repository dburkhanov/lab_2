export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  year: number;
  createdAt: Date;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  createdAt: Date;
}