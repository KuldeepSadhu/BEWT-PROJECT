import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-700/80 bg-slate-950/75 backdrop-blur">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-3 font-semibold text-slate-100">About SPMS</h3>
            <p className="text-sm text-slate-400">
              Student Project Management System, a unified platform for managing
              academic projects, groups, and evaluations.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-slate-100">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/admin/dashboard"
                  className="text-slate-400 transition-colors hover:text-slate-200"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="/faculty/dashboard"
                  className="text-slate-400 transition-colors hover:text-slate-200"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/student/dashboard"
                  className="text-slate-400 transition-colors hover:text-slate-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-slate-100">Contact</h3>
            <p className="text-sm text-slate-400">
              Email: support@spms.edu
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-700/80 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Student Project Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
