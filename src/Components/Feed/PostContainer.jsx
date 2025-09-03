import { useEffect, useRef } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../Redux/post/postSlice";

const PostContainer = () => {
  const dispatch = useDispatch();
  const { posts, pagination, fetch } = useSelector((state) => state.post);
  const isFetching = useRef(false);

  function loadMorePosts() {
    if (isFetching.current || pagination.page >= pagination.lastPage) return;
    isFetching.current = true;
    dispatch(
      fetchPosts(
        pagination.perPage,
        pagination.page,
        pagination.sortBy,
        isFetching
      )
    );
  }

  useEffect(() => {
    if (isFetching.current || pagination.page !== 1) return;
    isFetching.current = true;
    dispatch(
      fetchPosts(
        pagination.perPage,
        pagination.page,
        pagination.sortBy,
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
            <>
              {pagination.currentPage < pagination.lastPage ? (
                <button
                  onClick={loadMorePosts}
                  className="btn btn-primary mt-2"
                >
                  Show more
                </button>
              ) : (
                <div className="m-3 my-8 font-bold">
                  -- -- -- No more posts ! -- -- --{" "}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostContainer;
