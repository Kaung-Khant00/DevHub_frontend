const SideBar = ({ group }) => {
  return (
    <aside className="lg:col-span-1 space-y-4">
      <div className="card bg-base-100 shadow-sm p-4">
        <div className="font-semibold mb-2">Rules</div>
        <ul className="list-disc list-inside text-sm text-muted">
          <li>Be respectful</li>
          <li>No spam or self-promotion</li>
          <li>Stay on topic</li>
        </ul>
      </div>
      <div className="card bg-base-100 shadow-sm p-4">
        <div className="font-medium mb-2">Members</div>
        <div className="text-sm text-muted">2 members</div>
        <div className="mt-3">
          <button className="btn btn-outline w-full">See all members</button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
