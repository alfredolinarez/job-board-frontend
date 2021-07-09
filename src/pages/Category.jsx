import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";
import Table from "../components/Table";
import MainLayout from "../layout/MainLayout";
import client from "../providers/api";
import { useAuth } from "../providers/auth";

const Category = () => {
  const auth = useAuth();
  let history = useHistory();
  const { slug, page = 1 } = useParams();
  const [category, setCategory] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);

  const deleteCategory = async (x) => {
    try {
      await client.delete(`/categories/${slug}`);
      if (history.length === 1) {
        history.push("/");
      } else {
        history.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await client.get(`/categories/${slug}/${page}`);
        setCategory(response.data.data);
        setTotalPages(response.data.pages);
        setTotalJobs(response.data.total);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  return (
    <MainLayout>
      <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <SearchInput />
        </div>
        <div>
          <Button text="Search" />
        </div>
        <div>
          <Link to="/add">
            <Button text="Post a Job" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto  my-10">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
              <div className="flex flex-row mt-10">
                <h1>{category.name}</h1>
                {auth.user.role_id === 1 || auth.user.role_id === 2 ? (
                  <>
                    <Link to={`/admin/categories/${slug}`}>
                      <PencilAltIcon className="w-6 h-6 ml-5" />
                    </Link>

                    <TrashIcon
                      className="w-6 h-6 ml-5 cursor-pointer"
                      onClick={deleteCategory}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <hr className="mt-3 mb-10" />
              <div className="overflow-hidden sm:rounded-lg shadow">
                <Table
                  data={category.jobs || []}
                  columns={[
                    {
                      header: "Location",
                      property: "location",
                    },
                    {
                      header: "Position",
                      property: "position",
                    },
                    {
                      header: "Company",
                      property: "company",
                    },
                    {
                      header: "Date",
                      property: "created_at",
                    },
                  ]}
                />
              </div>
              <div className="pt-10">
                <Pagination
                  totalPages={totalPages}
                  currentPage={page}
                  totalItems={totalJobs}
                  path={`/category/${slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
