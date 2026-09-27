import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#E8EEF2] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

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
              <Mail
                size={27}
                strokeWidth={2}
                className="sm:h-7 sm:w-7"
              />
            </div>

          </div>

          <div className="mt-5 text-center">

            <h2 className="text-2xl font-bold text-[#061525] sm:text-3xl">
              Forgot Password?
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
              No worries! Enter the email address associated with your account
              and we'll send you a link to reset your password.
            </p>

          </div>

          <form className="mt-7 sm:mt-8">

            <div>

              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
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
                  sm:py-3.5
                "
              />

            </div>

            <button
              type="submit"
              className="
                mt-6
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
                sm:mt-7
                sm:py-3.5
              "
            >
              Send Reset Link
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

export default ForgotPassword;

