import { useEffect, useRef, useState } from "react";
import { FiSend, FiPlusSquare, FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteQuestion,
  fetchQuestionDetail,
  fetchQuestionMessages,
  resetMessages,
  sendMessage,
  updateMessage,
} from "../../../Redux/question/questionSlice";
import ImageWIthSkeleton from "../../../Components/Common/ImageWIthSkeleton";
import Spinner from "../../../Components/Common/Spinner";
import MessageSection from "../../../Components/Question/MessageSession";
import ReturnBackButton from "../../../Components/Common/ReturnBackButton";
import { TbUserQuestion } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";

export default function QuestionDetailPage() {
  const navigate = useNavigate();
  const [messageBody, setMessageBody] = useState("");
  const [messageType, setMessageType] = useState("solution"); // 'solution' or 'comment'
  const [tab, setTab] = useState("all");
  const [sortBy, setSortBy] = useState("created_at,desc");
  const [updatingId, setUpdatingId] = useState(null);
  const { data: question, loading } = useSelector((state) => state.question.detail);
  const { loading: createCommentLoading, errors } = useSelector((state) => state.question.create);

  const { messageLoading, allMessages, comments, solutions, messagePagination, commentPagination, solutionPagination } =
    useSelector((state) => state.question.messages);
  const deleteLoading = useSelector((state) => state.question.fetch.deleteLoading);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isFetched = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      if (!isFetched.current && !messageLoading) {
        isFetched.current = true;
        if (question?.id && question?.id !== id) {
          dispatch(resetMessages());
        }
        console.log("FETCHING MESSAGE 1 CUZ", isFetched.current);
        dispatch(fetchQuestionDetail({ id }));
        dispatch(fetchQuestionMessages({ id, pagination: { ...messagePagination, sortBy } }));
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    inputRef.current.focus();
  }, [updatingId]);
  function handleTabChange(tabType) {
    if (tabType !== "all") {
      setMessageType(tabType);
    }
    if (tab !== tabType) {
      setTab(tabType);
      if (
        (tabType === "solution" && !solutionPagination.lastPage) ||
        (tabType === "comment" && !commentPagination.lastPage)
      ) {
        dispatch(
          fetchQuestionMessages({
            id,
            pagination:
              tabType === "all"
                ? { ...messagePagination, sortBy }
                : tabType === "solution"
                ? { ...solutionPagination, sortBy, type: "solution" }
                : { ...commentPagination, sortBy, type: "comment" },
          })
        );
      }
    }
  }
  function updateMessageApi() {
    dispatch(updateMessage({ body: messageBody, id: updatingId }));
    setUpdatingId(null);
    setMessageBody("");
  }
  function sendMessageApi() {
    dispatch(sendMessage({ type: messageType, id, body: messageBody }));
    setMessageBody("");
  }
  function handleSortChangeApi(sortBy) {
    setSortBy(sortBy);
    dispatch(
      fetchQuestionMessages({
        id,
        pagination:
          tab === "all"
            ? { ...messagePagination, page: 1, sortBy }
            : tab === "solution"
            ? { ...solutionPagination, page: 1, type: "solution", sortBy }
            : { ...commentPagination, page: 1, type: "comment", sortBy },
      })
    );
  }
  function deleteQuestionApi() {
    try {
      dispatch(deleteQuestion({ id }));
      navigate("/question");
      toast.success("Question deleted successfully!");
    } catch {
      toast.error("Something went wrong!");
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 w-full">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <div className="mt-3 text-sm text-muted">Loading question…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-12 w-full">
      <div className="w-full">
        <ReturnBackButton defaultBackTo="/question" />
        {/* Header */}
        <div className="card bg-base-100 shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="avatar">
              <div className="w-15 h-15 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {question?.is_anonymous ? (
                  <div className="flex justify-center items-center w-full h-full bg-base-300">
                    <TbUserQuestion size={24} />
                  </div>
                ) : (
                  <ImageWIthSkeleton
                    src={question?.user?.profile_image_url}
                    alt="avatar"
                    className={"w-full h-full rounded-full"}
                  />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold leading-tight hidden sm:block">{question?.title}</h1>
              <div className="mt-2 text-sm text-muted">
                Posted by {question?.user?.name ?? "Anonymous"} • {question?.created_at}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {question?.is_anonymous && <div className="badge badge-warning">Anonymous</div>}
              {question?.is_owner && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-circle m-1">
                    <BsThreeDotsVertical size={20} />
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <Link to={`/question/${question?.id}/edit`}>Edit Question</Link>
                    </li>
                    <li>
                      <button disabled={deleteLoading} onClick={deleteQuestionApi} className="text-error">
                        {deleteLoading && <Spinner />}Delete Question
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="prose mt-6">
            {/* You may want to sanitize/convert Markdown on real app */}
            <h1 className="text-xl font-bold leading-tight block sm:hidden">{question?.title}</h1>
            <p className="text-muted text-md" style={{ whiteSpace: "pre-wrap" }}>
              {question?.body}
            </p>
          </div>
          <div className="relative max-w-96 my-2">
            <ImageWIthSkeleton src={question?.image_url} alt="question image" className={"w-full h-full peer"} />
            <a
              href={question?.image_url}
              target="_black"
              className="absolute inset-0 peer-hover:bg-black/70 peer-hover:flex hover:flex justify-center backdrop-blur-md items-center hidden">
              <div className="text-white">View Image</div>
            </a>
          </div>
          {question?.code_snippet && (
            <div className="p-2 rounded bg-gray-100">
              <span className="text-sm text-gray-500 ps-2">Code Snippet</span>
              <pre>{question?.code_snippet}</pre>
            </div>
          )}
        </div>

        {/* Comment composer */}
        <div className="card bg-base-100 shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Add a comment</h2>
            <div className="btn-group space-x-2">
              {tab === "all" && (
                <>
                  <button
                    className={`btn btn-sm ${messageType === "solution" ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => setMessageType("solution")}
                    aria-pressed={messageType === "solution"}>
                    <FiCheckCircle className="mr-2" size={18} /> Solution
                  </button>
                  <button
                    className={`btn btn-sm ${messageType === "comment" ? "btn-accent" : "btn-ghost"}`}
                    onClick={() => setMessageType("comment")}
                    aria-pressed={messageType === "comment"}>
                    <FiPlusSquare className="mr-2" size={18} /> Comment
                  </button>
                </>
              )}
            </div>
          </div>

          <textarea
            ref={inputRef}
            className="textarea textarea-bordered w-full mt-4"
            rows={4}
            placeholder={
              messageType === "solution"
                ? "Provide a concise solution or code snippet..."
                : "Start a comment or give feedback..."
            }
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
          />
          {errors?.body && <div className="text-danger text-sm">{errors?.body}</div>}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted hidden sm:block">Be respectful. Cite sources where relevant.</div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setMessageBody("");
                }}>
                Reset
              </button>
              <button
                onClick={() => {
                  updatingId ? updateMessageApi() : sendMessageApi();
                }}
                className={`btn btn-primary`}
                disabled={createCommentLoading}>
                {createCommentLoading ? <Spinner /> : <FiSend className="mr-2" />}{" "}
                {updatingId ? (
                  <span>Update</span>
                ) : (
                  <span>Post as a {messageType === "solution" ? "Solution" : "Comment"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
        {/*  Comments and solution section  */}
        <div className="card bg-base-100 p-4">
          <div className="flex justify-between sm:flex-row flex-col">
            <div role="tablist" className="tabs tabs-box w-fit">
              <div
                role="tab"
                className={`tab w-24 ${tab === "all" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("all")}>
                All
              </div>
              <div
                role="tab"
                className={`tab w-24 ${tab === "comment" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("comment")}>
                Comments
              </div>
              <div
                role="tab"
                className={`tab w-24 ${tab === "solution" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("solution")}>
                Solution
              </div>
            </div>
            <select className="select select-sm sm:mt-0 mt-3" onChange={(e) => handleSortChangeApi(e.target.value)}>
              <option value="created_at,desc" selected>
                Latest
              </option>
              <option value="created_at,asc">Oldest</option>
              <option value="likes,desc">Most Liked</option>
            </select>
          </div>
          <div>
            <MessageSection
              messages={tab === "all" ? allMessages : tab === "comment" ? comments : solutions}
              messageLoading={messageLoading}
              pagination={
                tab === "all" ? messagePagination : tab === "comment" ? commentPagination : solutionPagination
              }
              type={tab}
              id={id}
              setUpdatingId={setUpdatingId}
              setMessageBody={setMessageBody}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
