import { MdDelete } from "react-icons/md";

const UsersRole = ({ user }) => {
  return (
    <tr className="hover:bg-base-300">
      <th>
        {/* <label>
                  <input type="checkbox" className="checkbox" />
                </label> */}
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={user?.profile_image_url} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{user?.name}</div>
          </div>
        </div>
      </td>
      <td>{user?.email}</td>
      <td>{user?.main_career ? user?.main_career : "__"}</td>
      <th>{user?.phone ? user?.phone : "__"}</th>
      <th>
        <div
          className={`${user?.gender && "badge badge-soft"}  badge-${
            user?.gender === "male" ? "primary" : user?.gender === "female" ? "secondary" : ""
          }`}>
          {user?.gender ? user?.gender : "__"}
        </div>
      </th>
      {/* TODO:: ban user and delete feature is not available yet */}
      {/* <td className="flex justify-center gap-2">
        <div className="tooltip tooltip-error " data-tip="Delete permanently">
          <button className="btn btn-square btn-error btn-soft hover:text-white">
            <MdDelete size={20} />
          </button>
        </div>
        <div className="tooltip tooltip-error " data-tip="Ban user">
          {<button className="btn btn-square btn-error btn-soft hover:text-white">
                    <FaBan size={20} />
                  </button>}
        </div>
      </td> */}
    </tr>
  );
};

export default UsersRole;
