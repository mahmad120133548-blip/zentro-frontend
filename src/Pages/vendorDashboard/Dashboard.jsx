import { API_URL } from '../../config/api';
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Clock,
  Banknote,
  AlertTriangle,
  Bell,
  ArrowRight,
  CheckCircle,
  Menu
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/authContext";
import {useQuery,useQueryClient} from "@tanstack/react-query";
import Sidebar from "../../Components/vendorDashboard/Sidebar";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  

  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const{data:statsData,isLoading}=useQuery({
    queryKey: ["vendorDashboardStats"],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/vendor/dashboard/stats`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to fetch dashboard statistics");
    }

    return response.json();
  },
  })

  const { data: recentOrdersData } = useQuery({
  queryKey: ["vendorRecentOrders"],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/vendor/orders`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch recent orders");
    }

    return data.orders;
  },
});
const recentOrders = recentOrdersData?.slice(0, 4) || [];

const { data: storeStatusData } = useQuery({
  queryKey: ["vendorStoreStatus"],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/vendor/store-status`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch store status");
    }

    return data;
  },
});

const storeStatus = storeStatusData?.storeStatus;

const { data: notificationsData } = useQuery({
  queryKey: ["vendorNotifications"],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/vendor/notifications`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch notifications");
    }

    return data;
  },
});

const notifications = notificationsData?.notifications || [];
const unreadCount = notificationsData?.unreadCount || 0;

const queryClient = useQueryClient();

