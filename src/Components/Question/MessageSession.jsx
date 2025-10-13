import Spinner from "../Common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMessageType,
  deleteMessage,
  fetchQuestionMessages,
  toggleMessageDislike,
  toggleMessageLike,
} from "../../Redux/question/questionSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineThumbDownOffAlt, MdOutlineThumbUpOffAlt, MdThumbDown, MdThumbUp } from "react-icons/md";
const MessageSection = ({
  messages = [],
  messageLoading,
  pagination,
  id,
  type,
  setUpdatingId,
  setMessageBody,
  sortBy,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?.id);
  function loadMoreMessages() {
    if (pagination.page >= pagination.lastPage) return;
    dispatch(
      fetchQuestionMessages({
        id,
        pagination: { ...pagination, page: pagination.page + 1, type: type === "all" ? null : type, sortBy },
      })
    );
  }
  const deleteLoading = useSelector((state) => state.question.messages.deleteLoading);
  function toggleMessageLikeApi(messageId) {
    dispatch(toggleMessageLike(messageId));
  }
  function toggleMessageDislikeApi(messageId) {
    dispatch(toggleMessageDislike(messageId));
  }
  function changeMessageTypeApi(messageId) {
    dispatch(changeMessageType(messageId));
  }
  function deleteMessageApi(messageId) {
    dispatch(deleteMessage(messageId));
  }
  return (
    <div className="w-full p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col sm:flex-row sm:items-start gap-4 p-4 border-b border-base-300 rounded-lg 
  ${message.type === "solution" ? "bg-green-50 border-l-4 border-green-200" : "bg-base-100"}`}>
          {/* Avatar */}
          <img
            src={message.user?.profile_image_url}
            alt={message.user?.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-semibold text-sm truncate">{message.user?.name}</h3>
                {message.type === "solution" && <span className="badge badge-sm badge-success">Solution</span>}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{message.created_at}</span>
                {userId === message.user_id && (
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-square m-1 btn-xs">
                      <BsThreeDotsVertical size={20} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li>
                        <div
                          onClick={() => {
                            setUpdatingId(message.id);
                            setMessageBody(message.body);
                          }}>
                          Edit Message
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            changeMessageTypeApi(message.id);
                          }}>
                          Change into {message.type === "solution" ? "comment" : "solution"}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            deleteMessageApi(message.id);
                          }}
                          disabled={deleteLoading}
                          className="text-error ">
                          {deleteLoading && <Spinner />}Delete message
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-700 break-words">{message.body}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <button
                onClick={() => {
                  toggleMessageLikeApi(message.id);
                }}
                className="btn btn-ghost btn-sm flex items-center gap-1">
                {message.liked_by_user ? <MdThumbUp /> : <MdOutlineThumbUpOffAlt />} <span>{message.likes ?? 0}</span>
              </button>
              <button
                onClick={() => {
                  toggleMessageDislikeApi(message.id);
                }}
                className="btn btn-ghost btn-sm flex items-center gap-1">
                {message.disliked_by_user ? <MdThumbDown /> : <MdOutlineThumbDownOffAlt />}{" "}
                <span>{message.dislikes ?? 0}</span>
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
            <>
              {messages.length === 0 ? (
                <div className="flex justify-center items-center h-10">No messages</div>
              ) : (
                <div className="m-3 my-5 text-center tracking-wider">-- -- -- End -- -- -- </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MessageSection;
