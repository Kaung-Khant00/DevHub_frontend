function FilterTabs() {
  return (
    <div className="cardBox">
      <div className=" p-1">
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