const handleNotificationClick = async (notification) => {
  try {
    if (!notification.isRead) {
      const response = await fetch(
        `${API_URL}/api/vendor/notifications/${notification.id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark notification as read");
      }

      queryClient.invalidateQueries({
        queryKey: ["vendorNotifications"],
      });
    }

    setShowNotifications(false);

    if (notification.type === "NEW_ORDER") {
      navigate("/vendor/orders");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const stats = [
    {
      title: "Total Products",
      value: statsData?.totalProducts??0,
      icon: Package,
      description: "Products in your store",
    },
    {
      title: "Total Orders",
      value: statsData?.totalOrders??0,
      icon: ShoppingCart,
      description: "Orders received",
    },
    {
      title: "Pending Orders",
      value: statsData?.pendingOrders ?? 0,
      icon: Clock,
      description: "Require your approval",
    },
    {
      title: "Total Sales",
      value: `Rs. ${statsData?.totalSales ?? 0}`,
      icon: Banknote,
      description: "From approved orders",
    },
  ];

  

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
  isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
/>

      <main className="ml-0 min-h-screen lg:ml-64">

        <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">

  <div className="flex items-center gap-3">

    <button
      type="button"
      onClick={() => setIsSidebarOpen(true)}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg  text-black shadow-md lg:hidden"
      aria-label="Open sidebar"
    >
      <Menu size={22} />
    </button>

    <div>
      <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
        Dashboard
      </h1>

      </div>

            
          </div>

          <div className="flex items-center gap-3 sm:gap-6">

            <div className="relative">

              <button type="button"onClick={() =>
                  setShowNotifications((prev) => !prev)
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-orange-500"
                aria-label="Notifications"
              >
                <Bell size={20} />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="fixed right-4 top-20 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:absolute sm:right-0 sm:top-12 sm:w-96">
                  <div className="border-b border-slate-200 px-4 py-3">

                    <h2 className="text-sm font-semibold text-slate-900">
                      Notifications
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      You have {unreadCount} unread notifications
                    </p>

                  </div>

                  <div className="max-h-80 overflow-y-auto">

                    {notifications.length > 0 ? (
                      notifications.map((notification) => (

                        <button
                          key={notification.id}
                          type="button"onClick={() =>
                            handleNotificationClick(notification)
                          }
                          className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${
                            notification.unread
                              ? "bg-orange-50/40"
                              : "bg-white"
                          }`}
                        >

                          <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                             !notification.isRead
                                ? "bg-orange-500"
                                : "bg-slate-300"
                            }`}
                          />

                          <div className="min-w-0 flex-1">

                            <p
                              className={`text-xs ${
                                !notification.isRead
                                  ? "font-semibold text-slate-900"
                                  : "font-medium text-slate-700"
                              }`}
                            >
                              {notification.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {notification.message}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>

                          </div>

                        </button>

                      ))
                    ) : (

                      <div className="px-4 py-8 text-center">

                        <p className="text-sm text-slate-500">
                          No notifications
                        </p>

                      </div>

                    )}

                  </div>

                </div>
              )}

            </div>

            <div className="h-8 w-px bg-slate-200" />

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

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back, {user?.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your store today
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {

              const Icon = stat.icon;

              return (

                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">

                      <Icon size={19} />

                    </div>

                    <ArrowRight
                      size={17}
                      className="text-slate-300"
                    />

                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.description}
                  </p>

                </div>

              );

            })}

          </div>


          <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">


            <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

              <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                <div>

                  <h3 className="font-semibold text-slate-900">
                    Recent Orders
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Latest orders received by your store
                  </p>

                </div>

                <Link to="/vendor/orders"
                  className="flex w-fit items-center gap-1.5 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                >
                  View All Orders
                  <ArrowRight size={16} />
                </Link>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-163 text-left">

                  <thead>

                    <tr className="border-b border-slate-100 bg-slate-50">

                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Order
                      </th>

                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Customer
                      </th>

                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Product
                      </th>

                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Amount
                      </th>

                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {recentOrders.map((order) => (

                      <tr
                        key={order.orderNumber}
                        className="transition hover:bg-slate-50"
                      >

                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                          {order.orderNumber}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          {order.customer}
                        </td>

                        <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
  <span className="line-clamp-2">
    {order.products.map((product) => product.name).join(", ")}
  </span>
</td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                          Rs. {order.total.toLocaleString()}
                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : order.status === "PENDING"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h3 className="font-semibold text-slate-900">
                    Store Status
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Current store visibility
                  </p>

                </div>

                <div
  className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 ${
    storeStatus === "ACTIVE"
      ? "bg-green-50"
      : "bg-slate-100"
  }`}
>
  <span
    className={`h-2.5 w-2.5 rounded-full ${
      storeStatus === "ACTIVE"
        ? "bg-green-500"
        : "bg-slate-400"
    }`}
  />

  <span
    className={`text-xs font-semibold ${
      storeStatus === "ACTIVE"
        ? "text-green-600"
        : "text-slate-500"
    }`}
  >
    {storeStatus === "ACTIVE" ? "Active" : "Inactive"}
  </span>
</div>

              </div>


              <div
  className={`mt-5 rounded-xl p-4 sm:p-5 ${
    storeStatus === "ACTIVE"
      ? "bg-green-50"
      : "bg-slate-50"
  }`}
>
  <div className="flex items-center gap-3">

    {storeStatus === "ACTIVE" ? (
      <CheckCircle
        size={21}
        className="shrink-0 text-green-500"
      />
    ) : (
      <AlertTriangle
        size={21}
        className="shrink-0 text-slate-500"
      />
    )}

    <p
      className={`font-semibold ${
        storeStatus === "ACTIVE"
          ? "text-green-700"
          : "text-slate-700"
      }`}
    >
      {storeStatus === "ACTIVE"
        ? "Store is Active"
        : "Store is Inactive"}
    </p>

  </div>

  <p
    className={`mt-3 text-sm leading-6 ${
      storeStatus === "ACTIVE"
        ? "text-green-700/80"
        : "text-slate-500"
    }`}
  >
    {storeStatus === "ACTIVE"
      ? "Customers can currently see your store and products and can place orders."
      : "Customers cannot see your store or products while it is inactive."}
  </p>

</div>

              <Link
                to="/vendor/store"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Manage Store
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>
        </section>

      </main>

    </div>
  );
};

export default VendorDashboard;

