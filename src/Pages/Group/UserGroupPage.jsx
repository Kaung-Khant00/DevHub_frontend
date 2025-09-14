import { FaUsers, FaCamera, FaArrowLeft } from "react-icons/fa";
import GroupHeader from "../../Components/Group/GroupHeader";
import SideBar from "../../Components/Group/SideBar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGroupDetail } from "../../Redux/group/groupSlice";
import UserGroupSkeleton from "../SkeletonLoading/UserGroupSkeleton";
import ImageWIthSkeleton from "../../Components/Common/ImageWIthSkeleton";
import GroupComposer from "../../Components/Group/GroupComposer";

export default function UserGroupPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.group.detail);
  const { id } = useParams();
  useEffect(() => {
    if (!data) {
      dispatch(fetchGroupDetail(id));
    }
  }, []);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to={"/group"} className="btn btn-ghost mb-2" aria-label="Back" title="Back">
        <FaArrowLeft className="w-10 h-5" />
      </Link>
      {loading ? (
        <UserGroupSkeleton />
      ) : (
        <>
          <GroupHeader group={data} admin={data?.user} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <main className="lg:col-span-2">
              <GroupComposer id={id} />
            </main>

            <SideBar group={data} />
          </div>
        </>
      )}
    </div>
  );
}
