import { API_URL } from '../config/api';

import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


function VendorRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
  name: "",
  businessName: "",
  email: "",
  phone: "",
  categoryId: "",
  password: "",
  confirmPassword: "",
});

const { data: categories = [], isLoading: categoriesLoading,} = useQuery({
  queryKey: ["categories"],
  queryFn: async () => {
    const response = await fetch(`${API_URL}/api/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    return data.categories;
  },
});

const vendorRegisterMutation = useMutation({
  mutationFn: async (vendorData) => {
    const response = await fetch(
      `${API_URL}/api/auth/vendor-register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendorData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },

  onSuccess: (data) => {
    toast.success("Your Application for vendor registration has been  submitted successfully.You will be notify after the admin Approval");
    
    setFormData({
      name: "",
      businessName: "",
      email: "",
      phone: "",
      categoryId: "",
      password: "",
      confirmPassword: "",
    });

    setError("");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");

  vendorRegisterMutation.mutate(formData);
};

  return (
    <div className="min-h-screen bg-[#EEF3F6] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center sm:min-h-[calc(100vh-5rem)]">

        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#061525] sm:text-4xl">
              Register as a Vendor
            </h1>

            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-orange-500" />

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Create your business account and join Zentro.
            </p>
          </div>

          <form className="mt-7 sm:mt-8" onSubmit={handleSubmit}>

            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>
            <input id="fullName" type="text" placeholder="Enter your full name"
  value={formData.name}
  onChange={(e) =>setFormData({...formData,name: e.target.value,})}
  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"
  required/>
            </div>

            <div className="mt-5">
              <label
                htmlFor="businessName"
                className="text-sm font-semibold text-slate-700"
              >
                Business Name
              </label>

              <input id="businessName" type="text" placeholder="Enter your business name"  value={formData.businessName}
              onChange={(e) =>setFormData({ ...formData,businessName: e.target.value, }) }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email" value={formData.email}
                onChange={(e) =>setFormData({...formData,email: e.target.value,})}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="phone"
                className="text-sm font-semibold text-slate-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number" value={formData.phone}
                onChange={(e) =>setFormData({...formData,phone: e.target.value,})}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-slate-700"
              >
                Business Category
              </label>

   <select id="category"
  value={formData.categoryId}
  onChange={(e) =>
    setFormData({
      ...formData,
      categoryId: e.target.value,
    })
  }
  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"required>
  <option value="" disabled>
    {categoriesLoading ? "Loading categories...": "Select your business category"}
  </option>

  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                 value={formData.password}
  onChange={(e) => {setFormData({  ...formData,password: e.target.value, });
    setError("");
  }}
className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5" required/>

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-slate-400 transition hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative mt-2">
                <input id="confirmPassword"
  type={showConfirmPassword ? "text" : "password"}
  placeholder="Confirm your password"
  value={formData.confirmPassword}
  onChange={(e) => {
    setFormData({
      ...formData,
      confirmPassword: e.target.value,
    });
    setError("");
  }}
  className={`w-full rounded-lg border ${
    error ? "border-red-500" : "border-slate-300"
  } px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5`}
  required
/>
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-slate-400 transition hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {error && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  {error}
                </p>
              )}
            </div>
            <button type="submit"
  disabled={vendorRegisterMutation.isPending}
  className="mt-7 w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5">
  {vendorRegisterMutation.isPending
    ? "Registering..."
    : "Register as Vendor"}
</button>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}

              <Link
                to="/login"
                state={{ role: "vendor" }}
                className="font-semibold text-orange-500 transition hover:text-orange-600 hover:underline"
              >
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default VendorRegistration;

