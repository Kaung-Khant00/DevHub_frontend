import React, { useEffect, useRef, useState } from "react";
import { FiThumbsUp, FiThumbsDown, FiUser, FiSend, FiPlusSquare, FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestionDetail, fetchQuestionMessages, sendMessage } from "../../../Redux/question/questionSlice";
import ImageWIthSkeleton from "../../../Components/Common/ImageWIthSkeleton";
import Spinner from "../../../Components/Common/Spinner";
import MessageSection from "../../../Components/Question/MessageSession";

export default function QuestionDetailPage() {
  // UI state
  const [messageBody, setMessageBody] = useState("");
  const [messageType, setMessageType] = useState("solution"); // 'solution' or 'comment'
  const [tab, setTab] = useState("all");
  const { data: question, loading } = useSelector((state) => state.question.detail);
  const { createCommentLoading } = useSelector((state) => state.question.create);
  const { messageLoading, allMessages, comments, solutions, messagePagination, commentPagination, solutionPagination } =
    useSelector((state) => state.question.messages);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isFetched = useRef(false);

  useEffect(() => {
    const fetchData = () => {
      if (!isFetched.current && !messageLoading) {
        isFetched.current = true;
        console.log("FETCHING MESSAGE 1 CUZ", isFetched.current);
        dispatch(fetchQuestionDetail({ id }));
        dispatch(fetchQuestionMessages({ id, pagination: messagePagination }));
      }
    };
    fetchData();
  }, []);
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
                ? messagePagination
                : tabType === "solution"
                ? { ...solutionPagination, type: "solution" }
                : { ...commentPagination, type: "comment" },
          })
        );
      }
    }
  }
  function sendMessageApi() {
    dispatch(sendMessage({ type: messageType, id, body: messageBody }));
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
        {/* Header */}
        <div className="card bg-base-100 shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ImageWIthSkeleton
                  src={question?.user?.profile_image_url}
                  alt="avatar"
                  className={"w-15 h-15 rounded-full"}
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold leading-tight">{question?.title}</h1>
              <div className="mt-2 text-sm text-muted">
                Posted by {question?.author?.name ?? "Anonymous"} • {question?.created_at}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-outline">ID #{question?.id}</div>
              {question?.is_anonymous && <div className="badge badge-warning">Anonymous</div>}
            </div>
          </div>

          <div className="prose mt-6">
            {/* You may want to sanitize/convert Markdown on real app */}
            <p style={{ whiteSpace: "pre-wrap" }}>{question?.body}</p>
          </div>
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

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted">Be respectful. Cite sources where relevant.</div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setMessageBody("");
                  setMessageType("solution");
                }}>
                Reset
              </button>
              <button onClick={sendMessageApi} className={`btn btn-primary`} disabled={createCommentLoading}>
                {createCommentLoading ? <Spinner /> : <FiSend className="mr-2" />} Post as a{" "}
                {messageType === "solution" ? "Solution" : "Comment"}
              </button>
            </div>
          </div>
        </div>
        {/*  Comments and solution section  */}
        <div className="card bg-base-100 p-4">
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
          <div>
            <MessageSection
              messages={tab === "all" ? allMessages : tab === "comment" ? comments : solutions}
              messageLoading={messageLoading}
              pagination={
                tab === "all" ? messagePagination : tab === "comment" ? commentPagination : solutionPagination
              }
              type={tab}
              id={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
