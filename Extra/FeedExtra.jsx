function SectionShell({ title, action, children }) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-md">
      <div className="card-body p-5">
        <div className="flex items-center justify-between">
          <h3 className="card-title text-base font-bold">{title}</h3>
          {action}
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
function WeeklyGoals() {
  return (
    <SectionShell
      title="Weekly Goals"
      action={<a className="link link-hover text-sm">Edit</a>}
    >
      <ul className="space-y-3">
        <li>
          <div className="flex items-center justify-between">
            <span>Publish 2 posts</span>
            <span className="text-sm">1/2</span>
          </div>
          <progress className="progress w-full" value={50} max={100}></progress>
        </li>
        <li>
          <div className="flex items-center justify-between">
            <span>Answer 5 questions</span>
            <span className="text-sm">3/5</span>
          </div>
          <progress className="progress w-full" value={60} max={100}></progress>
        </li>
        <li>
          <div className="flex items-center justify-between">
            <span>Refactor side project</span>
            <span className="text-sm">40%</span>
          </div>
          <progress className="progress w-full" value={40} max={100}></progress>
        </li>
      </ul>
    </SectionShell>
  );
}

function PinnedCollections() {
  const cols = [
    { name: "React Performance", count: 18 },
    { name: "Laravel Queues", count: 11 },
    { name: "UI Patterns", count: 25 },
  ];
  return (
    <SectionShell
      title="Pinned Collections"
      action={<a className="link link-hover text-sm">Manage</a>}
    >
      <div className="flex flex-wrap gap-2">
        {cols.map((c) => (
          <div key={c.name} className="badge badge-lg badge-outline gap-2">
            <FaBook /> {c.name}{" "}
            <span className="badge badge-ghost">{c.count}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function CommunityPicks() {
  const items = [
    { t: "The new React compiler in plain English", by: "Alicia", score: 97 },
    { t: "Why your CSS is slow (and how to fix it)", by: "Jon", score: 76 },
    { t: "Queues vs. Events: the Laravel way", by: "Soe", score: 71 },
  ];
  return (
    <SectionShell
      title="Community Picks"
      action={<a className="link link-hover text-sm">See all</a>}
    >
      <ul className="menu">
        {items.map((it) => (
          <li key={it.t}>
            <a>
              <span className="flex-1">
                <div className="font-medium leading-tight">{it.t}</div>
                <div className="text-xs text-base-content/60">by {it.by}</div>
              </span>
              <span className="badge badge-ghost">
                <FaStar className="mr-1" /> {it.score}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

function OpenBounties() {
  const bounties = [
    { t: "Fix SSR hydration bug", tag: "react", reward: "$150" },
    { t: "Optimize Eloquent query", tag: "laravel", reward: "$120" },
    { t: "Improve grid RTL support", tag: "tailwind", reward: "$90" },
  ];
  return (
    <SectionShell
      title="Open Bounties"
      action={<a className="link link-hover text-sm">Post a bounty</a>}
    >
      <div className="space-y-3">
        {bounties.map((b) => (
          <div
            key={b.t}
            className="p-3 rounded-xl border border-base-300 hover:border-primary transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{b.t}</div>
                <div className="text-xs text-base-content/60">#{b.tag}</div>
              </div>
              <button className="btn btn-sm btn-outline">{b.reward}</button>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
