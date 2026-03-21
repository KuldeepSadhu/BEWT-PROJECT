import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="app-shell flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 sm:p-10 shadow-md max-w-xl w-full">
        <h1 className="text-7xl font-extrabold text-red-500">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-2 mx-auto max-w-md text-gray-500 dark:text-gray-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
