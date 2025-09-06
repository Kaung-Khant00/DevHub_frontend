import UserTable from "../../Components/Admin/UserTable";

const UsersAdminPage = () => {
  return (
    <div className="flex flex-col max-h-full h-full">
      <div className="w-full flex justify-end">
        <div className="w-1/3">
          <input type="text" className="input w-full rounded-r-none" />
        </div>
        <button className="btn btn-primary rounded-l-none">Search</button>
      </div>
      <UserTable />
    </div>
  );
};

export default UsersAdminPage;
