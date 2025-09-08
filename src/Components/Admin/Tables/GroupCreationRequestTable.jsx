import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Pagination from "../../../Pages/Admin/Pagination";
import { fetchGroupRequest } from "../../../Redux/admin/admin.groupRequest";
import GroupCreationRequestRole from "../TableRoles/GroupCreationRequestRole";

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
    if (page !== pagination.current_page)
      dispatch(fetchGroupRequest({ current_page: page, per_page: pagination.per_page, status: requestStatus }));
    dataCountRef.current = null;
  }, [dispatch, page]);

  useEffect(() => {
    /* if the status is null , it mean that the admin clicked the page for the first time */
    if (status === null) return setStatus(requestStatus);
    /* if the admin click the same status , I prevent from refetching  */
    if (requestStatus !== status) {
      dispatch(fetchGroupRequest({ current_page: 1, per_page: pagination.per_page, status: requestStatus }));
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
              <th className="text-center">{status === "pending" ? "Action" : "Status"}</th>
            </tr>
          </thead>
          <tbody>{data && data.map((group) => <GroupCreationRequestRole group={group} key={group.id} />)}</tbody>
        </table>
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
