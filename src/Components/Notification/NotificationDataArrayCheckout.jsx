import PostCard from "../Feed/PostCard";

const NotificationDataArrayCheckout = ({ notification }) => {
  console.log(notification);
  return (
    <div>
      {notification.type.includes("GROUP_CREATION_REQUEST") && (
        <div>
          <div className="text-gray-500">Request ID</div>
          <div className="font-medium">#{notification.data?.group_creation_request_id ?? "—"}</div>
        </div>
      )}
      {(notification.type.includes("POST_REMOVED") ||
        notification.type.includes("POST_DELETED_PERMANENTLY") ||
        notification.type.includes("POST_RESTORED") ||
        notification.type.includes("POST_REPORTED")) &&
        notification?.post && (
          <div>
            <div className="text-gray-500">Post ID</div>
            <div className="font-medium">#{notification.data?.post_id ?? "—"}</div>
            <div className="pointer-events-none">
              <PostCard post={notification?.post} />
            </div>
          </div>
        )}
      {notification.type.includes("SOLUTION") && (
        <div>
          <div>
            <div className="text-gray-500">Solution :</div>
          </div>
          <p className="bg-base-200 p-2 w-full text-lg">{notification?.question_message?.body}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationDataArrayCheckout;
