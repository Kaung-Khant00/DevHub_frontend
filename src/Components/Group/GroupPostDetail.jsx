// DetailPostPage.jsx
import { useState } from "react";
import { FaCode, FaFile, FaClock, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../Services/axios_instance";
import ImageWIthSkeleton from "../Common/ImageWIthSkeleton";

export default function GroupPostDetailPage({ detail }) {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();

  const contentLimit = 280;
  const isLong = detail.data?.content.length > contentLimit;
  const displayText = expand ? detail.data?.content : detail.data?.content.slice(0, contentLimit) + (isLong ? "…" : "");

  const formatSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  };
  async function handleFileDownload(path) {
    try {
      const response = await api.post(`/posts/download`, {
        path,
      });
      console.log(response);
      /*  I still understand what happen when I use Blob but I understand the rest of the code */
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", detail.data?.file.name);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <button className="btn btn-ghost btn-sm md:hidden" onClick={() => navigate(-1)} aria-label="Back">
          Back
        </button>
      </div>
      {detail.loading ? (
        <div className="card-body p-5 rounded shadow-sm my-2 bg-white flex w-full flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-50"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-8 w-2/3"></div>
          <div className="skeleton h-50 w-full"></div>
        </div>
      ) : (
        <article className="card bg-base-100 border border-base-300 shadow-md p-6">
          {/* Header */}
          <header className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 overflow-hidden">
                  {detail.loading ? (
                    <div className="w-16 h-16 skeleton rounded-full"></div>
                  ) : (
                    <img src={detail.data?.user.profile_image_url} alt={detail.data?.user.name} />
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold leading-tight">{detail.data?.title}</h1>
                </div>
                <div className="text-sm text-base-content/70 mt-1">
                  <span className="font-medium">{detail.data?.user.name}</span>
                  <span className="mx-2">·</span>
                  {detail.data?.user.main_career && (
                    <>
                      <span className="text-xs">{detail.data?.user.main_career}</span>
                      <span className="mx-2">·</span>
                    </>
                  )}
                  <span className="text-xs text-base-content/60">
                    <FaClock className="inline mr-1" />
                    {detail.data?.created_at_formatted}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Body */}
          <section className="mt-4 space-y-4">
            <p className="text-base text-base-content/90 leading-relaxed whitespace-pre-line">
              {displayText}
              {isLong && (
                <button onClick={() => setExpand((s) => !s)} className="ms-3 text-primary text-sm font-medium">
                  {expand ? "Show less" : "Show more"}
                </button>
              )}
            </p>

            {/* Code block */}
            {detail.data?.code && (
              <div className="mt-2 collapse collapse-open border border-base-200 bg-base-200/60 rounded-lg">
                <div className="collapse-title text-sm font-medium flex items-center gap-2">
                  <FaCode /> Code snippet{" "}
                  <span className="ml-2 font-mono text-xs text-base-content/60">({detail.data?.code_lang})</span>
                </div>
                <div className="collapse-content p-0">
                  <pre className="max-w-full bg-base-100 p-4 rounded-b-lg overflow-auto text-sm font-mono whitespace-pre-wrap break-words">
                    <code>{detail.data?.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Image */}
            {detail.data?.image && (
              <div>
                <ImageWIthSkeleton
                  src={detail.data?.image_url}
                  alt={detail.data?.title}
                  className="w-full rounded-lg object-cover max-h-[420px]"
                />
              </div>
            )}

            {/* File panel */}
            {detail.data?.file && (
              <div className="mt-2 flex items-center justify-between btn btn-ghost border border-base-300 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <FaFile />
                  <div>
                    <div className="font-medium">{detail.data?.file.name}</div>
                    <div className="text-xs text-base-content/60">{formatSize(detail.data?.file.size)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="btn btn-outline btn-sm gap-2"
                    onClick={() => {
                      handleFileDownload(detail.data?.file.path);
                    }}>
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            )}
          </section>
        </article>
      )}
    </div>
  );
}
