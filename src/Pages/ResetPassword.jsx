import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
  };

  return (
    <div className="min-h-screen bg-[#EEF3F6] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center sm:min-h-[calc(100vh-5rem)]">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#061525] sm:text-4xl">
              Zentro
            </h1>

            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-orange-500" />
          </div>

          <div className="mt-7 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500 sm:h-16 sm:w-16">
              <LockKeyhole size={27} strokeWidth={2} />
            </div>
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-2xl font-bold text-[#061525] sm:text-3xl">
              Reset Password
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
              Create a new password for your account. Make sure it's strong
              and easy for you to remember.
            </p>
          </div>

          <form className="mt-7 sm:mt-8" onSubmit={handleSubmit}>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                New Password
              </label>

              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
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
                    sm:py-3.5
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? "Hide new password"
                      : "Show new password"
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
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  className={`
                    w-full
                    rounded-lg
                    border
                    ${error ? "border-red-500" : "border-slate-300"}
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
                    sm:py-3.5
                  `}
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
                sm:py-3.5
              "
            >
              Reset Password
            </button>

            <div className="mt-6 flex justify-center">
              <Link
                to="/login"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#061525]
                  transition
                  duration-200
                  hover:text-orange-500
                "
              >
                <ArrowLeft size={17} />
                Back to Login
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

