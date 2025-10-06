import React, { useEffect, useState } from "react";
import { FiEye, FiPaperclip, FiExternalLink, FiBell, FiTrash2 } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeReportStatus, fetchReportDetail, togglePostVisibility } from "../../../Redux/admin/admin.reports";
import { useParams } from "react-router-dom";
import Spinner from "../../Common/Spinner";
import ReturnBackButton from "../../Common/ReturnBackButton";
import { FaBan } from "react-icons/fa";

export default function PostReportDetail() {
  const adminNotesStatic = [
    {
      author: "Admin Aung",
      note: "Initial triage: looks identical to existing post #9.",
      when: "2025-09-20T16:00:00.000Z",
    },
  ];

  const auditStatic = [
    { actor: "System", action: "Report created", when: "2025-09-20T15:30:03.000000Z" },
    { actor: "Admin Aung", action: "Marked for review", when: "2025-09-20T16:00:00.000000Z" },
  ];

  // --------- Local UI state (UI-only, no external calls) ----------
  const [notes, setNotes] = useState(adminNotesStatic);
  const [noteInput, setNoteInput] = useState("");
  const [subject, setSubject] = useState("Notice: content reported for copyright");
  const [message, setMessage] = useState();
  const [resolveLoading, setResolveLoading] = useState(false);
  const [dismissLoading, setDismissLoading] = useState(false);

  const subjectOptions = [
    "Notice: content reported for copyright",
    "Warning: policy violation",
    "Temporary takedown notice",
  ];

  // UI-only handlers
  const addNote = () => {
    const text = (noteInput || "").trim();
    if (!text) return;
    const entry = { author: "You (Admin)", note: text, when: new Date().toISOString() };
    setNotes((s) => [entry, ...s]);
    setNoteInput("");
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const reportDetail = useSelector((state) => state.admin.report.detail.data);
  const loading = useSelector((state) => state.admin.report.detail.loading);
  const { visibility, visibilityLoading } = useSelector((state) => state.admin.report.detail);
  console.log(visibility);
  useEffect(() => {
    if (reportDetail && id == reportDetail.id) return;
    dispatch(fetchReportDetail({ id, type: "post" }));
  }, []);
  const changeReportStatusApi = async (status) => {
    if (status === "resolved") {
      setResolveLoading(true);
    } else {
      setDismissLoading(true);
    }
    await dispatch(changeReportStatus({ id, status })).unwrap();
    if (status === "resolved") {
      setResolveLoading(false);
    } else {
      setDismissLoading(false);
    }
  };
  function togglePostVisibilityApi() {
    console.log("REMOVE POST TEMPORARILY", id);
    dispatch(togglePostVisibility({ id }));
  }
  const statusColor =
    reportDetail?.status === "pending"
      ? "badge badge-warning"
      : reportDetail?.status === "resolved"
      ? "badge badge-success"
      : "badge badge-error";
  return (
    <div className="min-h-screen w-full p-6">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <ReturnBackButton defaultBackTo="/admin/reports" except="/admin/reports" />
              <h1 className="text-2xl font-semibold">Post Report — #{reportDetail?.id}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="badge badge-outline">{reportDetail?.reported_type}</div>
              <div className={statusColor}>{reportDetail?.status}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Post preview*/}
            <section className="lg:col-span-2 space-y-4">
              <div className="flex gap-4">
                <div>
                  <img
                    src={reportDetail?.reportable.image_url}
                    alt={reportDetail?.reportable.title}
                    className="object-cover w-44 h-28 rounded"
                  />
                  <a
                    href={reportDetail?.reportable.image_url}
                    target="_blank"
                    className="w-full mt-2 btn btn-outline btn-sm">
                    See image
                  </a>
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-bold">{reportDetail?.reportable.title}</h2>
                  <div className="text-sm text-muted">
                    Author: <strong>User #{reportDetail?.reportable.user_id}</strong> •{" "}
                    {reportDetail?.reportable.created_at_formatted}
                  </div>

                  <p className="mt-3 text-gray-800 line-clamp-6 whitespace-pre-wrap">
                    {reportDetail?.reportable.content}
                  </p>

                  <div className="mt-3">
                    {reportDetail?.reportable.code && (
                      <div className="rounded p-3 overflow-auto border border-base-200">
                        <pre className="text-xs whitespace-pre-wrap bg-base-300 p-3">
                          {reportDetail?.reportable.code}
                        </pre>
                        <div className="text-xs text-muted mt-1">
                          Language: {reportDetail?.reportable.code_lang ?? "Unknown"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {reportDetail?.reportable.tags &&
                      reportDetail?.reportable.tags.map((t, i) => (
                        <span key={i} className="badge badge-sm badge-primary">
                          {t}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Reason card */}
              <div className="p-4 border border-base-200 rounded shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="font-semibold">Reported Reason</div>
                  <div className="text-sm text-muted">
                    Status: <div className={statusColor}>{reportDetail?.status}</div>
                  </div>
                </div>

                <div className="mt-3 text-gray-800 font-bold text-xl">{reportDetail?.reason}</div>
              </div>
              {/* Notification panel: send message to the POST OWNER (reported user) */}
              <div className="p-4 border border-base-300 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="font-semibold flex items-center gap-2">
                    <FiBell /> Notify post owner
                  </div>
                  <div className="text-xs text-muted">Visible to owner</div>
                </div>

                <div className="mt-2 text-sm text-muted">
                  Use this to inform the post owner about the report and required next steps (policy, takedown, appeal).
                </div>

                <div className="mt-3">
                  <label className="label">
                    <span className="label-text">Recipient</span>
                  </label>
                  <input
                    readOnly
                    value={`User #${reportDetail?.reportable.user_id} (owner)`}
                    className="input input-sm input-bordered w-full"
                  />

                  <label className="label mt-2">
                    <span className="label-text">Subject</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="select select-sm select-bordered w-full">
                    {subjectOptions.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <label className="label mt-2">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <button className="btn btn-sm btn-primary">Send notification</button>
                </div>
              </div>
            </section>

            {/* RIGHT: Admin panel (Reporter, actions, notification, notes, audit) */}
            <aside className="space-y-3">
              {/* Reporter card */}
              <div className="p-4 border border-base-200 rounded">
                <div className="font-semibold text-md mb-2 pb-2 border-b border-gray-400">
                  Reported at {reportDetail?.created_at} <strong>:</strong>
                </div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-circle w-12 h-12 overflow-hidden">
                      <img src={reportDetail?.reporter.profile_image_url} alt={reportDetail?.reporter.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{reportDetail?.reporter.name}</div>
                    <div className="text-sm text-muted">{reportDetail?.reporter.email}</div>
                    <div className="text-xs text-muted mt-1">Role: {reportDetail?.reporter.role}</div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex gap-2 pb-2">
                    <button
                      onClick={() => {
                        changeReportStatusApi("resolved");
                      }}
                      className="btn flex-1 btn-success btn-sm flex items-center gap-2">
                      {resolveLoading ? <Spinner /> : <IoMdCheckmark size={20} />} Resolve
                    </button>

                    <button
                      onClick={() => {
                        changeReportStatusApi("dismissed");
                      }}
                      className="btn flex-1 btn-error btn-sm flex items-center gap-2">
                      {dismissLoading ? <Spinner /> : <MdCancel size={20} />} Dismiss
                    </button>
                  </div>
                  <button
                    onClick={togglePostVisibilityApi}
                    className={`btn btn-block ${
                      visibility ? "btn-warning" : "btn-success"
                    } btn-sm flex items-center gap-2`}>
                    {visibilityLoading ? <Spinner /> : <FaBan size={19} />}{" "}
                    {visibility ? "Remove temporarily" : "Removed temporarily"}
                  </button>
                  <button className="btn btn-block btn-error btn-sm flex items-center gap-2">
                    <FiTrash2 size={19} /> Drop the post permanently
                  </button>
                </div>
              </div>

              {/* Admin notes (editable) */}
              <div className="p-4 border border-base-200 rounded">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Admin notes</div>
                  <div className="text-xs text-muted">internal</div>
                </div>

                <div className="mt-3">
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    placeholder="Add an internal note"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                  />
                  <div className="mt-2 flex gap-2">
                    <button className="btn btn-sm btn-primary" onClick={addNote}>
                      Add note
                    </button>
                    <button className="btn btn-sm btn-ghost" onClick={() => setNoteInput("")}>
                      Clear
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    {notes.map((n, i) => (
                      <div key={i} className="p-2 bg-base-100 rounded">
                        <div className="text-xs text-muted">
                          {n.when} • {n.author}
                        </div>
                        <div className="text-sm">{n.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audit (static) */}
              <div className="p-4 border border-base-200 rounded">
                <div className="flex items-center gap-2">
                  <AiOutlineHistory />
                  <div className="font-semibold">Audit</div>
                </div>
                <div className="mt-2 text-sm text-muted">
                  {auditStatic.map((a, i) => (
                    <div key={i} className="py-2 border-b last:border-b-0">
                      <div className="text-xs text-muted">{a.when}</div>
                      <div className="text-sm">
                        {a.actor} — {a.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
