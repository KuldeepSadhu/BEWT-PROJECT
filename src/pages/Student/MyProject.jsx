import React from "react";

const MyProject = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage My Project</h2>
      <div className="bg-white p-8 rounded shadow border space-y-6">
        <section>
          <h3 className="text-xl font-bold border-b pb-2">Project Overview</h3>
          <p className="mt-2"><strong>Title:</strong> Smart Attendance System using Face Recognition</p>
          <p className="mt-1"><strong>Category:</strong> Computer Science / AI</p>
          <p className="mt-4 text-gray-600">
            This project aims to automate attendance tracking in college classrooms using 
            real-time facial identification to save time and prevent proxy entries.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-bold border-b pb-2">Submission Area</h3>
          <div className="mt-4 p-4 bord er-2 border-dashed border-gray-300 text-center rounded bg-gray-50">
            <p className="text-gray-500">Drag and drop your project report (PDF) here</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">Upload File</button>
          </div>
        </section>

        <section className="bg-yellow-50 p-4 border border-yellow-200 rounded">
          <h4 className="font-bold text-yellow-800">Note from Guide:</h4>
          <p className="text-sm text-yellow-700 italic mt-1">
            "Please complete the database schema diagram by next Friday. Good progress so far!" 
            - Prof. Rajesh
          </p>
        </section>
      </div>
    </div>
  );
};

export default MyProject;
