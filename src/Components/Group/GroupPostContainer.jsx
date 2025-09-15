import { useSelector } from "react-redux";
import Spinner from "../Common/Spinner";
import GroupPostCard from "./GroupPostCard";

const GroupPostContainer = () => {
  const { data, loading } = useSelector((state) => state.groupPost.fetch);

  return (
    <div>
      <div className="flex justify-center">{loading && <Spinner />}</div>

      {data.map((post) => (
        <GroupPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default GroupPostContainer;
