import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import client from "../providers/api";
import { useAuth } from "../providers/auth";
import { useHistory } from "react-router-dom";

const Table = ({ columns = [], data, onDelete = (id) => {} }) => {
  let history = useHistory();
  const auth = useAuth();
  const deleteJob = async (jobId) => {
    try {
      await client.delete(`/jobs/${jobId}`);
      onDelete(jobId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr className="hidden flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
          {columns.map((column, idx) => (
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              key={idx}
            >
              {column.header}
            </th>
          ))}
          {auth.user.role_id === 1 || auth.user.role_id === 2 ? (
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Operations
            </th>
          ) : (
            ""
          )}
        </tr>
      </thead>
      <tbody className="flex-1 sm:flex-none bg-white divide-y divide-gray-200">
        {data.map((job) => (
          <tr
            className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
            key={job.id}
          >
            {columns.map((column, idx) => (
              <td className="px-6 py-4 whitespace-nowrap" key={idx}>
                <div className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider sm:hidden">
                  {column.header}
                </div>
                <div className="text-sm text-gray-900">
                  <Link to={`/job/${job.id}`}>{job[column.property]}</Link>
                </div>
              </td>
            ))}
            {auth.user.role_id === 1 || auth.user.role_id === 2 ? (
              <td>
                <div className="flex flex-row">
                  <Link to={`/job/${job.id}/edit`}>
                    <PencilAltIcon className="w-6 h-6 ml-5 cursor-pointer" />
                  </Link>

                  <TrashIcon
                    className="w-6 h-6 ml-5 cursor-pointer"
                    onClick={() => deleteJob(job.id)}
                  />
                </div>
              </td>
            ) : (
              ""
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
