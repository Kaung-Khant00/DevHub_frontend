import { useState } from "react";
import { FiAlertCircle, FiSend } from "react-icons/fi";
import { REASON_OPTIONS } from "../../Constants/ReportType";
import ReturnBackButton from "../../Components/Common/ReturnBackButton";
import PostCard from "../../Components/Feed/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { reportPost } from "../../Redux/report/reportSlice";

const Report = () => {
  const [reportType, setReportType] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const post = useSelector((state) => state.report?.post);
  const dispatch = useDispatch();

  function reportPostApi() {
    dispatch(reportPost({ reason: reportType === "Other" ? reportMessage : reportType, postId: post.id }));
  }

  return (
    <div className="w-full grid grid-cols-2">
      {/*  left side  */}
      <div className="bg-base-100 p-3 border-x border-base-300 py-5">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <ReturnBackButton defaultBackTo={"/feed"} />
            <div className="p-2 rounded-md bg-secondary/10 text-secondary">
              <FiAlertCircle size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold">Reporting a post</h3>
              <p className="text-xs text-base-content/60">
                We'll evaluate reports and apply policy-based actions when necessary.
              </p>
            </div>
          </div>

          <div className="relative rounded-md bg-base-200 overflow-hidden cursor-not-allowed select-none">
            <div className="absolute inset-0 cursor-not-allowed select-none z-10"></div>
            <div className="w-full flex items-center justify-center min-h-44">
              {post ? <PostCard post={post} /> : "Loading ..."}
            </div>
          </div>
        </div>
      </div>
      {/*  right side */}
      <div className="p-3 py-5">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Why are you reporting?</legend>

          <div className="flex flex-col gap-2">
            {REASON_OPTIONS.post.map((type) => (
              <label
                key={type}
                onClick={() => setReportType(type)}
                className="flex items-start gap-3 p-2 rounded-md border hover:bg-base-100">
                <input type="radio" name="report_reason" className="radio radio-sm" value={type} />
                <div className="flex-1 text-sm text-left">{type}</div>
              </label>
            ))}

            {/* Other radio */}
            <label
              onClick={() => setReportType("Other")}
              className="flex items-start gap-3 p-2 rounded-md border hover:bg-base-100">
              <input type="radio" name="report_reason" className="radio radio-sm" value="Other" />
              <div className="flex-1 text-sm text-left">Other (provide more details)</div>
            </label>
          </div>

          {/* Static textarea (visible always) */}
          {reportType === "Other" && (
            <div className="mt-2">
              <label className="label">
                <span className="label-text">More details (use when selecting "Other")</span>
              </label>
              <textarea
                onChange={(e) => setReportMessage(e.target.value)}
                placeholder="Please tell us what's wrong with this post..."
                className="textarea textarea-bordered w-full min-h-[120px] resize-none"
                aria-label="More details for report">
                {reportMessage}
              </textarea>
            </div>
          )}
        </fieldset>

        <div className="mt-4 flex gap-3">
          <button type="button" className="btn btn-ghost">
            Cancel
          </button>
          <button onClick={reportPostApi} type="button" className="btn btn-primary flex items-center gap-2">
            <FiSend />
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
