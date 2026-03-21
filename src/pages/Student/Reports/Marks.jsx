import React from "react";
import { useSubmissions } from "../../../hooks/useSpmsData";

const Marks = () => {
  const { data: submissions, isLoading, error } = useSubmissions();
  const reviewFiles = submissions.slice(0, 3);
  const obtainedTotal = reviewFiles.reduce((sum, item, index) => {
    if (item.grade === "A") return sum + [10, 30, 20][index];
    if (item.grade === "B+") return sum + [8, 24, 16][index];
    if (item.grade === "C") return sum + [6, 18, 12][index];
    return sum;
  }, 0);
  const maxMarks = [10, 30, 20];

  if (isLoading) {
    return <div className="p-6">Loading marks...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load marks.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Marks</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">Evaluation Component</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Max Marks</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Obtained Marks</th>
              <th className="p-4 border-b dark:border-gray-600">Remarks</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {reviewFiles.map((item, index) => {
              const obtained = item.grade === "A" ? maxMarks[index] : item.grade === "B+" ? Math.round(maxMarks[index] * 0.8) : Math.round(maxMarks[index] * 0.6);
              return (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="p-4 font-semibold">{item.title}</td>
                  <td className="p-4 text-center">{maxMarks[index]}</td>
                  <td className="p-4 text-center font-bold text-green-600">{obtained}</td>
                  <td className="p-4 text-sm">{item.remarks}</td>
                </tr>
              );
            })}
            <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <td className="p-4 font-bold text-right">Total</td>
              <td className="p-4 text-center font-bold">60</td>
              <td className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">{obtainedTotal}</td>
              <td className="p-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
