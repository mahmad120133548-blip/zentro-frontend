import {
  CheckCircle2,
  Package,
  Store,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../Components/Navbar";

const About = () => {
  return (
    <>
    <Navbar/>

    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-[#0B1F33] px-5 py-20 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-md font-semibold uppercase tracking-wider text-orange-400">
            About Zentro
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            A simpler way to discover and manage products
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Zentro is an online marketplace and inventory management platform
            designed to connect customers with trusted vendors while making
            product and store management simple for businesses
          </p>
        </div>
      </section>

      {/* About */}
      <section className="px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#0B1F33]">
              What is Zentro?
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Zentro brings customers and vendors together in one platform.
              Customers can browse products from different stores, explore
              categories, and place orders with ease
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              For vendors, Zentro provides tools to manage products, monitor
              inventory, receive orders, and manage their store from one
              place
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Our goal is to keep the experience straightforward, organized,
              and convenient for everyone using the platform.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Package className="text-orange-500" size={28} />
                <h3 className="mt-4 font-semibold text-[#0B1F33]">
                  Easy Shopping
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Browse products from different vendors in one place.
                </p>
              </div>

              <div>
                <Store className="text-orange-500" size={28} />
                <h3 className="mt-4 font-semibold text-[#0B1F33]">
                  Vendor Management
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Manage products, stock, orders, and store activity easily.
                </p>
              </div>

              <div>
                <ShieldCheck className="text-orange-500" size={28} />
                <h3 className="mt-4 font-semibold text-[#0B1F33]">
                  Trusted Stores
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Vendors go through an approval process before their stores
                  become active.
                </p>
              </div>

              <div>
                <CheckCircle2 className="text-orange-500" size={28} />
                <h3 className="mt-4 font-semibold text-[#0B1F33]">
                  Simple Experience
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Designed to keep shopping and inventory management simple
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Our Approach
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#0B1F33]">
            Built around simplicity and convenience
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            We believe an online marketplace should be easy to understand and
            easy to use. Zentro focuses on bringing products, vendors,
            inventory, and orders together in a clear and organized
            experience.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-2xl bg-[#0B1F33] px-6 py-12 text-center sm:px-10">
          <h2 className="text-3xl font-bold text-white">
            Discover Zentro
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            Explore products, discover vendors, and experience a simpler way
            to shop online.
          </p>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;

