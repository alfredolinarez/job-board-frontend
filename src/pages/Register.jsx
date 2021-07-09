import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import client from "../providers/api";
import { useAuth } from "../providers/auth";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  gender: Yup.string().required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  role: Yup.string().required("Required"),
});

const Register = () => {
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      address: "",
      gender: "",
      phone: "",
      first_name: "",
      last_name: "",
      role: 1,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await client.post("/auth/register", values);
        await auth.login(response.data.data.token);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="font-sans antialiased bg-grey-lightest">
      <div className="w-full bg-grey-lightest">
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded">
            <div className="my-10">
              <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign up
              </h2>
            </div>

            <div className="py-4 px-8">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex mb-4">
                  <div className="w-1/2 mr-1">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <input
                      className="border rounded w-full py-2 px-3 text-grey-darker"
                      name="first_name"
                      type="text"
                      placeholder="Your first name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                    />
                    {formik.errors.first_name ? (
                      <div className="text-red-600">
                        {formik.errors.first_name}
                      </div>
                    ) : null}
                  </div>

                  <div className="w-1/2 ml-1">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>
                    <input
                      className="border rounded w-full py-2 px-3 text-grey-darker"
                      name="last_name"
                      type="text"
                      placeholder="Your last name"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                    />
                    {formik.errors.last_name ? (
                      <div className="text-red-600">
                        {formik.errors.last_name}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-1/2 mr-1">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="telephone"
                    >
                      Telephone
                    </label>
                    <input
                      className="border rounded w-full py-2 px-3 text-grey-darker"
                      name="phone"
                      type="text"
                      placeholder="Your telephone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.errors.phone ? (
                      <div className="text-red-600">{formik.errors.phone}</div>
                    ) : null}
                  </div>
                  <div className="w-1/2 ml-1 mb-4">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <div className="w-full py-2 text-grey-darker">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="gender"
                          onChange={formik.handleChange}
                          value="M"
                        />
                        <span className="ml-2">Masculino </span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          className="form-radio"
                          name="gender"
                          onChange={formik.handleChange}
                          value="F"
                        />
                        <span className="ml-2">Femenino</span>
                      </label>
                      {formik.errors.gender ? (
                        <div className="text-red-600">
                          {formik.errors.gender}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-grey-darker"
                    name="address"
                    type="text"
                    placeholder="Your location address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.errors.address ? (
                    <div className="text-red-600">{formik.errors.address}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-grey-darker"
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-grey-darker"
                    name="username"
                    type="text"
                    placeholder="Your username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  {formik.errors.username ? (
                    <div className="text-red-600">{formik.errors.username}</div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-grey-darker"
                    name="password"
                    type="password"
                    placeholder="Your secure password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password ? (
                    <div className="text-red-600">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Role
                  </label>
                  <div className="w-full py-2 text-grey-darker">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="role"
                        onChange={formik.handleChange}
                        value={2}
                      />
                      <span className="ml-2">User </span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio"
                        name="role"
                        onChange={formik.handleChange}
                        value={3}
                      />
                      <span className="ml-2">Poster</span>
                    </label>
                    {formik.errors.role ? (
                      <div className="text-red-600">{formik.errors.role}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center my-4">
            <Link
              to="/login"
              className="text-grey-dark text-sm no-underline hover:text-grey-darker"
            >
              I already have an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
