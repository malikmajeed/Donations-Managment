import React, { useState } from 'react';
// import StudentCard from './index.jsx'
import StudentPreviewCard from '../common/StudentPreviewCard';
import { useAllStudents } from '../../hooks/useStudents';

const STUDENTS_PER_PAGE = 9;

export default function StudentCatalog({ limit }) {
  const [page, setPage] = useState(1);
  const {  data: students = [], isPending, isError, error } = useAllStudents();

 

  if (isPending) {
    return <div className="text-center my-8">Loading students...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center my-8">{error.message}</div>;
  }

  // Pagination logic
  const totalPages = Math.ceil(students.length / STUDENTS_PER_PAGE);
  const startIdx = (page - 1) * STUDENTS_PER_PAGE;
  let currentStudents = students.slice(startIdx, startIdx + STUDENTS_PER_PAGE);

  // If limit is provided, use it instead of pagination
  if (limit) {
    currentStudents = students.slice(0, limit);
  }

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div>
      <div
        className={
          limit
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
            : 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto my-10'
        }
      >
        {currentStudents.map((student) => (
          <div key={student._id || student.id} className={limit ? 'm-0' : 'mx-auto'}>
            <StudentPreviewCard
             student={student}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!limit && (
        <div className="flex justify-center items-center gap-2 mb-10">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="bg-blue-50 text-blue-600 border border-blue-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100"
          >
            &laquo; Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                page === i + 1
                  ? 'bg-blue-600 text-white border border-blue-600'
                  : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="bg-blue-50 text-blue-600 border border-blue-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}
