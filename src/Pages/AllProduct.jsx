import { Link } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";


function AllProducts() {

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

   const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["customerProducts", page],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/api/customer/products?page=${page}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch products");
      }

      return result;
    },
  });

  useEffect(() => {
  if (data?.products) {
    setAllProducts((previousProducts) => {
      const existingIds = new Set(previousProducts.map((product) => product.id));

      const newProducts = data.products.filter(
        (product) => !existingIds.has(product.id)
      );

      return [...previousProducts, ...newProducts];
    });
  }
}, [data]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch products");
    }
  }, [isError]);

  const hasMore = data?.hasMore;
  return (
    <>
      <Navbar />

      <main className="w-full bg-[ #EEF2F6] py-6 sm:py-8">
        <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#0F1B2D] sm:text-3xl">
              Products
            </h1>

            <div className="mx-auto mt-2 h-1 w-7 rounded-full bg-orange-500" />
          </div>

          <div className="grid grid-cols-2 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allProducts.map((product) => (
              <div key={product.id}
                className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="group flex h-48 w-full items-center justify-center bg-white sm:h-44 md:h-48">
                  <img
                      src={`http://localhost:4000${product.images?.[0]?.imagePath}`}
                    className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"  />
                </div>

                <div className="p-3">
                  <h2 className="truncate text-[13px] font-semibold text-[#172235]">
                    {product.name}
                  </h2>

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

          {hasMore && (
  <div className="mt-8 flex justify-center">
    <button
      type="button"
      onClick={() => setPage((previousPage) => previousPage + 1)}
      disabled={isFetching}
      className="rounded-lg bg-orange-500 px-7 py-2.5 text-[12px] font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isFetching ? "Loading..." : "Load More"}
    </button>
  </div>
)}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AllProducts;