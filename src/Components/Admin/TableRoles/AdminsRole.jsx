import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminsRole = ({ admin }) => {
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
              <img src={admin?.admin_profile?.office_image_url} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{admin?.name}</div>
          </div>
        </div>
      </td>
      <td>{admin?.email}</td>
      <td>{admin?.age ? admin?.age : "__"}</td>
      <th>{admin?.phone ? admin?.phone : "__"}</th>
      <th>
        <div
          className={`${admin?.gender && "badge badge-soft"} ${
            admin?.gender === "male" ? "badge-primary" : admin?.gender === "female" ? "badge-secondary" : ""
          }`}>
          {admin?.gender ? admin?.gender : "__"}
        </div>
      </th>
      <td className="flex justify-center gap-2">
        <div className="tooltip tooltip-primary " data-tip="Edit Admin profile">
          <Link to={`edit/${admin?.id}`} className="btn btn-square btn-primary btn-soft hover:text-white">
            <BiEdit size={20} />
          </Link>
        </div>
        {/*         <div className="tooltip tooltip-error " data-tip="Delete permanently">
          <button className="btn btn-square btn-error btn-soft hover:text-white">
            <MdDelete size={20} />
          </button>
        </div> */}
        <div className="tooltip tooltip-error " data-tip="Ban user">
          {/* TODO:: ban user feature is not available yet */}
          {/*<button className="btn btn-square btn-error btn-soft hover:text-white">
                      <FaBan size={20} />
                    </button> */}
        </div>
      </td>
    </tr>
  );
};

export default AdminsRole;
