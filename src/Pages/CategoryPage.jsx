import { API_URL } from '../config/api';
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

function CategoryProducts() {
const { categorySlug } = useParams();

 const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const previousCategory = useRef(categorySlug);

const { data, isLoading, isError } = useQuery({
  queryKey: ["categoryProducts", categorySlug, page],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/customer/categories/products/${categorySlug}?page=${page}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to fetch category products"
      );
    }

    return result;
  },
});
useEffect(() => {
  if (data?.products) {
    setAllProducts((previousProducts) => {
      const existingIds = new Set(
        previousProducts.map((product) => product.id)
      );

      const newProducts = data.products.filter(
        (product) => !existingIds.has(product.id)
      );

      return [...previousProducts, ...newProducts];
    });
  }
}, [data]);

useEffect(() => {
  if (isError) {
    toast.error("Failed to fetch category products");
  }
}, [isError]);

useEffect(() => {
  if (previousCategory.current !== categorySlug) {
    setPage(1);
    setAllProducts([]);
    previousCategory.current = categorySlug;
  }
}, [categorySlug]);

const category = data?.category;

return (
<> <Navbar />


  <main className="min-h-screen bg-[#F4F7FA]">
    <section className="bg-[#0B1F33]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-2">
        <div className="mt-2 sm:mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
            Category
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {category?.name || "Category"}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            {category?.description || "Explore products from this category."}
          </p>
        </div>
      </div>
    </section>

    <section className="w-full py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F33] sm:text-xl">
              {category?.name || "Category"} Products
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Products available in this category
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {data?.totalProducts || 0} Products
          </span>
        </div>

        {isLoading && allProducts.length === 0 ? (
  <div className="py-10 text-center text-sm text-slate-400">
    Loading products...
  </div>
) : allProducts.length === 0 ? (
  <div className="py-10 text-center text-sm text-slate-400">
    No products available in this category.
  </div>
) : (
  <div className="grid grid-cols-2 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {allProducts.map((product) => (
      <div
        key={product.id}
        className="group min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      >
        <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-white sm:h-44 md:h-43">
          <img
            src={`${API_URL}${product.images?.[0]?.imagePath}`}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="p-3">
          <h3 className="truncate text-[13px] font-semibold text-[#0B1F33]">
            {product.name}
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            SKU: {product.sku}
          </p>

          <p className="mt-2 text[13px] font-bold text-[#0B1F33]">
            Rs. {product.price.toLocaleString()}
          </p>

          <Link
            to={`/product/${product.id}`}
            className="mt-3 flex h-8 w-full items-center justify-center rounded-md border border-orange-500 text-[12px] font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white active:bg-orange-500 active:text-white"
          >
            View Product
          </Link>
        </div>
      </div>
    ))}
  </div>
)}

        {data?.hasMore && (
  <div className="mt-8 flex justify-center">
    <button
      type="button"
      onClick={() => setPage((previousPage) => previousPage + 1)}
      disabled={isLoading}
      className="rounded-lg border border-orange-500 px-7 py-2.5 text-xs font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "Loading..." : "Load More"}
    </button>
  </div>
)}
      </div>
    </section>
  </main>

  <Footer />
</>


);
}

export default CategoryProducts;
