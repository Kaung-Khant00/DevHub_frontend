import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../../Pages/Admin/Pagination";
import { fetchGroupRequest } from "../../../Redux/admin/admin.groupRequest";

const GroupCreationRequestTable = () => {
  const { data, pagination, loading } = useSelector((state) => state.admin.groupRequest.groupRequests);
  const dispatch = useDispatch();
  const [page, setPage] = useState(pagination.current_page);
  useEffect(() => {
    console.log("Page changed !", page);
    dispatch(fetchGroupRequest({ current_page: page, per_page: 2 }));
  }, [dispatch, page]);
  useEffect(() => {
    console.log(pagination);
  }, []);
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
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((group) => (
                <tr className="hover:bg-base-300">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={group.image_url} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{group.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {group.description.length > 100 ? group.description.slice(0, 100) + "..." : group.description}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-circle h-12 w-12">
                          <img src={group.user.profile_image_url} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{group.user.name}</div>
                        <div>{group.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <th className="space-x-1 space-y-1">
                    {group.tags.length > 0 &&
                      group.tags.map((tag) => <div className="badge badge-soft badge-primary text-sm">{tag}</div>)}
                  </th>
                  <td className="flex justify-center gap-2">
                    <div className="tooltip tooltip-success " data-tip="Allow the group">
                      <button className="btn btn-square btn-success btn-soft hover:text-white">
                        <IoMdCheckmark size={20} />
                      </button>
                    </div>
                    <div className="tooltip tooltip-error " data-tip="Deny the group">
                      <button className="btn btn-square btn-error btn-soft hover:text-white">
                        <RxCross2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <div className="mt-6 flex justify-center">
            <Pagination currentPage={page} totalPages={pagination.last_page} setPage={setPage} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCreationRequestTable;
