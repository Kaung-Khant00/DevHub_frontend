import CardShell from "../Common/CardShell";

function JobBoard() {
  const jobs = [
    { title: "Frontend Engineer", company: "Wave", level: "Mid", href: "#" },
    {
      title: "React Native Dev",
      company: "ShopGo",
      level: "Junior",
      href: "#",
    },
    {
      title: "Laravel Backend",
      company: "CodeCraft",
      level: "Senior",
      href: "#",
    },
  ];
  return (
    <CardShell
      title="Job Board"
      action={<a className="link link-hover text-sm">Post a job</a>}
    >
      <div className="space-y-3">
        {jobs.map((j) => (
          <div
            key={j.title}
            className="p-3 rounded-xl border border-base-300 hover:border-primary transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{j.title}</div>
                <div className="text-xs text-base-content/60">
                  {j.company} • {j.level}
                </div>
              </div>
              <a href={j.href} className="btn btn-sm btn-outline gap-2">
                <FaBriefcase /> Apply
              </a>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}
export default JobBoard;
