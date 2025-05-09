import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, BarChart, Settings } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to StudentTracker
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive information system for managing students, courses, and educational data.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link to="/students" className="card-hover bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Manage Students
            </h2>
            <p className="text-gray-600">
              Add, view, edit and organize student records in the system.
            </p>
          </div>
        </Link>
        
        <Link to="/courses" className="card-hover bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Manage Courses
            </h2>
            <p className="text-gray-600">
              Create and manage course offerings, descriptions and schedules.
            </p>
          </div>
        </Link>
        
        <div className="card-hover bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <BarChart className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics
            </h2>
            <p className="text-gray-600">
              View enrollment statistics and performance metrics.
            </p>
          </div>
        </div>
        
        <div className="card-hover bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <Settings className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              System Settings
            </h2>
            <p className="text-gray-600">
              Configure system preferences and manage access permissions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          About This Project
        </h2>
        <p className="text-gray-700 mb-4">
          This StudentTracker Information System is developed as part of Lab 2 for Information Systems course. 
          The system is containerized using Docker for easy deployment and management.
        </p>
        <p className="text-gray-700">
          Current version includes basic student and course management functionality.
        </p>
      </div>
    </div>
  );
};

export default HomePage;