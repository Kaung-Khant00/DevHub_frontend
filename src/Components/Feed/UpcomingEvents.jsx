import CardShell from "../Common/CardShell";

function UpcomingEvents() {
  const items = [
    { date: "Sep 8", title: "React Yangon Meetup", href: "#" },
    { date: "Sep 19", title: "Laravel Live Asia (Online)", href: "#" },
    { date: "Oct 2", title: "Tailwind v4 Deep Dive", href: "#" },
  ];
  return (
    <CardShell
      title="Upcoming Events"
      action={<a className="link link-hover text-sm">All events</a>}
    >
      <ul className="space-y-3">
        {items.map((e) => (
          <li key={e.title} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="badge badge-neutral badge-lg">{e.date}</div>
              <a href={e.href} className="link link-hover">
                {e.title}
              </a>
            </div>
            <FaCalendarAlt className="opacity-70" />
          </li>
        ))}
      </ul>
    </CardShell>
  );
}
export default UpcomingEvents;
