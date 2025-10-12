import { useParams } from "react-router-dom";
import ReturnBackButton from "../../Components/Common/ReturnBackButton";

export default function QuestionFormSkeleton() {
  const { id } = useParams();
  return (
    <div className="w-full m-5 bg-base-100 p-5 rounded-lg animate-pulse">
      {/* Header */}
      <div className="">
        <div className="flex items-center gap-4 mb-3">
          <ReturnBackButton defaultBackTo={`/question/${id}`} />
          <div className="text-lg font-semibold">Update the question — DevHub</div>
        </div>

        {/* Form skeleton */}
        <form className="space-y-5">
          {/* Title */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-40 rounded-md bg-base-200" />
              <div className="h-4 w-20 rounded-md bg-base-200" />
            </div>
            <div className="h-12 rounded-md bg-base-200" />
          </div>

          {/* Body */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-36 rounded-md bg-base-200" />
              <div className="h-4 w-20 rounded-md bg-base-200" />
            </div>
            <div className="h-40 rounded-md bg-base-200" />
          </div>

          {/* Two-column area (code + media/tags) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Code snippet */}
            <div>
              <div className="h-4 w-48 mb-2 rounded-md bg-base-200" />
              <div className="h-28 rounded-md bg-base-200 font-mono" />
            </div>

            {/* Image upload + tags */}
            <div>
              <div className="h-4 w-36 mb-2 rounded-md bg-base-200" />
              <div className="border border-dashed rounded-md p-3 flex flex-col items-center gap-3">
                <div className="h-24 w-full rounded-md bg-base-200" />
                <div className="h-4 w-40 rounded-md bg-base-200" />
                <div className="flex gap-2 mt-2">
                  <div className="h-8 w-24 rounded-md bg-base-200" />
                  <div className="h-8 w-24 rounded-md bg-base-200" />
                </div>
              </div>

              <div className="mt-3">
                <div className="h-10 rounded-md bg-base-200 w-full" />
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="h-8 w-20 rounded-md bg-base-200" />
                  <div className="h-8 w-20 rounded-md bg-base-200" />
                  <div className="h-8 w-20 rounded-md bg-base-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <div className="h-10 w-24 rounded-md bg-base-200" />
            <div className="h-10 w-36 rounded-md bg-base-200" />
          </div>
        </form>
      </div>
    </div>
  );
}
