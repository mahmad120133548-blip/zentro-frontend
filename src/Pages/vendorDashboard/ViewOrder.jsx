import { API_URL } from '../../config/api';
import {
  ArrowLeft,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Hash,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Sidebar from "../../Components/vendorDashboard/Sidebar";

const ViewOrder = () => {
  const { orderId } = useParams();

 const queryClient = useQueryClient();

const { data: order, isLoading,isError} = useQuery({
  queryKey: ["vendorOrder", orderId],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/vendor/orders/${orderId}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch order");
    }

    return data.order;
  },
});

const approveMutation = useMutation({
  mutationFn: async () => {
    const response = await fetch(
      `${API_URL}/api/vendor/orders/${orderId}/approve`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to approve order");
    }

    return data;
  },

  onSuccess: (data) => {
    toast.success(data.message || "Order approved successfully");

    queryClient.invalidateQueries({
      queryKey: ["vendorOrder", orderId],
    });

    queryClient.invalidateQueries({
      queryKey: ["vendorOrders"],
    });
  },

  onError: (error) => {
    toast.error(error.message || "Failed to approve order");
  },
});

const handleApprove = () => {
  approveMutation.mutate();
};

const rejectMutation = useMutation({
  mutationFn: async () => {
    const response = await fetch(
      `${API_URL}/api/vendor/orders/${orderId}/reject`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reject order");
    }

    return data;
  },

  onSuccess: (data) => {
    toast.success(data.message || "Order rejected successfully");

    queryClient.invalidateQueries({
      queryKey: ["vendorOrder", orderId],
    });

    queryClient.invalidateQueries({
      queryKey: ["vendorOrders"],
    });
  },

  onError: (error) => {
    toast.error(error.message || "Failed to reject order");
  },
});

const handleReject = () => {
  rejectMutation.mutate();
};


const totalItems = order?.products?.reduce(
  (total, item) => total + item.quantity,
  0
) || 0;


  
  const getStatusBadge = () => {
    if (order.status === "PENDING") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
          <Clock size={14} />
          Pending
        </span>
      );
    }

    if (order.status === "APPROVED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
          <CheckCircle size={14} />
          Approved
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
        <XCircle size={14} />
        Rejected
      </span>
    );
  };

  if (isLoading) {
  return <div>Loading order...</div>;
}

