import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import Spinner from "../Common/Spinner";
import { useDispatch } from "react-redux";
import { fetchQuestionMessages } from "../../Redux/question/questionSlice";
const MessageSection = ({ messages = [], messageLoading, pagination, id, type }) => {
  const dispatch = useDispatch();
  function loadMoreMessages() {
    if (pagination.page >= pagination.lastPage) return;
    dispatch(
      fetchQuestionMessages({
        id,
        pagination: { ...pagination, page: pagination.page + 1, type: type === "all" ? null : type },
      })
    );
  }

  return (
    <div className="w-full p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`border-b border-base-300 flex items-start gap-3 p-3 
  ${message.type === "solution" ? "bg-green-50 border-l-4 border-green-200" : "bg-base-100"}`}>
          <img src={message.user?.profile_image_url} className="w-10 h-10 rounded-full" alt={message.user?.name} />
          <div>{message.id}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{message.user?.name}</h3>

                {/* show solution badge when type === 'solution' */}
                {message.type === "solution" && (
                  <span className="badge badge-sm badge-success ml-2 flex items-center gap-1">Solution</span>
                )}
              </div>

              <span className="text-xs text-gray-500">{message.created_at}</span>
            </div>

            <p className={`mt-1 text-sm ${message.type === "solution" ? "text-gray-800" : "text-gray-700"}`}>
              {message.body}
            </p>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <button className="btn btn-ghost btn-xs flex items-center gap-1">
                <FiThumbsUp /> <span className="ml-1">{message.likes ?? 0}</span>
              </button>
              <button className="btn btn-ghost btn-xs flex items-center gap-1">
                <FiThumbsDown /> <span className="ml-1">{message.dislikes ?? 0}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {messageLoading ? (
        <div className="flex justify-center items-center h-10">
          <Spinner />
        </div>
      ) : (
        <>
          {pagination.page < pagination.lastPage ? (
            <div className="flex justify-center">
              <button onClick={loadMoreMessages} className="btn btn-sm w-30 btn-primary mt-2">
                load more
              </button>
            </div>
          ) : (
            <div className="m-3 my-5 text-center tracking-wider">-- -- -- End -- -- -- </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageSection;
