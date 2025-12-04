import axios from "axios";
import bgImage from "../../Images/tyson-moultrie-BQTHOGNHo08-unsplash.jpg";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";

export default function LogIn({ saveLoginData }) {
  let navigate = useNavigate();
  let [apiError, setApiError] = useState("");

  async function loginData(values) {
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        saveLoginData();   // ← استدعاء الدالة
        navigate("/home");
      }
      else {
        setApiError("Invalid login credentials");
      }
    } catch (err) {
      setApiError(err.response?.data?.msg || "Login failed, try again");
    }
  }

  let VaildationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: VaildationSchema,
    onSubmit: (values) => loginData(values),
  });

  return (
    <>
      <div className="container">
        <div className="row min-vh-100 align-items-center">
          {/* الصورة - تاخد 6 أعمدة */}
          <div className="col-md-6">
            <img
              src={bgImage}
              alt="login"
              className="img-fluid w-100 h-100 object-fit-cover rounded-start"
            />
          </div>

          {/* الفورم - تاخد 6 أعمدة */}
          <div className="col-md-6 p-5">
            <h2 className="mb-4">Login</h2>

            {apiError && <div className="alert alert-danger">{apiError}</div>}

            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label> 
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              {/* Register Link */}
              <p className="text-center mt-3 mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="text-decoration-none">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
