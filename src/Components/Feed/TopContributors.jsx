import CardShell from "../Common/CardShell";

function TopContributors() {
  const people = [
    {
      id: 1,
      name: "Alex Carter",
      score: 932,
      img: "https://i.pravatar.cc/100?img=15",
    },
    {
      id: 2,
      name: "Mina Patel",
      score: 887,
      img: "https://i.pravatar.cc/100?img=11",
    },
    {
      id: 3,
      name: "Chen Li",
      score: 844,
      img: "https://i.pravatar.cc/100?img=5",
    },
  ];
  return (
    <CardShell
      title="Top Contributors"
      action={<a className="link link-hover text-sm">See leaderboard</a>}
    >
      <ul className="space-y-3">
        {people.map((p, i) => (
          <li key={p.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={p.img} alt={p.name} />
                </div>
              </div>
              <div>
                <div className="font-medium leading-tight">
                  {i + 1}. {p.name}
                </div>
                <div className="text-xs text-base-content/60">
                  {p.score} pts
                </div>
              </div>
            </div>
            <button className="btn btn-xs btn-outline">
              <FaUserPlus /> Follow
            </button>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}
export default TopContributors;
