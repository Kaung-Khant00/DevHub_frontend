import { useDispatch } from "react-redux";
import Spinner from "../../Common/Spinner";
import { AiOutlineFileSearch } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import ImageWIthSkeleton from "../../Common/ImageWIthSkeleton";

const ReportsRole = ({ report }) => {
  return (
    <tr key={report.id} className="hover:bg-base-300">
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
              <ImageWIthSkeleton src={report.reportable.image_url} />
            </div>
          </div>
          <div>
            <div className="font-bold">{report.reportable.title}</div>
          </div>
        </div>
      </td>
      <td>
        {report.reportable.content.length > 100
          ? report.reportable.content.slice(0, 100) + "..."
          : report.reportable.content}
      </td>
      <td>{report.reason.length > 100 ? report.reason.slice(0, 80) + "..." : report.reason}</td>
      <td className="flex justify-center gap-2">
        {report.status === "pending" && (
          <>
            <div className="tooltip tooltip-info " data-tip="Report Detail">
              <button className="btn btn-square btn-info btn-soft hover:text-white">
                <AiOutlineFileSearch size={20} />
              </button>
            </div>
            <div className="tooltip tooltip-error " data-tip="Delete the report">
              <button className="btn btn-square btn-error btn-soft hover:text-white">
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default ReportsRole;
