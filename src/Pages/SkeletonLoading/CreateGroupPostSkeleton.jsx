import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const CreateGroupPostSkeleton = () => {
  const { id } = useParams();

  return (
    <div
      className="bg-base-200 p-4 rounded-lg shadow-sm animate-pulse"
      aria-busy="true"
      aria-label="Loading create post form">
      <div className="flex items-center gap-3 mb-4">
        {/* Header skeleton */}
        <Link to={`/group/${id}`} className="btn btn-ghost btn-square mb-2" aria-label="Back" title="Back">
          <FaArrowLeft className="w-10 h-5" />
        </Link>
        <div className="w-12 h-12 rounded-lg overflow-hidden ring ring-primary/30 bg-base-200 skeleton" />

        <div className="flex-1">
          <div className="h-3 w-24 rounded bg-base-200 skeleton mb-2" />
          <div className="flex items-center gap-2">
            <div className="h-5 w-48 rounded bg-base-200 skeleton" />
            <div className="h-4 w-20 rounded bg-base-200 skeleton" />
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <div className="h-8 w-20 rounded bg-base-200 skeleton" />
          <div className="h-8 w-28 rounded bg-base-200 skeleton" />
        </div>
      </div>

      {/* Grid: left content / right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* LEFT: main content skeleton (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Title skeleton */}
          <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3 flex flex-col gap-2">
            <div className="h-10 w-full rounded bg-base-200 skeleton" />

            {/* Content skeleton */}
            <div className="h-32 w-full rounded bg-base-200 skeleton" />
          </div>

          {/* Code snippet skeleton */}
          <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 w-28 rounded bg-base-200 skeleton" />
              <div className="h-8 w-40 rounded bg-base-200 skeleton" />
            </div>
            <div className="h-24 w-full rounded bg-base-200 skeleton" />
            <div className="mt-3 h-8 w-20 rounded bg-base-200 skeleton" />
          </div>
        </div>

        {/* RIGHT: attachments & tags skeleton (lg:col-span-2) */}
        <aside className="space-y-4 lg:col-span-2">
          {/* Image uploader skeleton */}
          <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
            <div className="h-5 w-28 rounded bg-base-200 skeleton mb-3" />
            <div className="border-dashed border-2 border-base-300 rounded-lg p-3 flex flex-col items-center justify-center bg-base-100">
              <div className="h-8 w-8 rounded bg-base-200 skeleton" />
              <div className="h-4 w-36 rounded bg-base-200 skeleton mt-3" />
              <div className="h-4 w-20 rounded bg-base-200 skeleton mt-2" />
              <div className="mt-3 w-full flex gap-2">
                <div className="h-8 flex-1 rounded bg-base-200 skeleton" />
                <div className="h-8 w-12 rounded bg-base-200 skeleton" />
              </div>
            </div>
          </div>

          {/* File attachment skeleton */}
          <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="h-5 w-28 rounded bg-base-200 skeleton" />
              <div className="h-8 w-40 rounded bg-base-200 skeleton" />
            </div>

            <div className="bg-base-200 p-3 rounded flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-base-200 skeleton" />
                <div>
                  <div className="h-4 w-36 rounded bg-base-200 skeleton mb-2" />
                  <div className="h-3 w-20 rounded bg-base-200 skeleton" />
                </div>
              </div>
              <div className="h-8 w-8 rounded bg-base-200 skeleton" />
            </div>

            <div className="flex gap-2 mt-3">
              <div className="h-8 flex-1 rounded bg-base-200 skeleton" />
              <div className="h-8 w-36 rounded bg-base-200 skeleton" />
            </div>
          </div>

          {/* Tags skeleton */}
          <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
            <div className="h-5 w-24 rounded bg-base-200 skeleton mb-3" />
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-7 w-16 rounded-full bg-base-200 skeleton" />
              <div className="h-7 w-12 rounded-full bg-base-200 skeleton" />
              <div className="h-7 w-20 rounded-full bg-base-200 skeleton" />
              <div className="h-7 w-24 rounded-full bg-base-200 skeleton" />
              <div className="h-8 w-full rounded bg-base-200 skeleton" />
            </div>
          </div>

          {/* Actions skeleton (mobile-friendly bottom row) */}
          <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-28 rounded bg-base-200 skeleton" />
              <div className="h-8 w-40 rounded bg-base-200 skeleton" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CreateGroupPostSkeleton;
