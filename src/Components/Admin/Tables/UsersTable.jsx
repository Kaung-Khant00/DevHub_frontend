import UsersRole from "../TableRoles/UsersRole";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../Redux/admin/admin.users";
import Spinner from "../../Common/Spinner";
import Pagination from "../../../Pages/Admin/Pagination";

const UsersTable = () => {
  const { data, loading } = useSelector((state) => state.admin.users.fetch);
  const pagination = useSelector((state) => state.admin.users.pagination);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  // const dataCountRef = useRef(null);

  useEffect(() => {
    console.log(page);
    dispatch(fetchUsers({ current_page: page }));
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
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Main Career</th>
              <th>Phone</th>
              <th>Gender</th>
              {/* <th className="text-center">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {data && data.map((user) => <UsersRole key={user.id} user={user} />)}
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
        {!loading && data?.length === 0 && <div className="text-center w-full py-5">No users found</div>}
        <div className="flex justify-center my-5">
          <Pagination currentPage={page} totalPages={pagination.last_page} setPage={setPage} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
