export default function Pagination({ currentPage = 1, totalPages = 1, setPage, loading, maxButtons = 5 }) {
  if (totalPages <= 1) return null;

  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const go = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    console.log(page);
    setPage(page);
  };

  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <button
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`btn btn-ghost ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Previous page">
        ‹
      </button>

      <ul className="flex gap-1 list-none p-0 m-0">
        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => go(p)}
              disabled={loading}
              className={`btn btn-sm ${p === currentPage ? "btn-primary text-white" : "btn-ghost"} `}>
              {p}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`btn btn-ghost ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Next page">
        ›
      </button>
    </nav>
  );
}
