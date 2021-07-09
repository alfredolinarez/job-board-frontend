import { LinkIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import Table from "../components/Table";
import MainLayout from "../layout/MainLayout";
import client from "../providers/api";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  const refresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await client.get("/board");
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [refreshCount]);
  return (
    <MainLayout>
      <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <SearchInput
            url="/board"
            onSearch={(data) => {
              setCategories(data.data);
            }}
          />
        </div>

        <div>
          <Link to="/add">
            <Button text="Post a Job" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto my-10">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
              {categories.map((item) => (
                <div key={item.id}>
                  <div className="mt-10 flex flex-row">
                    <div className="pr-5">
                      <Link to={`category/${item.slug}`}>{item.name}</Link>
                    </div>
                    <div>
                      <LinkIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <hr className="mt-3 mb-10" />
                  <div className="overflow-hidden sm:rounded-lg shadow">
                    <Table
                      data={item.jobs}
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
                      onDelete={refresh}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
