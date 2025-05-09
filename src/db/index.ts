import Dexie, { Table } from 'dexie';
import { Student, Course } from '../types';

function logConnection(action: string) {
  const now = new Date();
  const ip = window.location.hostname;
  const logMessage = `[${now.toISOString()}] ${action} from IP: ${ip}`;
  console.log(logMessage);
  
}

class StudentTrackerDatabase extends Dexie {
  students!: Table<Student, number>;
  courses!: Table<Course, number>;

  constructor() {
    super('StudentTrackerDB');
    this.version(1).stores({
      students: '++id, firstName, lastName, email, studentId, year, createdAt',
      courses: '++id, code, name, department, credits, createdAt'
    });
    
    logConnection('Database connection opened');
    
    this.on('close', () => {
      logConnection('Database connection closed');
    });
  }
}

export const db = new StudentTrackerDatabase();

async function initializeDatabase() {
  const studentCount = await db.students.count();
  const courseCount = await db.courses.count();

  if (studentCount === 0) {
    const studentsData: Omit<Student, 'id'>[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        studentId: 'S12345',
        year: 2,
        createdAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        studentId: 'S12346',
        year: 3,
        createdAt: new Date()
      }
    ];

    try {
      await db.students.bulkAdd(studentsData);
      logConnection('Demo students added');
    } catch (error) {
      console.error('Error adding demo students:', error);
    }
  }

  if (courseCount === 0) {
    const coursesData: Omit<Course, 'id'>[] = [
      {
        code: 'CS101',
        name: 'Introduction to Computer Science',
        description: 'This course provides an introduction to computer science and programming concepts.',
        credits: 3,
        department: 'Computer Science',
        createdAt: new Date()
      },
      {
        code: 'MATH201',
        name: 'Calculus II',
        description: 'Advanced topics in calculus, including integration techniques and applications.',
        credits: 4,
        department: 'Mathematics',
        createdAt: new Date()
      }
    ];

    try {
      await db.courses.bulkAdd(coursesData);
      logConnection('Demo courses added');
    } catch (error) {
      console.error('Error adding demo courses:', error);
    }
  }
}

initializeDatabase();