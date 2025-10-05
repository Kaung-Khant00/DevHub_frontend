import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaInbox } from "react-icons/fa";
import Pagination from "../../../Pages/Admin/Pagination";
import ReportsRole from "../TableRoles/ReportsRole";
import { fetchReports } from "../../../Redux/admin/admin.reports";

const ReportsTable = () => {
  const dispatch = useDispatch();
  const { fetch, pagination, type } = useSelector((state) => state.admin.report);
  const [page, setPage] = useState(pagination.current_page);
  const dataCountRef = useRef(null);
  useEffect(() => {
    if (page !== pagination.current_page) {
      dispatch(fetchReports({ current_page: page, per_page: pagination.per_page, type }));
    }
    dataCountRef.current = null;
  }, [dispatch, page]);

  return (
    <div className=" flex justify-center items-center flex-1 ">
      <div className="w-full h-full ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Post</th>
              <th>Post Description</th>
              <th>Reason</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetch.data && fetch.data.map((report) => <ReportsRole report={report} key={report.id} />)}
            {fetch.data?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-xl font-bold py-5 text-gray-500">
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <FaInbox size={40} />
                    <p className="mt-4 text-lg">No group requests found</p>
                    <p className="text-sm">Once users request to create groups, you’ll see them here.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={pagination.last_page}
              setPage={setPage}
              loading={fetch.loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTable;
