import { useDispatch } from "react-redux";
import GroupCreationRequestTable from "../../Components/Admin/Tables/GroupCreationRequestTable";
import { useEffect } from "react";
import { fetchGroupRequest } from "../../Redux/admin/admin.groupRequest";

const GroupCreationRequestPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroupRequest({ current_page: 1, per_page: 2 }));
  }, []);
  return (
    <div className="flex flex-col max-h-full h-full">
      <div className="w-full flex justify-end">
        <div className="w-1/3">
          <input type="text" className="input w-full rounded-r-none" />
        </div>
        <button className="btn btn-primary rounded-l-none">Search</button>
      </div>
      <GroupCreationRequestTable />
    </div>
  );
};

export default GroupCreationRequestPage;
