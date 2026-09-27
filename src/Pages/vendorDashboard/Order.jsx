import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../Components/vendorDashboard/Sidebar";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  const {
  data: orders = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ["vendorOrders"],
  queryFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/vendor/orders",
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data.orders;
  },
  onError: (error) => {
    toast.error(error.message || "Failed to load orders");
  },
});

 
  
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
  order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
  order.customer.toLowerCase().includes(search.toLowerCase()) ||
  order.email.toLowerCase().includes(search.toLowerCase());

   const matchesStatus =
  statusFilter === "All" ||
  order.status === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === "PENDING") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
          <Clock size={13} />
          Pending
        </span>
      );
    }

    if (status === "APPROVED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
          <CheckCircle size={13} />
          Approved
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
        <XCircle size={13} />
        Rejected
      </span>
    );
  };

  if (isLoading) {
  return <div>Loading orders...</div>;
}

if (isError) {
  return <div>Failed to load orders.</div>;
}

  return (
    <div className="min-h-screen bg-slate-50">
   
     <Sidebar
  isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
/>

      <main className="min-h-screen ml-0 lg:ml-64">


        <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
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
              Orders
            </h1>

          </div>
        </header>

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
         

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Orders
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {orders.length}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Package size={21} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Pending
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {
                        orders.filter(
                          (order) => order.status === "PENDING"
                        ).length
                      }
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Clock size={21} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Approved
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {
                        orders.filter(
                          (order) => order.status === "APPROVED"
                        ).length
                      }
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <CheckCircle size={21} />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500">
        Rejected
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {
          orders.filter(
            (order) => order.status === "REJECTED"
          ).length
        }
      </p>
    </div>

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
      <XCircle size={21} />
    </div>
  </div>
</div>
            </div>

            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                <div className="relative w-full lg:max-w-md">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by order or customer..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="flex w-full items-center gap-2 lg:w-auto">
                  <div className="flex h-11 items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-500">
                    <Filter size={17} />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:w-48"
                  >
                    <option value="All">All Orders</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-225">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Order
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Products
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Total
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Date
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-5">
                          <p className="text-sm font-semibold text-slate-900">
                           {order.orderNumber}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm font-medium text-slate-800">
                            {order.customer}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {order.email}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <div className="max-w-55">
                            {order.products.map((product, index) => (
                              <div key={index}>
                                <p className="truncate text-sm text-slate-700">
                                  {product.name}
                                </p>

                                <p className="text-xs text-slate-400">
                                  Qty: {product.quantity}
                                </p>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm font-semibold text-slate-900">
                            Rs. {order.total.toLocaleString()}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm text-slate-600">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          {getStatusBadge(order.status)}
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                             to={`/vendor/orders/${order.id}`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                              title="View order"
                            >
                              <Eye size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <Package
                    size={40}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No orders found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filter.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4 md:hidden">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
               
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {order.orderNumber}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>

                    {getStatusBadge(order.status)}
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Customer
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {order.customer}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {order.email}
                    </p>
                  </div>
 
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Products
                    </p>

                    <div className="mt-2 space-y-2">
                      {order.products.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2"
                        >
                          <p className="min-w-0 truncate text-sm text-slate-700">
                            {product.name}
                          </p>

                          <span className="shrink-0 text-xs text-slate-400">
                            × {product.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-sm text-slate-500">
                      Total
                    </span>

                    <span className="text-base font-bold text-slate-900">
                      Rs. {order.total.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                     to={`/vendor/orders/${order.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      <Eye size={16} />
                      View
                    </Link>

              
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                  <Package
                    size={40}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No orders found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Orders;

