import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const categories = [
  {
    name: "Groceries",
    slug: "groceries",
    image: "/categories/groceries.jpg",
  },
  {
    name: "Fashion",
    slug: "fashion",
    image: "/categories/fashion.jpg",
  },
  {
    name: "Home & Living",
    slug: "home-living",
    image: "/categories/homeliving.jpg",
  },
  {
    name: "Beauty & Personal",
    slug: "beauty",
    image: "/categories/beautycare.jpg",
  },
  {
    name: "Sports & Fitness",
    slug: "sports",
    image: "/categories/sport.jpg",
  },
  {
    name: "Electronics",
    slug: "electronics",
    image: "/categories/electronics.jpg",
  },
  {
    name: "Toys & Kids",
    slug: "toys",
    image: "/categories/toys.jpg",
  },
  {
    name: "Office & Stationery",
    slug: "office-stationery",
    image: "/categories/office.jpg",
  },
];

const HomeSections = () => {
    const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:4000/api/customer/home"
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch products");
      }

      return result;
    },
  });

  const products = data?.products || [];

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch products");
    }
  }, [isError]);


  return (
    <>
      <Navbar />
      <Hero />

      <section id="categories" className="w-full bg-[ #EEF2F6] py-6 sm:py-7">
        <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
          <div className="mb-5 text-center">
            <h2 className="text-[21px] font-bold text-[#0f1b2d]">
              Shop by Categories
            </h2>

            <div className="mx-auto mt-2 h-1 w-7 rounded-full bg-orange-500" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/categories/${category.slug}`}
                className="flex h-32 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
              >
                <div className="flex h-19 w-full items-center justify-center">
                  <img
                    src={category.image}
                    className="h-20 w-30 object-contain"
                  />
                </div>

                <p className="mt-2 px-2 text-center text-[13px] font-semibold text-[#172235]">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
          
        <section className="w-full bg-[ #EEF2F6] pb-7 pt-2">
        <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-[21px] font-bold text-[#0f1b2d]">
              Our Products
            </h2>

            <Link
              to="/products"
              className="shrink-0 text-[13px] font-semibold text-orange-500 transition-colors hover:text-orange-600"
            >
              View All Products
            </Link>
          </div>
          {isLoading ? (
  <div className="py-10 text-center text-sm text-slate-400">
    Loading products...
  </div>
) : products.length === 0 ? (
  <div className="py-10 text-center text-sm text-slate-400">
    No products available.
  </div>
) : (
  
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {products.map((product) => (
      <div
        key={product.id}
        className="group relative min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="relative flex h-46 items-center justify-center bg-white sm:h-40">
          <img
            src={`http://localhost:4000${product.images?.[0]?.imagePath}`}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="px-3 pb-3 pt-3  bg-slate-100 ">
          <h3 className="truncate text-[13px]  font-semibold text-[#172235]">
            {product.name}
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            SKU: {product.sku}
          </p>

          <p className="mt-2 text-[13px] font-bold text-[#172235]">
            Rs. {product.price.toLocaleString()}
          </p>

          <Link
            to={`/product/${product.id}`}
            className="mt-3 flex h-8 w-full items-center justify-center rounded-md border border-orange-500 text-[13px] font-semibold text-orange-500 transition-colors hover:bg-orange-500 hover:text-white active:bg-orange-500 active:text-white"
          >
            View Product
          </Link>
        </div>
      </div>
    ))}
  </div>
)}

        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomeSections;

