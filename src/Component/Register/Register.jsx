import bgImage from "../../Images/samuel-regan-asante-wMkaMXTJjlQ-unsplash.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  let navigate = useNavigate();
  let [apiError, setApiError] = useState("");

  async function registerData(values) {
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );
      console.log(data);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.msg);
      setApiError(err.response?.data?.msg || "Something went wrong");
    }
  }

  let ValidationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Name must be less than 15 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with a capital letter"
      )
      .required("Password is required"),
   age: Yup.number().required('Age is required'),
    phone: Yup.string()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "Phone must be valid")
      .required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => registerData(values),
  });

  return <>
    <div className="container">
      <div className="row align-items-center min-vh-100">
        {/* الصورة */}
        <div className="col-md-6 p-5">
          <img
            src={bgImage}
            alt="register"
            className="img-fluid w-100 h-100 object-fit-cover rounded-start"
          />
        </div>

        {/* الفورم */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="w-100">
            <h2 className="text-center mb-4">Create Account</h2>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <form onSubmit={formik.handleSubmit}>
              {/* name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger small">{formik.errors.name}</div>
                )}
              </div>

              {/* email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger small">{formik.errors.email}</div>
                )}
              </div>

              {/* password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger small">{formik.errors.password}</div>
                )}
              </div>

              {/* age */}
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your age"
                  name="age"
                  id="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age && (
                  <div className="text-danger small">{formik.errors.age}</div>
                )}
              </div>

              {/* phone */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your phone number"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-danger small">{formik.errors.phone}</div>
                )}
              </div>

              {/* button */}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
              {/* LogIn Link */}
              <p className="text-center mt-3 mb-0">
                Do you have an account?{" "}
                <Link to="/" className="text-decoration-none">
                  Login here
                </Link>
                </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