if (isError || !order) {
  return <div>Failed to load order.</div>;
}



  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <main className="ml-0 min-h-screen lg:ml-64">
        <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Order Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage order information.
            </p>
          </div>
        </header>

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">

            <Link
              to="/vendor/orders"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Back to Orders
            </Link>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <Package size={21} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-lg font-semibold text-slate-900">
                          Order #{order.orderNumber}
                        </h2>

                        {getStatusBadge()}

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Customer order information
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={16} />
                    <span>{new Date(order.date).toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
})}</span>
                  </div>

                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 border-b border-slate-200 p-5 sm:grid-cols-2 sm:p-7">

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <div className="mb-4 flex items-center gap-2">
                    <User size={17} className="text-orange-500" />

                    <h3 className="text-sm font-semibold text-slate-800">
                      Customer Information
                    </h3>
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    {order.customer.name}
                  </p>

                  <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                    <Mail
                      size={14}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="break-all">
                      {order.customer.email}
                    </span>
                  </div>

                  <div className="mt-2 flex items-start gap-2 text-xs text-slate-500">
                    <Phone
                      size={14}
                      className="mt-0.5 shrink-0"
                    />

                    <span>
                      {order.customer.phone}
                    </span>
                  </div>

                  <div className="mt-2 flex items-start gap-2 text-xs text-slate-500">
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0"
                    />

                    <span>
                     {order.shipping.address}, {order.shipping.city}
                    </span>
                  </div>

                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <div className="mb-3 flex items-center gap-2">
                    <Hash size={17} className="text-orange-500" />

                    <h3 className="text-sm font-semibold text-slate-800">
                      Order Summary
                    </h3>
                  </div>

                  <div className="space-y-2">

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Order Number
                      </span>

                      <span className="font-medium text-slate-800">
                        #{order.orderNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Total Items
                      </span>

                      <span className="font-medium text-slate-800">
                        {totalItems}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Status
                      </span>

                      {getStatusBadge()}
                    </div>

                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">

                <div className="mb-5">
                  <h3 className="text-base font-semibold text-slate-900">
                    Order Items
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Products included in this vendor's order portion
                  </p>
                </div>

                <div className="hidden overflow-hidden rounded-xl border border-slate-200 md:block">

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-175">

                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">

                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Product
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            SKU
                          </th>

                          <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Quantity
                          </th>

                          <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Unit Price
                          </th>

                          <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Subtotal
                          </th>

                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">

                        {order.products.map((item) => (

                          <tr
                            key={item.id}
                            className="transition hover:bg-slate-50"
                          >

                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                                  <Package size={18} />
                                </div>

                                <span className="text-sm font-medium text-slate-800">
                                  {item.name}
                                </span>

                              </div>
                            </td>

                            <td className="px-4 py-4">
                              <span className="text-sm text-slate-500">
                                {item.sku}
                              </span>
                            </td>

                            <td className="px-4 py-4 text-center">
                              <span className="text-sm font-medium text-slate-700">
                                {item.quantity}
                              </span>
                            </td>

                            <td className="px-4 py-4 text-right">
                              <span className="text-sm text-slate-600">
                                Rs. {item.price.toLocaleString()}
                              </span>
                            </td>

                            <td className="px-4 py-4 text-right">
                              <span className="text-sm font-semibold text-slate-900">
                                Rs.{" "}
                                {(
                                  item.quantity * item.price
                                ).toLocaleString()}
                              </span>
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>
                </div>

                <div className="space-y-3 md:hidden">

                  {order.products.map((item) => (

                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                          <Package size={18} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-semibold text-slate-800">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            SKU: {item.sku}
                          </p>

                        </div>

                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-200 pt-3">

                        <div>
                          <p className="text-[11px] text-slate-400">
                            Quantity
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {item.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-slate-400">
                            Unit Price
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                           Rs. {item.price.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-slate-400">
                            Subtotal
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            Rs.{" "}
                            {(
                              item.quantity * item.price
                            ).toLocaleString()}
                          </p>
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="mt-5 flex justify-end">

                  <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 sm:w-80">

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-medium text-slate-500">
                        Order Total
                      </span>

                      <span className="text-lg font-bold text-slate-900">
                        Rs. {order.total.toLocaleString()}
                      </span>

                    </div>

                  </div>

                </div>

                {order.status === "PENDING" && (

                  <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

                    <button
  type="button"
  onClick={handleReject}
  disabled={rejectMutation.isPending || approveMutation.isPending}
  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
>
  <X size={17} />
  {rejectMutation.isPending ? "Rejecting..." : "Reject Order"}
</button>

<button
  type="button"
  onClick={handleApprove}
  disabled={approveMutation.isPending || rejectMutation.isPending}
  className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
>
  <Check size={17} />
  {approveMutation.isPending ? "Approving..." : "Approve Order"}
</button>

                  </div>

                )}

                {order.status !== "PENDING" && (

                  <div className="mt-7 border-t border-slate-200 pt-6">

                    <div
                      className={`flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center ${
                        order.status === "APPROVED"
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >

                      {order.status === "APPROVED" ? (
                        <CheckCircle
                          size={20}
                          className="shrink-0 text-green-600"
                        />
                      ) : (
                        <XCircle
                          size={20}
                          className="shrink-0 text-red-500"
                        />
                      )}

                      <div>

                        <p
                          className={`text-sm font-semibold ${
                            order.status === "APPROVED"
                              ? "text-green-700"
                              : "text-red-600"
                          }`}
                        >
                          Order {order.status.toLowerCase()}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          This order has already been processed.
                        </p>

                      </div>

                    </div>

                  </div>

                )}

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ViewOrder;
