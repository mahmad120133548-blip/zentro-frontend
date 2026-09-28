import { API_URL } from '../../config/api';
import {
  Plus,
  Search,
  Filter,
  Package,
  Eye,
  Edit3,
  Trash2,
  Bell,
  X,
  Menu
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

import Sidebar from "../../Components/vendorDashboard/Sidebar";

const Products = () => {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const searchTerm = searchParams.get("search") || "";
  const stockFilter = searchParams.get("stockFilter") || "All";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState(searchTerm);

  const [showStockModal, setShowStockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockQuantity, setStockQuantity] = useState("");

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = searchInput.trim();
      const currentSearch = searchParams.get("search") || "";

      if (value === currentSearch) {
        return;
      }

      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.delete("page");

      setSearchParams(params, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, searchParams, setSearchParams]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page);
    }

    setSearchParams(params, { replace: true });
  };

const {data,isLoading,isError,} = useQuery({
  queryKey: ["vendorProducts", currentPage, searchTerm, stockFilter],
  queryFn: async () => {
    const params = new URLSearchParams();

    params.append("page", currentPage);

    if (searchTerm.trim()) {
      params.append("search", searchTerm.trim());
    }

    if (stockFilter !== "All") {
      params.append("stockFilter", stockFilter);
    }

    const response = await fetch(
      `${API_URL}/api/vendor/products?${params.toString()}`,
      {
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch products");
    }

    return result;
  },
});

const products = data?.products || [];
const pagination = data?.pagination;

useEffect(() => {
  if (isError) {
    toast.error("Failed to fetch products");
  }
}, [isError]);

const restockMutation = useMutation({
  mutationFn: async ({ productId, quantity }) => {
    const response = await fetch(
      `${API_URL}/api/vendor/products/restock/${productId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to restock product");
    }

    return data;
  },

  onSuccess: () => {
    toast.success("Product restocked successfully");

    queryClient.invalidateQueries({
      queryKey: ["vendorProducts"],
    });

    setShowStockModal(false);
    setSelectedProduct(null);
    setStockQuantity("");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

const deleteMutation = useMutation({
  mutationFn: async (productId) => {
    const response = await fetch(
      `${API_URL}/api/vendor/products/delete/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete product");
    }

    return data;
  },

  onSuccess: () => {
    toast.success("Product deleted successfully");

    queryClient.invalidateQueries({
      queryKey: ["vendorProducts"],
    });

    setShowDeleteModal(false);
    setSelectedProduct(null);
  },

  onError: (error) => {
    toast.error(error.message);
  },
});


if (isLoading)
  {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-500">Loading products...</p>
    </div>
  );
}


