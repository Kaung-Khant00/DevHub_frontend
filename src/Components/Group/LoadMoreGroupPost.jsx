import { useSelector } from "react-redux";

const LoadMoreGroupPost = ({ loadMoreGroupPosts }) => {
  const pagination = useSelector((state) => state.groupPost.pagination);
  const { loading } = useSelector((state) => state.groupPost.fetch);

  return (
    <div className="pt-3 pb-6 text-center">
      {loading ? (
        <div className="flex justify-center my-3">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <button
          onClick={loadMoreGroupPosts}
          disabled={loading || pagination.current_page > pagination.last_page}
          className={`link link-hover link-primary text-sm ${
            pagination.current_page > pagination.last_page ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          {pagination.current_page <= pagination.last_page ? "See More Posts" : "No more posts"}
        </button>
      )}
    </div>
  );
};

export default LoadMoreGroupPost;
