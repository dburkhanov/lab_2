import React, { useState, useEffect } from 'react';
import { BookPlus, Search, X, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { db } from '../db';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    code: '',
    name: '',
    description: '',
    credits: 3,
    department: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const storedCourses = await db.courses.toArray();
        setCourses(storedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: name === 'credits' ? parseInt(value, 10) : value
    });
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const courseToAdd: Course = {
        id: Date.now(),
        code: newCourse.code || '',
        name: newCourse.name || '',
        description: newCourse.description || '',
        credits: newCourse.credits || 3,
        department: newCourse.department || '',
        createdAt: new Date()
      };
      
      const id = await db.courses.add(courseToAdd);
      setCourses([...courses, { ...courseToAdd, id }]);
      
      setNewCourse({
        code: '',
        name: '',
        description: '',
        credits: 3,
        department: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage course offerings</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center"
          >
            {showAddForm ? (
              <>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </>
            ) : (
              <>
                <BookPlus className="h-4 w-4 mr-1" />
                Add Course
              </>
            )}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Course</h2>
          <form onSubmit={handleAddCourse}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="code" className="form-label">Course Code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={newCourse.code}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Course Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCourse.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group md:col-span-2">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="credits" className="form-label">Credits</label>
                <select
                  id="credits"
                  name="credits"
                  value={newCourse.credits}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value={1}>1 Credit</option>
                  <option value={2}>2 Credits</option>
                  <option value={3}>3 Credits</option>
                  <option value={4}>4 Credits</option>
                  <option value={5}>5 Credits</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="department" className="form-label">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={newCourse.department}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm 
              ? "No courses match your search criteria." 
              : "Start by adding a new course to the system."}
          </p>
          {searchTerm ? (
            <button 
              onClick={() => setSearchTerm('')}
              className="btn-secondary"
            >
              Clear Search
            </button>
          ) : (
            <button 
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              Add Course
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden card-hover">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{course.code}</h3>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{course.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{course.department}</span>
                  <span>{course.credits} Credit{course.credits !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;