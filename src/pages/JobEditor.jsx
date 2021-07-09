import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import client from "../providers/api";
import * as Yup from "yup";
import { useFormik } from "formik";
import office from "../img/office.png";
import { useParams, useHistory } from "react-router-dom";

const JobSchema = Yup.object().shape({
  company: Yup.string().required(),
  logo: Yup.string(),
  url: Yup.string(),
  position: Yup.string().required(),
  position_type: Yup.string().required(),
  location: Yup.string().required(),
  email: Yup.string().required(),
  description: Yup.string().required(),
  how_to_apply: Yup.string().required(),
  category_id: Yup.string().required(),
  how_to_apply: Yup.string().required(),
});

const JobEditor = () => {
  let history = useHistory();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: {
      company: "",
      logo: "",
      url: "",
      position: "",
      position_type: "",
      location: "",
      email: "",
      description: "",
      how_to_apply: "",
      category_id: "",
      how_to_apply: "",
    },
    validationSchema: JobSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          await client.patch(`/jobs/${id}`, values);
          history.push("/");
        } else {
          await client.post("/jobs", values);
        }
      } catch (error) {
        console.error(error);
      }
      console.log(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await client.get("/categories");
        setCategories(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
    (async () => {
      try {
        const response = await client.get(`/jobs/${id}`);
        formik.setFormikState({
          values: {
            ...response.data.data,
            logo: "",
          },
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  console.log(formik.values);
  console.log(formik.errors);
  return (
    <MainLayout>
      <div className="container mx-auto sm:mt-0">
        <div className="relative md:grid md:grid-cols-1 md:gap-6">
          <img
            src={office}
            alt=""
            className="absolute z-10 right-0 top-52 hidden lg:block max-w-6xl"
            width="50%"
          />
          <div className="md:mt-0 md:col-span-2 z-20">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-xl">
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6 mt-5">
                  <h1 className="text-3xl font-bold">
                    {id ? "Edit job" : "Post a job"}
                  </h1>
                  <div className="grid grid-cols-6 gap-6 pt-10">
                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <select
                          name="category_id"
                          autoComplete="category"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={formik.handleChange}
                          value={formik.values.category_id}
                        >
                          {categories.map((category) => (
                            <option value={category.id}>{category.name}</option>
                          ))}
                          <option value="">Please select a category</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="position_type"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio"
                            name="position_type"
                            value="full-time"
                            onChange={formik.handleChange}
                            checked={
                              formik.values.position_type === "full-time"
                            }
                          />
                          <span className="ml-2">Full Time </span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            className="form-radio"
                            name="position_type"
                            value="part-time"
                            onChange={formik.handleChange}
                            checked={
                              formik.values.position_type === "part-time"
                            }
                          />
                          <span className="ml-2">Part Time</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            className="form-radio"
                            name="position_type"
                            value="freelance"
                            onChange={formik.handleChange}
                            checked={
                              formik.values.position_type === "freelance"
                            }
                          />
                          <span className="ml-2">Freelance</span>
                        </label>
                      </div>
                    </div>

                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          type="text"
                          name="email"
                          className="mt-1 px-3 h-10 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Company
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          type="text"
                          name="company"
                          className="mt-1 px-3 h-10 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={formik.handleChange}
                          value={formik.values.company}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="logo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Logo
                        </label>
                      </div>
                      <div className="items-center justify-center bg-grey-lighter">
                        <label className="w-64 flex flex-col items-center px-4 py-2 bg-white text-gray-400 rounded-lg tracking-wide uppercase border border-gray-300 cursor-pointer">
                          <span className="text-base leading-normal">
                            Select an image file
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            name="logo"
                            onChange={formik.handleChange}
                            value={formik.values.logo}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="url"
                          className="block text-sm font-medium text-gray-700"
                        >
                          URL
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          type="text"
                          name="url"
                          autoComplete="url"
                          className="mt-1 px-3 h-10 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={formik.handleChange}
                          value={formik.values.url}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Position
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          type="text"
                          name="position"
                          autoComplete="position"
                          className="mt-1 px-3 h-10 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={formik.handleChange}
                          value={formik.values.position}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          type="text"
                          name="location"
                          autoComplete="location"
                          className="mt-1 px-3 h-10 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={formik.handleChange}
                          value={formik.values.location}
                        />
                      </div>
                    </div>
                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Job description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                        />
                      </div>
                    </div>
                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="how_to_apply"
                          className="block text-sm font-medium text-gray-700"
                        >
                          How to apply
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <textarea
                          name="how_to_apply"
                          rows={3}
                          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Requirements to apply"
                          onChange={formik.handleChange}
                          value={formik.values.how_to_apply}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right sm:px-6 pb-8">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {id ? "Edit" : "Post"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobEditor;
