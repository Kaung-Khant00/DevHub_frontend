function FilterTabs() {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body p-1">
        <div className="tabs tabs-boxed">
          <a className="tab tab-active">Newest</a>
          <a className="tab">Trending</a>
          <a className="tab">Following Posts</a>
        </div>
      </div>
    </div>
  );
}
export default FilterTabs;
