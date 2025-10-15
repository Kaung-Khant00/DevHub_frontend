import { FaArrowLeft } from "react-icons/fa";
import GroupHeader from "../../Components/Group/GroupHeader";
import SideBar from "../../Components/Group/SideBar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchGroupDetail } from "../../Redux/group/groupSlice";
import UserGroupSkeleton from "../SkeletonLoading/UserGroupSkeleton";
import GroupComposer from "../../Components/Group/GroupComposer";
import { fetchGroupPosts } from "../../Redux/group/groupPostsSlice";
import GroupPostContainer from "../../Components/Group/GroupPostContainer";
import LoadMoreGroupPost from "../../Components/Group/LoadMoreGroupPost";

export default function UserGroupPage() {
  const dispatch = useDispatch();
  const { data: groupData, loading: groupLoading } = useSelector((state) => state.group.detail);
  const pagination = useSelector((state) => state.groupPost.pagination);
  const groupPostFetchedRef = useRef(false);
  const { id } = useParams();

  function loadMoreGroupPosts() {
    if (!groupPostFetchedRef.current || pagination.current_page > pagination.last_page) return;
    groupPostFetchedRef.current = true;

    dispatch(fetchGroupPosts({ current_page: pagination.current_page, per_page: pagination.per_page, group_id: id }));
  }
  useEffect(() => {
    if (!groupData || groupData.id !== id) {
      dispatch(fetchGroupDetail(id));
    }
  }, []);
  useEffect(() => {
    if (groupPostFetchedRef.current || pagination.current_page !== 1) return;
    groupPostFetchedRef.current = true;
    dispatch(fetchGroupPosts({ per_page: pagination.per_page, group_id: id }));
  }, []);
  return (
    <div className=" mx-auto p-2 w-full">
      <Link to={"/group"} className="btn btn-ghost mb-2" aria-label="Back" title="Back">
        <FaArrowLeft className="w-10 h-5" />
      </Link>
      {groupLoading ? (
        <UserGroupSkeleton />
      ) : (
        <>
          <GroupHeader group={groupData} admin={groupData?.user} />
          <div className="flex justify-center">
            <main className="max-w-[800px] w-full">
              <GroupComposer id={id} />
              <GroupPostContainer />
              <LoadMoreGroupPost loadMoreGroupPosts={loadMoreGroupPosts} />
            </main>

            {/* <SideBar group={groupData} /> */}
          </div>
        </>
      )}
    </div>
  );
}
