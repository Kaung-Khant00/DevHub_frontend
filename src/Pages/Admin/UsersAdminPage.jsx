import UsersTable from "../../Components/Admin/Tables/UsersTable";

const UsersAdminPage = () => {
  return (
    <div className="flex flex-col max-h-full h-full">
      <div className="flex justify-between">
        <div className="text-2xl font-bold text-info-content flex-1">Users</div>

        <div className="w-full flex justify-end">
          <div className="w-1/3">
            <input type="text" className="input w-full rounded-r-none" />
          </div>
          <button className="btn btn-primary rounded-l-none">Search</button>
        </div>
      </div>
      <UsersTable />
    </div>
  );
};

export default UsersAdminPage;
