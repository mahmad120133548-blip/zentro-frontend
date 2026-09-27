import {
  ArrowLeft,
  Package,
  Edit,
  Tag,
  Boxes,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";


import Sidebar from "../../Components/vendorDashboard/Sidebar";

const SeeProduct = () => {
  const { productId } = useParams();

  const {data,isLoading,isError,} = useQuery({
  queryKey: ["vendorProduct", productId],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:4000/api/vendor/products/${productId}`,
      {
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch product");
    }

    return result;
  },
  enabled: !!productId,
});

const product = data?.product;


const [selectedImage, setSelectedImage] = useState(0);

useEffect(() => {
  if (isError) {
    toast.error("Failed to fetch product");
  }
}, [isError]);

if (isLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-500">Loading product...</p>
    </div>
  );
}

if (!product) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-500">Product not found.</p>
    </div>
  );
}

  const isOutOfStock = product.stockQuantity === 0;

const isLowStock =
  product.stockQuantity > 0 &&
  product.stockQuantity <= product.minimumStock;

const isInStock = product.stockQuantity > product.minimumStock;

  const nextImage = () => {
    setSelectedImage((current) =>
      current === product.images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0 ? product.images.length - 1 : current - 1
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen ml-0 lg:ml-64">
        <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Product Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View your product information
            </p>
          </div>
        </header>

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/vendor/products"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Back to Products
            </Link>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <Package size={21} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {product.name}
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Product ID: #{product.id}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                  <div className="min-w-0">
                    <div className="relative overflow-hidden rounded-2xl bg-slate-100">
  {product.images?.length > 0 ? (
    <>
      <img
        src={`http://localhost:4000${product.images[selectedImage]?.imagePath}`}
        alt={`${product.name} ${selectedImage + 1}`}
        className="h-105 w-full object-contain bg-white sm:h-125"
      />

      {product.images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousImage}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white hover:text-orange-500"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white hover:text-orange-500"
          >
            <ChevronRight size={19} />
          </button>
        </>
      )}
    </>
  ) : (
    <div className="flex aspect-4/3 items-center justify-center">
      <Package className="h-12 w-12 text-slate-400" />
    </div>
  )}
</div>

                    {product.images?.length > 0 && (
  <>
    <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
      {product.images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          onClick={() => setSelectedImage(index)}
          className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
            selectedImage === index
              ? "border-orange-500"
              : "border-slate-200 hover:border-orange-400"
          }`}
        >
          <img
            src={`http://localhost:4000${image.imagePath}`}
            alt={`${product.name} ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>

    <p className="mt-3 text-center text-xs text-slate-400">
      Image {selectedImage + 1} of {product.images.length}
    </p>
  </>
)}

                  </div>

                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight text-[#0B1F33] sm:text-3xl">
                      {product.name}
                    </h1>

                    <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                      SKU: {product.sku}
                    </p>

                    <div className="mt-5">
  {isOutOfStock ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
      <span className="h-2 w-2 rounded-full bg-red-500" />
      Out of Stock
    </span>
  ) : isLowStock ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
      <span className="h-2 w-2 rounded-full bg-orange-500" />
      Low Stock
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      In Stock
    </span>
  )}
</div>

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-[#0B1F33]">
                        Description
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-7 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2">
                          <Tag size={17} className="text-orange-500" />

                          <p className="text-xs font-medium text-slate-500">
                            Price
                          </p>
                        </div>

                        <p className="mt-2 text-xl font-bold text-[#0B1F33]">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2">
                          <Boxes size={17} className="text-orange-500" />

                          <p className="text-xs font-medium text-slate-500">
                            Current Stock
                          </p>
                        </div>

                        <p className="mt-2 text-xl font-bold text-[#0B1F33]">
                          {product.stockQuantity}{" "}
                          <span className="text-sm font-medium text-slate-500">
                            units
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-2">
                        <Package size={17} className="text-orange-500" />

                        <p className="text-xs font-medium text-slate-500">
                          Category
                        </p>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {product.category.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SeeProduct;