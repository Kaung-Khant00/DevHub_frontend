// GroupRequestDetail.jsx
import { useEffect } from "react";
import { FaTrash, FaArrowLeft, FaTags, FaUser, FaCalendarAlt, FaImage, FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGroupRequestDetail } from "../../Redux/user/notificationSlice";
import ImageWIthSkeleton from "../../Components/Common/ImageWIthSkeleton";

function StatusPill({ status = "pending" }) {
  if (status === "approved") {
    return <span className="badge badge-success">Approved</span>;
  }
  if (status === "rejected") {
    return <span className="badge badge-error text-white">Rejected</span>;
  }
  return <span className="badge badge-warning">Pending</span>;
}

export default function UserGroupCreationRequestDetail() {
  const { id } = useParams();
  const { data, loading } = useSelector((state) => state.notification.groupRequestDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupRequestDetail(id));
  }, []);

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to={"/group/requests"} className="btn btn-ghost btn-square" aria-label="Back" title="Back">
              <FaArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <h1 className="text-xl font-semibold">Group Request</h1>
              <p className="text-sm text-gray-500">Details for request #{data?.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusPill status={data?.status} />
            <button className="btn btn-sm btn-error flex items-center gap-2 text-white" aria-label="Delete request">
              <FaTrash />
              Delete
            </button>
          </div>
        </div>

        {/* Card */}
        {loading ? (
          <article className="card bg-base-100 shadow rounded-lg overflow-hidden" aria-busy="true">
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left: image skeleton */}
              <div className="md:col-span-1 flex items-start">
                <div className="w-36 h-36 rounded-md overflow-hidden">
                  <div className="skeleton w-full h-full flex items-center justify-center">
                    <FaImage className="text-3xl text-base-300" />
                  </div>
                </div>
              </div>

              {/* Right: content skeleton */}
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2 w-full">
                    <div className="skeleton h-5 w-1/2"></div>
                    <div className="skeleton h-3 w-3/4"></div>
                  </div>

                  <div className="text-right text-xs text-gray-400 w-24">
                    <div className="skeleton h-3 w-full"></div>
                  </div>
                </div>

                {/* Tags skeleton */}
                <div className="flex items-center gap-2">
                  <FaTags className="text-sm text-base-300" />
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-16 rounded"></div>
                    <div className="skeleton h-6 w-12 rounded"></div>
                    <div className="skeleton h-6 w-10 rounded"></div>
                  </div>
                </div>

                {/* description skeleton */}
                <div className="space-y-2 mt-2">
                  <div className="skeleton h-3 w-full"></div>
                  <div className="skeleton h-3 w-5/6"></div>
                </div>
              </div>
            </div>
          </article>
        ) : (
          <article className="card bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left: image */}
              <div className="md:col-span-1 flex items-start">
                <div className="w-36 h-36 bg-base-200 rounded-md flex items-center justify-center overflow-hidden">
                  {data?.image_url ? (
                    <ImageWIthSkeleton src={data?.image_url} alt={data?.name} className="object-cover w-36 h-36" />
                  ) : (
                    <div className="text-center px-3">
                      <FaImage className="text-3xl text-gray-400" />
                      <div className="text-xs text-gray-500 mt-2">No image</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: content */}
              <div className="md:col-span-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold leading-tight">{data?.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{data?.description}</p>
                  </div>

                  <div className="text-right text-xs text-gray-500">
                    <span>{data?.created_at}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <FaTags className="text-sm text-gray-400" />
                  {data?.tags.length ? (
                    data?.tags.map((t, i) => (
                      <span key={i} className="badge badge-outline text-xs">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
