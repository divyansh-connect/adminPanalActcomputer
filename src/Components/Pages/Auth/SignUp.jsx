import React, { useState } from "react";
import { postAuthSignUp } from "../../../Services/AuthServices";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userName: "",
    userPassword: "",
    gender: "",
    role: "staff",
  });

  const validate = () => {
    let newErrors = {};
    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    // Email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    // Phone
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    // Username
    if (!formData.userName) {
      newErrors.userName = "Username is required";
    }
    // Password
    if (!formData.userPassword) {
      newErrors.userPassword = "Password is required";
    } else if (formData.userPassword.length < 6) {
      newErrors.userPassword = "Password must be at least 6 characters";
    }
    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSignUp(true);
    // API call
    try {
      const response = await postAuthSignUp(formData);
      if (!response.success) {
        return setErrors({ fetchErr: response.message });
      }
      navigate("/dashboard");
    } catch (error) {
      if (error.message === "Unauthorized") return;
      return setErrors({ fetchErr: error.message });
    } finally {
      setIsSignUp(false);
    }
  };
  return (
    <div className="container mt-md-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-light ">
              <h3 className="text-center my-3 fw-bold">
                Staff Registration Form
              </h3>
            </div>
            {errors.fetchErr && (
              <div className="text-danger text-center small my-2">
                {errors.fetchErr}
              </div>
            )}
            <div className="card-body p-4 row">
              {/* First Name */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">First Name*</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
                  }}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className="text-danger small">{errors.firstName}</div>
                )}
              </div>

              {/* Last Name */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
                  }}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email id"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>

              {/* Phone */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Phone*</label>
                <input
                  type="tel"
                  maxLength="10"
                  className="form-control"
                  placeholder="Enter mobile number"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="text-danger small">{errors.phone}</div>
                )}
              </div>

              {/* Username */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Username*</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Enter Username"
                  value={formData.userName}
                  onChange={handleChange}
                />
                {errors.userName && (
                  <div className="text-danger small">{errors.userName}</div>
                )}
              </div>

              {/* Password */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Password*</label>
                <input
                  type="password"
                  className="form-control"
                  name="userPassword"
                  placeholder="Enter Password"
                  value={formData.userPassword}
                  onChange={handleChange}
                />
                {errors.userPassword && (
                  <div className="text-danger small">{errors.userPassword}</div>
                )}
              </div>

              {/* Gender */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Gender*</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="male">Other</option>
                </select>
                {errors.gender && (
                  <div className="text-danger small">{errors.gender}</div>
                )}
              </div>

              {/* Role */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Role*</label>
                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="head">Head</option>
                </select>
              </div>

              {/* Submit */}
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-50"
                  onClick={handleSubmit}
                  disabled={isSignUp}
                >
                  {isSignUp ? "Registering...." : "Create Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
