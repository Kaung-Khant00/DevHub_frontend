export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="flex flex-col items-center gap-4">
        {/* DaisyUI Spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Loading text */}
        <h2 className="text-xl font-semibold text-primary">Loading Admin Dashboard...</h2>
        <p className="text-sm text-gray-500">Please wait while we prepare your data</p>
      </div>
    </div>
  );
}
