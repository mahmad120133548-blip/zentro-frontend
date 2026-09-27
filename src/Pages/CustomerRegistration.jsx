import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function CustomerRegistration() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


const navigate = useNavigate();

const customerRegisterMutation = useMutation({
  mutationFn: async (customerData) => {
    const response = await fetch(
      "http://localhost:4000/api/auth/customer/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },

  onSuccess: (data) => {
    toast.success(data.message);

    navigate("/login", {
      state: {
        role: "customer",
      },
    });
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

const handleSubmit = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");

  customerRegisterMutation.mutate({
    name,
    email,
    password,
    confirmPassword,
  });
};

  

  return (
    <div className="min-h-screen bg-[#DCE5EB] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center sm:min-h-[calc(100vh-5rem)]">

        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">

          <div className="text-center">

            <h1 className="text-3xl font-bold tracking-tight text-[#061525] sm:text-4xl">
              Create Customer Account
            </h1>

            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-orange-500" />

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Create your account and start exploring vendors.
            </p>

          </div>

          <form className="mt-7 sm:mt-8" onSubmit={handleSubmit}>

            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
  onChange={(e) => {
    setName(e.target.value);
    setError("");
  }}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"
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
                placeholder="Enter your email"
                value={email}
onChange={(e) => {
  setEmail(e.target.value);
  setError("");
}}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"
              />
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5"
                />

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

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  className={`w-full rounded-lg border ${
                    error ? "border-red-500" : "border-slate-300"
                  } px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:py-3.5`}
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

            <button
  type="submit"
  disabled={customerRegisterMutation.isPending}
  className="mt-7 w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5"
>
  {customerRegisterMutation.isPending
    ? "Creating Account..."
    : "Create Account"}
</button>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}

              <Link
                to="/login"
                state={{ role: "customer" }}
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

export default CustomerRegistration;

