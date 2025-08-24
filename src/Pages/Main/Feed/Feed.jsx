import FilterTabs from "../../../Components/Feed/FilterTabs";
import Composer from "../../../Components/Feed/Composer";
import PostCard from "../../../Components/Feed/PostCard";
import CreatorSnapshot from "../../../Components/Feed/CreatorSnapshot";

const Feed = () => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 xl:px-8 pt-6 grid gap-6 xl:grid-cols-3">
      <main className="w-full col-span-2 ">
        <FilterTabs />
        <Composer />
        <div className="flex items-center flex-col mt-2">
          <PostCard />
        </div>
      </main>
      <div className="xl:block hidden">
        <CreatorSnapshot />
      </div>
    </div>
  );
};

export default Feed;
