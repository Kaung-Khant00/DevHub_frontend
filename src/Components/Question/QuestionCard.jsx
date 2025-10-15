import { MdThumbUpAlt, MdThumbUpOffAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleQuestionLike } from "../../Redux/question/questionSlice";
import { FiClock } from "react-icons/fi";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";

const QuestionCard = ({ question }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(question.is_liked);
  const likeLoading = useSelector((state) => state.question.likeLoading);
  function toggleQuestionLikeApi(id) {
    dispatch(toggleQuestionLike(id));
    setIsLiked((pre) => !pre);
  }
  const isLong = question.body.length > 100;
  const displayText = isLong ? question.body.slice(0, 100) + "..." : question.body;
  return (
    <article
      key={question.id}
      className={`border-l-8 ${
        question.is_solved ? "border-success" : "border-gray-400"
      } card card-compact bg-base-100 shadow-md`}>
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link
              to={`${question.id}`}
              className="text-lg font-medium hover:underline hover:text-primary underline-offset-2">
              {question.title}
            </Link>
            <p className="text-sm opacity-75 mt-1">{displayText}</p>
            <div className="w-full flex justify-between items-center">
              <div className="mt-3 flex flex-wrap gap-2">
                {question.tags &&
                  question.tags.map((t) => (
                    <div key={t} className="badge badge-outline badge-sm">
                      {t}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              <button
                disabled={likeLoading}
                className="flex items-center gap-1"
                onClick={() => {
                  toggleQuestionLikeApi(question.id);
                }}>
                {isLiked ? <MdThumbUpAlt size={18} /> : <MdThumbUpOffAlt size={18} />} {question.liked_users_count}
              </button>
              <Link to={`${question.id}`} className="flex items-center gap-1">
                <FaRegCommentDots size={18} /> {question.question_messages_count}
              </Link>
            </div>
            <div className="text-xs opacity-70 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <FiClock /> {question.created_at}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
