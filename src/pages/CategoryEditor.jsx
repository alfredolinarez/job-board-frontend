import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import client from "../providers/api";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams, useHistory, Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import slugify from "slugify";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required(),
  slug: Yup.string().required(),
});

const CategoryEditor = () => {
  let history = useHistory();
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: CategorySchema,
    onSubmit: async (values) => {
      try {
        if (slug) {
          await client.patch(`/categories/${slug}`, values);
        } else {
          await client.post("/categories", values);
        }
        history.push(`/admin/categories/${values.slug}`);
      } catch (error) {
        console.error(error);
      }
    },
  });
  const refresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const deleteCategory = async (slug) => {
    try {
      await client.delete(`/categories/${slug}`);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const [refreshCount, setRefreshCount] = useState(0);

  const handleNameChange = (e) => {
    formik.setFieldValue("name", e.target.value);
    formik.setFieldValue("slug", slugify(e.target.value).toLowerCase());
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await client.get("/categories");
        const categories = response.data.data;
        setCategories(categories);
        if (slug) {
          const category = categories.find(
            (category) => slug === category.slug
          );
          console.log(slug);

          if (category) {
            formik.setFormikState({ values: category });
          }
        }
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [slug, refreshCount]);
  return (
    <MainLayout>
      <div className="container mx-auto sm:mt-0">
        <div className="relative md:grid md:grid-cols-1 md:gap-6">
          <div className="md:mt-0 md:col-span-2 z-20">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-xl">
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6 mt-5">
                  <h1 className="text-3xl font-bold">Categories</h1>
                  <div className="grid grid-cols-6 gap-6 pt-10">
                    <div className="col-span-6 md:flex md:items-center">
                      <div className="md:w-2/3 pr-6">
                        <input
                          type="text"
                          name="name"
                          className="mt-1 px-3 h-10 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={handleNameChange}
                          value={formik.values.name}
                          placeholder="Name"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <input
                          type="text"
                          name="slug"
                          className="mt-1 px-3 h-10 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={formik.handleChange}
                          value={formik.values.slug}
                          placeholder="Slug"
                        />
                      </div>
                      <div className="text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {slug ? "Edit" : "Post"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-20">
                    <ul className="divide-y divide-gray-200">
                      {categories.map((category) => (
                        <li className="flex flex-row py-5">
                          <span className="flex-1">{category.name}</span>
                          <Link to={`/admin/categories/${category.slug}`}>
                            <PencilAltIcon className="w-6 h-6 ml-5 cursor-pointer" />
                          </Link>

                          <TrashIcon
                            className="w-6 h-6 ml-5 cursor-pointer"
                            onClick={() => deleteCategory(category.slug)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoryEditor;
