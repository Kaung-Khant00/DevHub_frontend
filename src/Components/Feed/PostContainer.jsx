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
            <div className="card-body p-5 rounded shadow-sm my-2 max-w-[650px] bg-white flex w-full flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
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
