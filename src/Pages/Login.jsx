import { API_URL } from '../config/api';
import { Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext.jsx";


function Login() {
  const location = useLocation();
 
const from = location.state?.from;
  const navigate = useNavigate();
  const { updateAuthState } = useAuth();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const role = location.state?.role || "customer";

  const registrationLinks = {
    customer: {
      text: "Create Customer Account",
      path: "/register/customer",
    },

    vendor: {
      text: "Register as Vendor",
      path: "/register/vendor",
    },
  };

  const registration = registrationLinks[role];

  const loginMutation = useMutation({
  mutationFn: async ({ email, password }) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },

onSuccess: (data) => {
  updateAuthState(data.user);

  setTimeout(() => {
    if (from) {
  navigate(from);
  return;
}

    if (data.user.role === "SUPER_ADMIN") {
      toast.success("Login successful!");
      navigate("/admin/dashboard");
      return;
    }

    if (data.user.role === "VENDOR") {
      if (data.user.vendor?.approvalStatus === "APPROVED") {
        toast.success("Login successful!");
        navigate("/vendor/dashboard");
        return;
      }

      if (data.user.vendor?.approvalStatus === "PENDING") {
        toast.info("Your vendor account is waiting for admin approval");
        navigate("/login");
        return;
      }

      if (data.user.vendor?.approvalStatus === "REJECTED") {
        toast.info(
          "Your vendor Account Application has been rejected "
        );
        navigate("/login");
        return;
      }
    }

    toast.success("Login successful!");
    navigate("/");
  }, 1000);
},
 onError: (error) => {
    toast.error(error.message || "Invalid email or password");
  }
});
  return (
    <div className="min-h-screen bg-[#E8EEF2] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

     
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center sm:min-h-[calc(100vh-5rem)]">

        
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

          <div className="text-center">

            <h1 className="text-3xl font-bold tracking-tight text-[#061525] sm:text-4xl">
              Zentro
            </h1>

            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-orange-500" />

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Welcome back! Please login to your account.
            </p>

          </div>


          <form className="mt-7 sm:mt-8"
    onSubmit={(e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  }}>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input value={email} onChange={(e) => setEmail(e.target.value)}
                id="email"name="email"type="email"placeholder="Enter your email"
                autoComplete="email"
                className="
                  mt-2
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  duration-200
                  placeholder:text-slate-400
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-100
                "
              />
            </div>

            <div className="mt-5">

              <div className="flex items-center justify-between gap-3">

                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="
                    text-xs
                    font-semibold
                    text-orange-500
                    transition
                    duration-200
                    hover:text-orange-600
                    hover:underline
                    sm:text-sm
                  "
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative mt-2">

                <input value={password}onChange={(e) => setPassword(e.target.value)}
                  id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    pr-12
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    duration-200
                    placeholder:text-slate-400
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-md
                    p-1
                    text-slate-400
                    transition
                    duration-200
                    hover:text-orange-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-200
                  "
                >
                  {showPassword ? (
                    <EyeOff size={19} strokeWidth={2} />
                  ) : (
                    <Eye size={19} strokeWidth={2} />
                  )}
                </button>

              </div>

            </div>

            <button type="submit"
              className="
                mt-7
                w-full
                rounded-lg
                bg-orange-500
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                duration-200
                hover:bg-orange-600
                focus:outline-none
                focus:ring-2
                focus:ring-orange-300
                focus:ring-offset-2
                active:scale-[0.99]
                sm:py-3.5 " >
              Login
            </button>

            {registration && (
              <p className="mt-6 text-center text-sm leading-6 text-slate-500">

                Don't have an account?{" "}

                <Link
                  to={registration.path}
                  className="
                    font-semibold
                    text-orange-500
                    transition
                    duration-200
                    hover:text-orange-600
                    hover:underline
                  "
                >
                  {registration.text}
                </Link>

              </p>
            )}

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;

