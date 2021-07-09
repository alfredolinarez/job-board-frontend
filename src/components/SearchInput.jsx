import { SearchIcon } from "@heroicons/react/outline";
import { Formik, useFormik } from "formik";
import client from "../providers/api";
import Button from "./Button";

const SearchInput = ({ url, onSearch = () => {} }) => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await client.get(url, { params: values });
        onSearch(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
          <SearchIcon className="h-6 w-6" />
        </span>
        <input
          type="search"
          name="search"
          className="flex-1 block w-full h-auto px-5 rounded-none rounded-r-md sm:text-sm border border-gray-300 "
          placeholder="Live Search"
          onChange={formik.handleChange}
          value={formik.values.search}
        />
        <Button text="Search" type="submit" />
      </div>
    </form>
  );
};

export default SearchInput;
