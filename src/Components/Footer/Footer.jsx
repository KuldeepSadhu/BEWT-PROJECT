import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/70 backdrop-blur">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">About SPMS</h3>
            <p className="text-sm text-slate-600">
              Student Project Management System, a unified platform for managing
              academic projects, groups, and evaluations.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/admin/dashboard"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="/faculty/dashboard"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/student/dashboard"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-slate-900">Contact</h3>
            <p className="text-sm text-slate-600">
              Email: support@spms.edu
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Student Project Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
