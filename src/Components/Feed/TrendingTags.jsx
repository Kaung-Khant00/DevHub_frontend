import CardShell from "../Common/CardShell";

function TrendingTags() {
  const tags = [
    { name: "react", posts: 421 },
    { name: "laravel", posts: 318 },
    { name: "tailwindcss", posts: 275 },
    { name: "typescript", posts: 203 },
    { name: "docker", posts: 186 },
  ];
  return (
    <CardShell
      title={
        <div className="flex items-center gap-2">
          <FaFire className="text-warning" /> <span>Trending Tags</span>
        </div>
      }
      action={<a className="link link-hover text-sm">View all</a>}
    >
      <ul className="menu">
        {tags.map((t) => (
          <li key={t.name}>
            <a className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FaTag /> #{t.name}
              </span>
              <span className="badge badge-ghost">{t.posts}</span>
            </a>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}
export default TrendingTags;
