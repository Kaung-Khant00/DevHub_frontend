function ProjectSpotlight() {
  return (
    <CardShell title="Project Spotlight">
      <div className="card bg-base-100 border border-base-300">
        <figure className="px-4 pt-4">
          <img
            src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop"
            alt="Project screenshot"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body p-4">
          <h4 className="card-title text-base">Open Source Kanban Board</h4>
          <p className="text-sm text-base-content/70">
            A Trello-like board built with React + Laravel. Drag & drop,
            real-time sync.
          </p>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < 4 ? "text-warning" : "opacity-40"}
              />
            ))}
            <span className="text-xs text-base-content/60">4.0</span>
          </div>
          <div className="card-actions justify-end mt-2">
            <button className="btn btn-sm btn-primary">View Project</button>
            <button className="btn btn-sm btn-outline">Star</button>
          </div>
        </div>
      </div>
    </CardShell>
  );
}
export default ProjectSpotlight;
