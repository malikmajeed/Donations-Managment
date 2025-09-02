import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerUser } from "../../services/auth.services";
import { validateSignupForm } from "../../utils/validateSignup";

export default function SignUp({ selectForm }) {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "donor",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setError((prev) => ({ ...prev, phone: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const data = await registerUser(formData);
      if (data.success) {
        alert("Account Created Successfully!");
        setFormData({
          fName: "",
          lName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "donor",
          gender: "",
        });
        setError({});
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 border border-indigo-400/50 rounded-lg shadow-md flex flex-col">
      <h2 className="text-center text-xl font-semibold text-black mb-4">Create your account</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="fName" className="block text-sm font-medium">First Name *</label>
          <input
            type="text"
            id="fName"
            name="fName"
            value={formData.fName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {error.fName && <p className="text-red-500 text-sm mt-1">{error.fName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lName" className="block text-sm font-medium">Last Name *</label>
          <input
            type="text"
            id="lName"
            name="lName"
            value={formData.lName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {error.lName && <p className="text-red-500 text-sm mt-1">{error.lName}</p>}
        </div>

        {/* Gender */}
        <div>
          <span className="block text-sm font-medium">Gender *</span>
          <div className="flex gap-4 mt-2">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="w-4 h-4 accent-indigo-500"
                />
                <span className="capitalize">{g}</span>
              </label>
            ))}
          </div>
          {error.gender && <p className="text-red-500 text-sm mt-1">{error.gender}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
          <PhoneInput
            country={"pk"}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputClass="!w-full !h-10 !pl-12 !border !rounded focus:!outline-none focus:!ring-2 focus:!ring-indigo-400"
            buttonClass="!border !rounded-l bg-transparent"
            dropdownClass="!w-72 !max-h-48 !overflow-y-auto !border !rounded shadow"
            searchClass="!w-full !p-2 !border !rounded mb-2"
          />
          {error.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password *</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password *</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 py-2 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600 transition"
        >
          Create
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a
            href="#"
            className="text-indigo-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              selectForm(false);
            }}
          >
            Log in here...
          </a>
        </p>
      </form>
    </div>
  );
}
