import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full bg-[#061525]">
      <div className="mx-auto flex min-h-100 max-w-350 items-center justify-center px-4 py-12 sm:px-6 sm:py-14 md:min-h-113 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[30px] leading-[1.2] font-bold tracking-tight text-white sm:text-[34px] md:text-[38px]">
            Everything You Need
            <br />
            <span className="text-orange-500">All in One</span> Place
          </h1>

          <p className="mt-4 max-w-140 text-[13px] leading-6 text-slate-300 sm:text-[14px]">
            Discover quality products from various categories and
            <br className="hidden sm:block" />
            find exactly what you're looking for
          </p>

          <Link
            to="/products"
            className="mt-5 inline-flex h-10 items-center rounded-lg bg-orange-500 px-6 text-[13px] font-semibold text-white transition hover:bg-orange-600"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

