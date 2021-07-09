import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Pagination = ({
  totalItems = 1,
  currentPage = 1,
  totalPages = 1,
  path = "/",
}) => {
  const pages = [...new Array(totalPages)].map((value, idx) => (
    <Link
      to={`${path}/${idx + 1}`}
      aria-current="page"
      className={clsx(
        "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
        idx === parseInt(currentPage - 1)
          ? "border-blue-400 bg-blue-50 text-indigo-600"
          : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
      )}
    >
      {idx + 1}
    </Link>
  ));
  console.log(pages);

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          to="/"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to="/"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {totalItems + " "}
            <span>jobs in this category</span> - <span>page</span>{" "}
            <span className="font-medium">
              {currentPage + " "}/{" " + totalPages}
            </span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Link
              to={`${path}/${currentPage - 1}`}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {pages}

            <Link
              to={`${path}/${currentPage + 1}`}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
