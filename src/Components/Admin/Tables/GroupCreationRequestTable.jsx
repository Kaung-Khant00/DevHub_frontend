import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Pagination from "../../../Pages/Admin/Pagination";
import { fetchAllGroupRequest, fetchGroupRequest } from "../../../Redux/admin/admin.groupRequest";
import GroupCreationRequestRole from "../TableRoles/GroupCreationRequestRole";
import { FaInbox } from "react-icons/fa";
import Spinner from "../../Common/Spinner";

const GroupCreationRequestTable = () => {
  const {
    data,
    pagination,
    fetchLoading,
    status: requestStatus,
  } = useSelector((state) => state.admin.groupRequest.groupRequests);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(pagination.current_page);
  const dataCountRef = useRef(null);
  useEffect(() => {
    if (page !== pagination.current_page) {
      if (requestStatus === "all") {
        dispatch(fetchAllGroupRequest({ current_page: page, all_per_page: pagination.all_per_page }));
      } else {
        dispatch(fetchGroupRequest({ current_page: page, per_page: pagination.per_page, status: requestStatus }));
      }
    }
    dataCountRef.current = null;
  }, [dispatch, page]);

  useEffect(() => {
    /* if the status is null , it mean that the admin clicked the page for the first time */
    if (status === null) return setStatus(requestStatus);
    /* if the admin click the same status , I prevent from refetching  */
    if (requestStatus !== status) {
      if (requestStatus === "all") {
        dispatch(fetchAllGroupRequest({ current_page: 1, all_per_page: pagination.all_per_page }));
      } else {
        dispatch(fetchGroupRequest({ current_page: 1, per_page: pagination.per_page, status: requestStatus }));
      }
      setStatus(requestStatus);
      setPage(1);
      /*  data count is null because this is gonna be new page */
      dataCountRef.current = null;
    }
  }, [requestStatus]);

  useEffect(() => {
    /*  first I check if the data is already fetch ? */
    /*  if not fetch the data , I return in the first place cuz the data [] is always 0 before fetching */
    if (!dataCountRef.current) {
      dataCountRef.current = data?.length || null;
      return;
    }
    /* if the data is already fetch , I check if the data is empty or 0 */
    if (data.length === 0) {
      /*  set to null cuz the data is about to reset */
      dataCountRef.current = null;
      /*  save the page  */
      let newPage = page;
      /* check if the page is the last page ? */
      /*  if it is , I set the page to the previous page  */
      if (page === pagination.last_page) {
        setPage(page - 1);
        newPage = page !== 1 ? page - 1 : 1;
      }
      /*  it is all about refetching the same page number cuz the page is empty now  */
      /*  fetching all group request don't need to do like that cuz they never have empty array like in allow and reject */
      /*  cuz the pending status data have to remove when they are rejected or approved */
      /*  hope you will understand my logic :) */

      dispatch(fetchGroupRequest({ current_page: newPage, per_page: pagination.per_page, status: requestStatus }));
    }
  }, [data]);

  return (
    <div className=" flex justify-center items-center flex-1 ">
      <div className="w-full h-full ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Group Name</th>
              <th>Description</th>
              <th>Requesting User</th>
              <th>Tags</th>
              <th className="text-center">
                {status === "all" ? "Action/Status" : status === "pending" ? "Action" : "Status"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((group) => <GroupCreationRequestRole group={group} key={group.id} />)}
            {!fetchLoading && data?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-xl font-bold py-5 text-gray-500">
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <FaInbox size={40} />
                    <p className="mt-4 text-lg">No group requests found</p>
                    {requestStatus === "pending" && (
                      <p className="text-sm">Once users request to create groups, you’ll see them here.</p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {fetchLoading && (
          <div className="flex justify-center items-center h-10">
            <Spinner />
          </div>
        )}
        <div>
          <div className="mt-6 flex justify-center">
            <Pagination currentPage={page} totalPages={pagination.last_page} setPage={setPage} loading={fetchLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCreationRequestTable;
