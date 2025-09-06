import { FaBan } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserTable = () => {
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
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
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
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                  </div>
                </div>
              </td>
              <td>test@gmail.com</td>
              <td>Web Developer</td>
              <th>09122323423</th>
              <th>
                <div className="badge badge-soft badge-primary">MALE</div>
              </th>
              <td className="flex justify-center gap-2">
                <div className="tooltip tooltip-error " data-tip="Delete permanently">
                  <button className="btn btn-square btn-error btn-soft hover:text-white">
                    <MdDelete size={20} />
                  </button>
                </div>
                <div className="tooltip tooltip-error " data-tip="Ban user">
                  <button className="btn btn-square btn-error btn-soft hover:text-white">
                    <FaBan size={20} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
