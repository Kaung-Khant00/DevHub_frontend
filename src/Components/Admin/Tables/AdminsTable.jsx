import AdminsRole from "../TableRoles/AdminsRole";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Common/Spinner";
import Pagination from "../../../Pages/Admin/Pagination";
import { fetchAdmins } from "../../../Redux/admin/admin.admins";

const AdminsTable = () => {
  const { data, loading } = useSelector((state) => state.admin.admins.fetch);
  const pagination = useSelector((state) => state.admin.admins.pagination);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  // const dataCountRef = useRef(null);

  console.log("FETCHING THE DATA");
  useEffect(() => {
    console.log(page);
    dispatch(fetchAdmins({ page, perPage: pagination.perPage }));
  }, [page]);

  /*   useEffect(() => {
    if (!dataCountRef.current) {
      dataCountRef.current = data?.length || null;
      return;
    }
    if (data.length === 0) {
      dataCountRef.current = null;
      let newPage = page;
      if (page === pagination.last_page) {
        setPage(page - 1);
        newPage = page !== 1 ? page - 1 : 1;
      }
      dispatch(fetchUsers({ current_page: newPage }));
    }
  }, [data]); */
  return (
    <div className=" flex justify-center items-center flex-1 ">
      <div className="w-full h-full ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Gender</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((admin) => <AdminsRole key={admin.id} admin={admin} />)}
            {loading && (
              <tr>
                <td colSpan={7}>
                  <div className="flex justify-center text-center py-4 w-full">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {!loading && data?.length === 0 && <div className="text-center w-full py-5">No admins found</div>}
        <div className="flex justify-center my-5">
          <Pagination currentPage={page} totalPages={pagination.last_page} setPage={setPage} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AdminsTable;
