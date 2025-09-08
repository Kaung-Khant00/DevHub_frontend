import React, { useState } from "react";
import { approveGroupRequest, rejectGroupRequest } from "../../../Redux/admin/admin.groupRequest";
import { useDispatch } from "react-redux";
import Spinner from "../../Common/Spinner";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const GroupCreationRequestRole = ({ group }) => {
  const [allowLoading, setAllowLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const dispatch = useDispatch();
  const approveGroupRequestApi = async () => {
    setAllowLoading(true);
    try {
      await dispatch(approveGroupRequest(group.id)).unwrap();
    } finally {
      setAllowLoading(false);
    }
  };
  const rejectGroupRequestApi = async () => {
    setRejectLoading(true);
    try {
      await dispatch(rejectGroupRequest(group.id)).unwrap();
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <tr key={group.id} className="hover:bg-base-300">
      <th>
        {/* 
      selecting all or select multiple is gonna be future feature not today
        <label>
          <input type="checkbox" className="checkbox" />
        </label>*/}
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-15 w-15">
              <img src={group.image_url} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{group.name}</div>
          </div>
        </div>
      </td>
      <td>{group.description.length > 100 ? group.description.slice(0, 100) + "..." : group.description}</td>
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
          group.tags.map((tag, index) => (
            <div key={index} className="badge badge-soft badge-primary text-sm">
              {tag}
            </div>
          ))}
      </th>
      <td className="flex justify-center gap-2">
        {group.status === "pending" && (
          <>
            <div className="tooltip tooltip-success " data-tip="Allow the group">
              <button onClick={approveGroupRequestApi} className="btn btn-square btn-success btn-soft hover:text-white">
                {allowLoading ? <Spinner /> : <IoMdCheckmark size={20} />}
              </button>
            </div>
            <div className="tooltip tooltip-error " data-tip="Deny the group">
              <button onClick={rejectGroupRequestApi} className="btn btn-square btn-error btn-soft hover:text-white">
                {rejectLoading ? <Spinner /> : <RxCross2 size={20} />}
              </button>
            </div>
          </>
        )}
        {group.status === "approved" && <div className="badge badge-success text-white">Approved</div>}
        {group.status === "rejected" && <div className="badge badge-error text-white">Rejected</div>}
      </td>
    </tr>
  );
};

export default GroupCreationRequestRole;
