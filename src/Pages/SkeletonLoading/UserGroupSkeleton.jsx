import { FaUsers } from "react-icons/fa";

const UserGroupSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      {/* GroupHeader skeleton */}
      <div className="rounded-lg overflow-hidden shadow-md mb-6 bg-base-100 relative">
        <div className="relative h-44 bg-base-200 skeleton"></div>

        <div className="p-5 flex items-start gap-5">
          <div className="w-20 h-20 rounded-lg ring ring-primary/30 bg-base-200 skeleton"></div>

          <div className="flex-1 space-y-3">
            <div className="h-6 w-1/2 rounded bg-base-200 skeleton"></div>
            <div className="h-4 w-2/3 rounded bg-base-200 skeleton"></div>

            <div className="flex gap-3 mt-3">
              <FaUsers className="text-primary" />
              <div className="h-4 w-20 bg-base-200 rounded skeleton"></div>
              <div className="h-4 w-28 bg-base-200 rounded skeleton"></div>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="h-6 w-12 rounded bg-base-200 skeleton"></div>
              <div className="h-6 w-14 rounded bg-base-200 skeleton"></div>
              <div className="h-6 w-10 rounded bg-base-200 skeleton"></div>
            </div>
          </div>

          {/* Admin bubble skeleton */}
          <div className="absolute right-4 top-28 transform translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-base-200 skeleton"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column skeleton */}
        <main className="lg:col-span-2">
          <div className="card bg-base-100 shadow-sm mb-5 p-4 space-y-4">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-base-200 skeleton"></div>
              <div className="flex-1 h-12 rounded bg-base-200 skeleton"></div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="h-5 w-12 rounded bg-base-200 skeleton"></div>
                <div className="h-5 w-10 rounded bg-base-200 skeleton"></div>
                <div className="h-5 w-10 rounded bg-base-200 skeleton"></div>
              </div>
              <div className="h-8 w-16 rounded bg-base-200 skeleton"></div>
            </div>
          </div>
        </main>

        {/* Sidebar skeleton */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="card bg-base-100 shadow-sm p-4 space-y-2">
            <div className="h-5 w-20 bg-base-200 rounded skeleton"></div>
            <div className="h-4 w-32 bg-base-200 rounded skeleton"></div>
            <div className="h-4 w-28 bg-base-200 rounded skeleton"></div>
          </div>
          <div className="card bg-base-100 shadow-sm p-4 space-y-2">
            <div className="h-5 w-24 bg-base-200 rounded skeleton"></div>
            <div className="h-4 w-20 bg-base-200 rounded skeleton"></div>
            <div className="h-8 w-full rounded bg-base-200 skeleton"></div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default UserGroupSkeleton;
