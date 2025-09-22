import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ReportsTable from "../../Components/Admin/Tables/ReportsTable";
import { changeReportType, fetchReports } from "../../Redux/admin/admin.reports";

const ReportAdminPage = () => {
  const dispatch = useDispatch();
  const { fetch, type, pagination } = useSelector((state) => state.admin.report);
  useEffect(() => {
    if (!fetch.data) {
      dispatch(fetchReports({ current_page: pagination.current_page, per_page: pagination.per_page, type }));
    }
  }, []);
  function handleStatusChange(newStatus) {
    if (newStatus === type) return;
    dispatch(changeReportType(newStatus));
  }
  return (
    <div className="flex flex-col max-h-full h-full">
      <div className="w-full flex justify-between border-b border-base-300 pb-4 ">
        <div className="text-2xl font-bold text-info-content flex-1">Reports</div>

        <div className="tabs tabs-box flex-1">
          <input
            type="radio"
            disabled={fetch.loading}
            onClick={() => {
              handleStatusChange("post");
            }}
            name="status"
            className="tab "
            aria-label="Posts"
            defaultChecked
          />
          <input
            type="radio"
            disabled={fetch.loading}
            onClick={() => {
              handleStatusChange("approved");
            }}
            name="status"
            className="tab"
            aria-label="Groups"
          />
          <input
            type="radio"
            disabled={fetch.loading}
            onClick={() => {
              handleStatusChange("rejected");
            }}
            name="status"
            className="tab"
            aria-label="Answers"
          />
          <input
            type="radio"
            disabled={fetch.loading}
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
      <ReportsTable />
    </div>
  );
};

export default ReportAdminPage;
