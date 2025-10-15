import { AiOutlineFileSearch } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import ImageWIthSkeleton from "../../Common/ImageWIthSkeleton";
import { Link } from "react-router-dom";
/* import { useDispatch } from "react-redux";
import { deleteReport } from "../../../Redux/admin/admin.reports"; */

const ReportsRole = ({ report }) => {
  const statusColor =
    report?.status === "pending"
      ? "badge badge-warning"
      : report?.status === "resolved"
      ? "badge badge-success"
      : "badge badge-error";
  /*   const dispatch = useDispatch();
  function deleteReportApi() {
    dispatch(deleteReport(report.id));
  } */
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
            {report.reportable.image_url && (
              <div className="mask mask-squircle h-15 w-15">
                <ImageWIthSkeleton src={report.reportable.image_url} />
              </div>
            )}
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
      <td>
        <div className={statusColor}>{report.status}</div>
      </td>
      <td className="flex justify-center gap-2">
        <div className="tooltip tooltip-info " data-tip="Report Detail">
          <Link to={`detail/post/${report.id}`} className="btn btn-square btn-info btn-soft hover:text-white">
            <AiOutlineFileSearch size={20} />
          </Link>
        </div>
        {/*         <div className="tooltip tooltip-error " data-tip="Delete the report">
          <button onClick={deleteReportApi} className="btn btn-square btn-error btn-soft hover:text-white">
            <AiOutlineDelete size={20} />
          </button>
        </div> */}
      </td>
    </tr>
  );
};

export default ReportsRole;
