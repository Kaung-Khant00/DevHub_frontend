import { useEffect, useRef } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { __FETCH_POSTS__ } from "../../Redux/post/postAction";

const PostContainer = () => {
  const dispatch = useDispatch();
  const { posts, pagination, fetch } = useSelector((state) => state.post);
  const isFetching = useRef(false);

  function loadMorePosts() {
    if (isFetching.current || pagination.currentPage >= pagination.lastPage)
      return;
    isFetching.current = true;
    dispatch(
      __FETCH_POSTS__(
        pagination.perPage,
        pagination.page,
        pagination.category,
        isFetching
      )
    );
  }

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    dispatch(
      __FETCH_POSTS__(
        pagination.perPage,
        pagination.page,
        pagination.category,
        isFetching
      )
    );
  }, []);
  return (
    <div className="flex items-center flex-col mt-2">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
      {posts.length === 0 && !fetch.loading ? (
        <div className="m-3">No posts found</div>
      ) : (
        <>
          {fetch.loading ? (
            <div className="m-3">
              <span className="loading loading-spinner loading-xl text-primary"></span>
            </div>
          ) : (
            <div
              onClick={loadMorePosts}
              className="text-lg text-primary hover:underline mt-3 mb-10"
            >
              Show More
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostContainer;
