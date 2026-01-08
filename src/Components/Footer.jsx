import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-gray-900 tracking-tight">SPMS</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a>
          </div>

          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} College Student Project Management System
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Built with Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
