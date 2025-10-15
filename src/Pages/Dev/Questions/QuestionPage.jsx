import { useState, useEffect } from "react";
import { FiPlus, FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeStatus, fetchQuestions } from "../../../Redux/question/questionSlice";
import Spinner from "../../../Components/Common/Spinner";
import Pagination from "../../Admin/Pagination";
import QuestionCard from "../../../Components/Question/QuestionCard";

// DevQPage.jsx
// Single-file React component using TailwindCSS + DaisyUI + react-icons
// Drop this file into your React app (ensure Tailwind + DaisyUI are configured)

export default function DevQPage() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const pagination = useSelector((state) => state.question.pagination);
  const [page, setPage] = useState(pagination.page || 1);
  const { data: questions, loading, sortBy, status } = useSelector((state) => state.question.fetch);
  console.log("CHECKING PAGE NO.", page);
  useEffect(() => {
    if (questions) {
      dispatch(fetchQuestions({ perPage: pagination.perPage, page, searchQuery, status, sortBy }));
    }
  }, [status, sortBy, page]);
  useEffect(() => {
    if (!questions) {
      dispatch(fetchQuestions({ perPage: pagination.perPage, page: 1, searchQuery, status, sortBy }));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-base-200 w-full">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold ">Developer Q • Ask & Discover</h1>
            <p className="text-sm opacity-70">Concise questions. Fast answers. Clear outcomes.</p>
          </div>

          <Link to="create" className="sm:hidden flex btn btn-primary btn-sm gap-2 w-full sm:mt-0 mt-3">
            <FiPlus /> Create Question
          </Link>
        </header>

        {/* search + filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="input w-full">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && dispatch(fetchQuestions({ ...pagination, searchQuery, status, sortBy }));
                }}
              />
            </label>
          </div>

          <div className="flex gap-2 md:col-span-2 items-center w-full">
            <div className="w-full flex-1">
              <select
                className="select select-bordered w-full"
                onChange={(e) => {
                  dispatch(changeStatus(e.target.value));
                }}>
                <option value={""}>All</option>
                <option value={false} className="text-error">
                  Unsolved
                </option>
                <option value={1} className="text-success">
                  Solved
                </option>
              </select>
            </div>

            <div className="w-full flex-2">
              <select
                className="select select-bordered w-full "
                onChange={(e) => dispatch(fetchQuestions({ ...pagination, sortBy: e.target.value, status }))}>
                <option value={"created_at,desc"}>Newest</option>
                <option value={"created_at,asc"}>Oldest</option>
                <option>Popular</option>
                <option value="">Most comment</option>
              </select>
            </div>
          </div>
          <Link to="create" className="btn btn-primary gap-2 w-full sm:mt-0 mt-3 sm:flex hidden">
            <FiPlus /> Create Question
          </Link>
        </div>

        {/* results */}
        <div className="space-y-4">
          {questions.length > 0 ? (
            questions.map((q) => <QuestionCard key={q.id} question={q} />)
          ) : loading ? (
            <div className="flex justify-center h-30 items-center">
              <Spinner />
            </div>
          ) : (
            questions.length === 0 && (
              <div className="flex flex-col justify-center items-center">
                <FiFilter size={20} />
                <strong>No questions found.</strong>
              </div>
            )
          )}
          <div className="flex justify-center">
            <Pagination currentPage={page} totalPages={pagination.lastPage} setPage={setPage} loading={loading} />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
