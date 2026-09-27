import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#1E3A5F] bg-[#0F172A] text-white">
      <div className="mx-auto max-w-350 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-orange-500">
                Zen<span className="text-white">Tro</span>
              </span>
            </h2>

            <p className="mt-2 max-w-xs text-xs leading-5 text-slate-400">
              Discover quality products from trusted businesses,
              all in one place
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide active:text-orange-500">
              Shop
            </h3>

            <div className="mt-2 flex flex-col gap-1.5">
              <Link
                to="/products"
                className="w-fit text-sm text-slate-400 hover:text-orange-500 active:text-orange-500"
              >
                Products
              </Link>

            

              <Link
                to="/about"
                className="w-fit text-sm text-slate-400 hover:text-orange-500"
              >
                About Us
              </Link>

              <Link
                to="/privacy"
                className="w-fit text-sm text-slate-400 hover:text-orange-500 active:text-orange-500"
              >
                Privacy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide">
              For Businesses
            </h3>

            <div className="mt-2 flex flex-col gap-1.5">
              <Link
                to="/register/vendor"
                className="w-fit text-sm text-slate-400 hover:text-orange-500 active:text-orange-500"
              >
                Register As Vendor
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[#1E3A5F] pt-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[11px] text-slate-500">
            © 2026 InventoryPro. All rights reserved
          </p>

          <p className="text-[11px] text-slate-500">
            Built for businesses. Designed for growth
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

