import React from 'react';
import { Link } from 'react-router-dom';
import { Banknote } from 'lucide-react';

const GlobalAppFooter: React.FC = () => {
  console.log('GlobalAppFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Banknote className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">TSB Bank</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <Link to="/help" className="hover:text-blue-600 transition-colors">Help</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          </nav>
          <div className="text-center md:text-right">
            <p className="text-xs text-muted-foreground">
              Security Information: Always protect your login details.
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} TSB Bank. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalAppFooter;