import { useSelector } from "react-redux";
import PostCard from "../Feed/PostCard";

const ProfilePosts = () => {
  const { userPosts } = useSelector((state) => state.user);
  return (
    <div className="flex items-center flex-col">
      {userPosts.loading && (
        <div className="text-center w-full py-5">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      )}
      {/* FIXME: I have to fix the post liking cuz it is not the same as liking post in postCard*/}

      {userPosts.data && userPosts.data.length > 0 && (
        <>
          {userPosts.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProfilePosts;