const formatPrice = (price) => {
  return Number(price).toLocaleString();
};

   const getStockStatus = (stock, minimumStock) => {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      className: "bg-red-100 text-red-700",
      textClassName: "text-red-500",
    };
  }

  if (stock <= minimumStock) {
    return {
      label: "Low Stock",
      className: "bg-orange-100 text-orange-700",
      textClassName: "text-orange-500",
    };
  }

  return {
    label: "In Stock",
    className: "bg-green-100 text-green-700",
    textClassName: "text-green-600",
  };
};

  const openStockModal = (product) => {
    setSelectedProduct(product);
    setStockQuantity("");
    setShowStockModal(true);
  };


  

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };


  

  const handleAddStock = (e) => {
  e.preventDefault();

  if (!stockQuantity || Number(stockQuantity) <= 0) {
    toast.error("Enter a valid quantity");
    return;
  }

  restockMutation.mutate({
    productId: selectedProduct.id,
    quantity: Number(stockQuantity),
  });
};




  const handleDeleteProduct = () => {
  if (!selectedProduct) return;

  deleteMutation.mutate(selectedProduct.id);
};

  return (
    <div className="min-h-screen bg-slate-50">
     <Sidebar
  isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
/>

      <main className="min-h-screen ml-0 lg:ml-64">

        <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">

           <div className="flex items-center gap-3">
            <button
  type="button"
  onClick={() => setIsSidebarOpen(true)}
  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-black shadow-md lg:hidden"
  aria-label="Open sidebar"
>
  <Menu size={22} />
</button>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Products
            </h1>

            
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="h-8 w-px bg-slate-200" />

            {/* Profile */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                V
              </div>

              <div className="hidden sm:block">

                <p className="text-sm font-semibold text-slate-900">
                  Vendor
                </p>

                <p className="text-xs text-slate-500">
                  Store Owner
                </p>

              </div>

            </div>

          </div>

        </header>

        <section className="p-4 sm:p-6 lg:p-7">

          {/* PAGE TITLE */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Your Products
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add, edit and manage your store products.
              </p>

            </div>

            <Link to="/vendor/products/add"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 sm:w-fit"
            >
              <Plus size={18} />
              Add Product
            </Link>

          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

              <div className="relative w-full sm:max-w-md">

                <Search size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input type="text"placeholder="Search product or SKU..."
                  value={searchInput}
                  onChange={(e) =>
                    setSearchInput(e.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

              <div className="relative w-full sm:w-48">

                <Filter size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={stockFilter}
                  onChange={(e) => {
  const params = new URLSearchParams(searchParams);
  const value = e.target.value;

  if (value === "All") {
    params.delete("stockFilter");
  } else {
    params.set("stockFilter", value);
  }

  params.delete("page");

  setSearchParams(params, { replace: true });
} } className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-600 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100" >

                  <option value="All">
                    All Stock
                  </option>

                  <option value="In Stock">
                    In Stock
                  </option>

                  <option value="Low Stock">
                    Low Stock
                  </option>

                  <option value="Out of Stock">
                    Out of Stock
                  </option>

                </select>

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-238 text-left">

                <thead>

                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      SKU
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Stock Status
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {products.length > 0 ? (

                  products.map((product) => {

                      const stockStatus = getStockStatus(
                        product.stockQuantity,
                        product.minimumStock
                      );

                      return (
                        <tr
                          key={product.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                <Package size={20} />
                              </div>

                              <div className="min-w-0">

                                <p className="max-w-55 truncate text-sm font-semibold text-slate-900">
                                  {product.name}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  {product.category.name}
                                </p>

                              </div>

                            </div>

                          </td>
                          <td className="px-6 py-4">

                            <span className="text-sm font-medium text-slate-600">
                              {product.sku}
                            </span>

                          </td>

                          <td className="px-6 py-4">

                            <span className="text-sm font-semibold text-slate-800">
                              {formatPrice(product.price)}
                            </span>

                          </td>

                          <td className="px-6 py-4">

                            <span
                              className={`text-sm font-bold ${stockStatus.textClassName}`}
                            >
                              {product.stockQuantity}
                            </span>

                          </td>

                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stockStatus.className}`}
                            >
                              {stockStatus.label}
                            </span>

                          </td>

                          <td className="px-6 py-4">

                            <div className="mx-auto grid w-45 grid-cols-2 gap-2">

                              <Link to={`/vendor/products/${product.id}`}
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
                              >
                                <Eye size={14} />
                                View
                              </Link>

                              <Link
                                to={`/vendor/products/edit/${product.id}`}
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
                              >
                                <Edit3 size={14} />
                                Edit
                              </Link>


                              {/* STOCK */}

                              <button
                                type="button"
                                onClick={() =>
                                  openStockModal(product)
                                }
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600 cursor-pointer"
                              >
                                <Plus size={14} />
                                Stock
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openDeleteModal(product)
                                }
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    })

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="px-6 py-16 text-center"
                      >

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Package size={25} />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-slate-900">
                          No products found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or stock filter.
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

  <p className="text-xs text-slate-500 sm:text-sm">
  Showing{" "}
  <span className="font-semibold text-slate-700">
    {(pagination?.currentPage - 1) * pagination?.productsPerPage + 1}
  </span>
  –
  <span className="font-semibold text-slate-700">
    {Math.min(
      pagination?.currentPage * pagination?.productsPerPage,
      pagination?.totalProducts || 0
    )}
  </span>{" "}
  of{" "}
  <span className="font-semibold text-slate-700">
    {pagination?.totalProducts || 0}
  </span>{" "}
  products
</p>

  <div className="flex items-center gap-1">

    <button
      type="button"
      onClick={() => handlePageChange( currentPage - 1)}
      disabled={currentPage === 1}
      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-400 disabled:cursor-not-allowed sm:text-sm"
    >
      Previous
    </button>

    {Array.from(
      { length: pagination?.totalPages || 0 },
      (_, index) => index + 1
    ).map((page) => (
      <button
        key={page}
        type="button"
        onClick={() => handlePageChange(page)}
        className={
          currentPage === page
            ? "rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
            : "rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        }
      >
        {page}
      </button>
    ))}

    <button
      type="button" 
      onClick={() => handlePageChange( currentPage + 1)}
      disabled={currentPage === pagination?.totalPages}
      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400 "
    >
      Next
    </button>

  </div>

</div>
          </div>

        </section>

      </main>

      {showStockModal && selectedProduct && (

        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Add Stock
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Increase the available quantity.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowStockModal(false);
                  setSelectedProduct(null);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>

            </div>


            <form
              onSubmit={handleAddStock}
              className="space-y-5 p-5 sm:p-6"
            >

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm font-semibold text-slate-900">
                  {selectedProduct.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  SKU: {selectedProduct.sku}
                </p>

                <p className="mt-3 text-sm text-slate-600">

                  Current Stock:{" "}

                  <span className="font-bold text-slate-900">
                    {selectedProduct.stockQuantity}
                  </span>

                </p>

              </div>


              <div>

                <label
                  htmlFor="stockQuantity"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Quantity to Add
                </label>

                <input
                  id="stockQuantity"
                  type="number"
                  min="1"
                  value={stockQuantity}
                  onChange={(e) =>
                    setStockQuantity(e.target.value)
                  }
                  placeholder="Enter quantity"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />

              </div>


              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    setShowStockModal(false);
                    setSelectedProduct(null);
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                   disabled={restockMutation.isPending}
                  className="rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  {restockMutation.isPending ? "Adding..." : "Add Stock"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {showDeleteModal && selectedProduct && (

        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="p-5 sm:p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Trash2 size={21} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                Delete Product?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">

                Are you sure you want to delete{" "}

                <span className="font-semibold text-slate-700">
                  {selectedProduct.name}
                </span>

                ? This action cannot be undone.

              </p>


              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProduct(null);
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteProduct}
                  disabled={deleteMutation.isPending}
                  className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete Product"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Products;