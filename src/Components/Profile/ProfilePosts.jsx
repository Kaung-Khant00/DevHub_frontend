import PostCard from "../Feed/PostCard";

const ProfilePosts = ({ posts }) => {
  return (
    <div className="flex items-center flex-col">
      {posts.loading && (
        <div className="text-center w-full py-5">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      )}
      {/* FIXME: I have to fix the post liking cuz it is not the same as liking post in postCard*/}

      {posts.length > 0 && (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isInProfile={true} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProfilePosts;
