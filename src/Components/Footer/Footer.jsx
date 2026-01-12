import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 dark:text-gray-400 mt-auto border-t border-gray-700 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-white dark:text-gray-100 font-semibold mb-3">About SPMS</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Student Project Management System - A comprehensive platform for managing 
              academic projects, groups, and evaluations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white dark:text-gray-100 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white dark:text-gray-100 font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Email: support@spms.edu<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 dark:border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>© {currentYear} Student Project Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
