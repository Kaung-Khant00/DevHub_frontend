import { useDispatch, useSelector } from "react-redux";
import GroupCreationRequestTable from "../../Components/Admin/Tables/GroupCreationRequestTable";
import { useEffect } from "react";
import { changeGroupRequestStatus, fetchGroupRequest } from "../../Redux/admin/admin.groupRequest";

const ReportAdminPage = () => {
  const dispatch = useDispatch();
  const { data, status, fetchLoading, pagination } = useSelector((state) => state.admin.groupRequest.groupRequests);
  useEffect(() => {
    if (!data) {
      dispatch(fetchGroupRequest({ current_page: pagination.page, per_page: pagination.per_page, status: "pending" }));
    }
  }, []);
  function handleStatusChange(newStatus) {
    if (newStatus === status) return;
    dispatch(changeGroupRequestStatus(newStatus));
  }
  return (
    <div className="flex flex-col max-h-full h-full">
      <div className="w-full flex justify-between border-b border-base-300 pb-4 ">
        <div className="text-2xl font-bold text-info-content flex-1">Reports</div>

        <div className="tabs tabs-box flex-1">
          <input
            type="radio"
            disabled={fetchLoading}
            onClick={() => {
              handleStatusChange("pending");
            }}
            name="status"
            className="tab "
            aria-label="Posts"
            defaultChecked
          />
          <input
            type="radio"
            disabled={fetchLoading}
            onClick={() => {
              handleStatusChange("approved");
            }}
            name="status"
            className="tab"
            aria-label="Groups"
          />
          <input
            type="radio"
            disabled={fetchLoading}
            onClick={() => {
              handleStatusChange("rejected");
            }}
            name="status"
            className="tab"
            aria-label="Answers"
          />
          <input
            type="radio"
            disabled={fetchLoading}
            onClick={() => {
              handleStatusChange("rejected");
            }}
            name="status"
            className="tab"
            aria-label="Comments"
          />
        </div>
        <div className="w-1/3 flex flex-1">
          <div className="flex-1">
            <input type="text" className="input w-full rounded-r-none" />
          </div>
          <button className="btn btn-info text-white rounded-l-none">Search</button>
        </div>
      </div>
      <GroupCreationRequestTable />
    </div>
  );
};

export default ReportAdminPage;
