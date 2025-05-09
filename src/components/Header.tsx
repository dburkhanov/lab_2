import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BookOpen as BookIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">StudentTracker</span>
          </Link>
          
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/students" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
            >
              <Users className="h-4 w-4 mr-1" />
              Students
            </Link>
            <Link 
              to="/courses" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
            >
              <BookIcon className="h-4 w-4 mr-1" />
              Courses
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;