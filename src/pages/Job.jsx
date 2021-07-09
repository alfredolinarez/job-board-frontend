import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import client from "../providers/api";
import { useAuth } from "../providers/auth";

const Job = () => {
  let history = useHistory();
  const [job, setJob] = useState({});
  const { id } = useParams();
  const auth = useAuth();

  const editJob = async () => {
    history.push(`/job/${id}/edit`);
  };

  const deleteJob = async (x) => {
    try {
      await client.delete(`/jobs/${id}`);
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
        const response = await client.get(`/jobs/${id}`);
        setJob(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  console.log(history.length);
  return (
    <MainLayout>
      <div className="container mx-auto mt-20 bg-white overflow-hidden sm:rounded-lg">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="sm:px-6 order-1 sm:order-none">
            <div className="border-b-2 pb-2">
              <div className="flex flex-row">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {job.company}
                </h3>
                {auth.user.role_id === 1 || auth.user.role_id === 2 ? (
                  <>
                    <PencilAltIcon className="w-6 h-6 ml-5" onClick={editJob} />
                    <TrashIcon
                      className="w-6 h-6 ml-5 cursor-pointer"
                      onClick={deleteJob}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {job.location}
              </p>
            </div>
            <div className="mt-5 border-b-2 pb-2">
              <h3>{job.position}</h3>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={job.logo} alt="" className="pb-5" />
          </div>
        </div>

        <div>
          <div className="py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {job.description}
            </div>
          </div>
          <div className="bg-white py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="text-lg leading-6 font-medium text-gray-900">
              How to apply?
            </div>
          </div>
          <div className="bg-white sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-gray-500">
              {job.how_to_apply}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Job;
