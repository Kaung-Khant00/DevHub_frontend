import React, { useState, useMemo } from "react";
import { FiPlus, FiFilter, FiUser, FiClock, FiCheckCircle } from "react-icons/fi";
import { MdThumbUpOffAlt } from "react-icons/md";
import { Link } from "react-router-dom";

// DevQPage.jsx
// Single-file React component using TailwindCSS + DaisyUI + react-icons
// Drop this file into your React app (ensure Tailwind + DaisyUI are configured)

export default function DevQPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ tag: "All", status: "All", sort: "Newest" });
  const [newQ, setNewQ] = useState({ title: "", summary: "", tags: "", anonymous: false });

  // placeholder dataset — replace with API data
  const sample = [
    {
      id: 1,
      title: "How to optimize MongoDB queries for large collections?",
      summary: "I have a collection of ~10M docs and queries are slow when using aggregate pipelines.",
      tags: ["mongodb", "performance"],
      author: "Nay Win",
      votes: 12,
      answers: 3,
      solved: false,
      createdAt: "2025-10-07",
    },
    {
      id: 2,
      title: "Best practices for environment config in MERN apps",
      summary: "Where to store secrets and how to manage multiple envs without leaking keys?",
      tags: ["mern", "devops"],
      author: "Aye",
      votes: 8,
      answers: 1,
      solved: true,
      createdAt: "2025-10-05",
    },
    {
      id: 3,
      title: "React state management for mid-size apps (hooks vs redux)",
      summary: "When should I move from useContext/useReducer to a central store?",
      tags: ["react", "state-management"],
      author: "Ko",
      votes: 5,
      answers: 0,
      solved: false,
      createdAt: "2025-10-01",
    },
  ];

  const tags = useMemo(() => ["All", "react", "mongodb", "mern", "performance", "devops", "state-management"], []);

  const results = sample
    .filter((q) => filters.tag === "All" || q.tags.includes(filters.tag))
    .filter((q) => filters.status === "All" || (filters.status === "Solved" ? q.solved : !q.solved))
    .filter((q) => {
      if (!query) return true;
      const text = (q.title + q.summary + q.tags.join(" ")).toLowerCase();
      return text.includes(query.toLowerCase());
    })
    .sort((a, b) => {
      if (filters.sort === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (filters.sort === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (filters.sort === "Top") return b.votes - a.votes;
      return 0;
    });

  function resetNewQ() {
    setNewQ({ title: "", summary: "", tags: "", anonymous: false });
  }

  function handleCreateSubmit(e) {
    e.preventDefault();
    // Minimal payload — integrate with your API here
    const payload = {
      title: newQ.title.trim(),
      summary: newQ.summary.trim(),
      tags: newQ.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      anonymous: !!newQ.anonymous,
    };
    console.log("Create question payload:", payload);
    // optimistic UI: close modal and clear form
    resetNewQ();
    // TODO: call backend and refresh list
  }

  return (
    <div className="min-h-screen p-6 bg-base-200 w-full">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Developer Q • Ask & Discover</h1>
            <p className="text-sm opacity-70">Concise questions. Fast answers. Clear outcomes.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="create" className="btn btn-primary btn-sm gap-2">
              <FiPlus /> Create Question
            </Link>
          </div>
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
              <input type="search" required placeholder="Search" />
            </label>
          </div>

          <div className="flex gap-2 md:col-span-2 items-center w-full">
            <div className="w-full flex-1">
              <select
                className="select select-bordered w-full"
                value={filters.status}
                onChange={(e) => setFilters((s) => ({ ...s, status: e.target.value }))}>
                <option>All</option>
                <option className="text-error">Unsolved</option>
                <option className="text-success">Solved</option>
              </select>
            </div>

            <div className="w-full flex-2">
              <select
                className="select select-bordered w-full "
                value={filters.sort}
                onChange={(e) => setFilters((s) => ({ ...s, sort: e.target.value }))}>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Popular</option>
                <option value="">Most comment</option>
              </select>
            </div>
          </div>
        </div>

        {/* results */}
        <div className="space-y-4">
          {results.map((q) => (
            <article
              key={q.id}
              className={`border-l-4 ${
                q.solved ? "border-success" : "border-gray-400"
              } card card-compact bg-base-100 shadow-md`}>
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{q.title}</h3>
                    <p className="text-sm opacity-75 mt-1">{q.summary}</p>
                    <div className="w-full flex justify-between items-center">
                      <div className="mt-3 flex flex-wrap gap-2">
                        {q.tags.map((t) => (
                          <div key={t} className="badge badge-outline badge-sm">
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MdThumbUpOffAlt size={18} /> {q.votes}
                      </div>
                      <div className="flex items-center gap-1">💬 {q.answers} answers</div>
                    </div>
                    <div className="text-xs opacity-70 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <FiClock /> {q.createdAt}
                      </span>
                    </div>
                    <button className="btn btn-outline btn-primary btn-sm w-20">View</button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {results.length === 0 && (
            <div className="alert shadow-lg">
              <div>
                <FiFilter />
                <span>No questions match your criteria. Try clearing filters or create a new question.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
