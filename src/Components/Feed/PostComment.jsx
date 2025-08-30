import { useState } from "react";

const initialComments = [
  {
    id: 1,
    comment:
      "Nice refactor — this will reduce page load and make reviewers happier.",
    created_at_formatted: "1 hour ago",
    user: {
      id: 21,
      name: "Thida",
      profile_image_url: "https://i.pravatar.cc/100?img=5",
    },
  },
  {
    id: 2,
    comment:
      "Can we also add an index to the post_likes pivot for faster counts?",
    created_at_formatted: "45 minutes ago",
    user: {
      id: 34,
      name: "Zaw",
      profile_image_url: "https://i.pravatar.cc/100?img=7",
    },
  },
  {
    id: 3,
    comment: "Great job. I tested locally — everything looks stable.",
    created_at_formatted: "20 minutes ago",
    user: {
      id: 55,
      name: "Mya",
      profile_image_url: "https://i.pravatar.cc/100?img=9",
    },
  },
];

const PostComment = () => {
  const [comments] = useState(initialComments);

  return (
    <section className="card bg-base-100 border border-base-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Comments</h2>
        <div className="text-sm text-base-content/60">
          {comments.length} replies
        </div>
      </div>

      {/* Static comment form (design only) */}
      <form className="mb-4">
        <textarea
          className="textarea textarea-bordered w-full h-32 resize-y"
          defaultValue={"Write a constructive comment..."}
        />
        <div className="mt-3 flex justify-end">
          <button type="button" className="btn btn-primary ">
            Comment
          </button>
        </div>
      </form>

      {/* Comment list */}
      <div className="space-y-4 max-h-[56vh] overflow-auto pr-2">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 items-start">
            <div className="avatar">
              <div className="w-11 rounded-full overflow-hidden">
                <img src={c.user.profile_image_url} alt={c.user.name} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.user.name}</div>
                  <div className="text-xs text-base-content/60">
                    {c.created_at_formatted}
                  </div>
                </div>
                <div className="text-xs text-base-content/60">Reply</div>
              </div>
              <p className="mt-2 text-sm text-base-content/90 whitespace-pre-line">
                {c.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostComment;
