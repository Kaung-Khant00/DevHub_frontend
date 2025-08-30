import FilterTabs from "../../../Components/Feed/FilterTabs";
import Composer from "../../../Components/Feed/Composer";
import CreatorSnapshot from "../../../Components/Feed/CreatorSnapshot";
import PostContainer from "../../../Components/Feed/PostContainer";

const Feed = () => {
  return (
    <div className=" mx-auto flex p-4 gap-3 max-w-7xl">
      <main className="w-full col-span-2 ">
        <FilterTabs />
        <Composer />
        <PostContainer />
      </main>
      <div className="xl:block hidden">
        <CreatorSnapshot />
      </div>
    </div>
  );
};

export default Feed;
