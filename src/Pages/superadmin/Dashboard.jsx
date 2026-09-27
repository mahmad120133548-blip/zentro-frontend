import { Link, useNavigate } from "react-router-dom";
import {
  Store,
  Clock3,
  CheckCircle2,
  Power,
  Bell,
  XCircle,
  MoreHorizontal,
  ArrowUpRight,
  Menu
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
 
import Sidebar from "../../Components/superadmin/SidebarTemp";

const Dashboard = () => {
  const navigate = useNavigate();
   const queryClient = useQueryClient();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const { data: dashboardData, isLoading, isError } = useQuery({
  queryKey: ["adminDashboard"],
  queryFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/admin/dashboard",
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
});


const {
  data: notificationData, isLoading: notificationsLoading,isError: notificationsError} = useQuery({
  queryKey: ["adminNotifications"],
  queryFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/admin/notifications",
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
});

const notifications = notificationData?.notifications ?? [];

const sortedNotifications = [...notifications].sort((a, b) => {
  if (a.isRead !== b.isRead) {
    return Number(a.isRead) - Number(b.isRead);
  }

  return new Date(b.createdAt) - new Date(a.createdAt);
});


  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(
  (notification) => !notification.isRead).length;

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
  };

 const handleNotificationClick = async (notification) => {
  try {
    if (!notification.isRead) {
      const response = await fetch(
        `http://localhost:4000/api/admin/notifications/${notification.id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // it will refresh the notification if there are new notifications
      await queryClient.invalidateQueries({
        queryKey: ["adminNotifications"],
      });
    }

    setShowNotifications(false);

    if (notification.type === "VENDOR_REGISTRATION") {
      navigate("/admin/pending-approvals");
    }
  } catch (error) {
    console.error("Mark notification as read error:", error);
  }
};

const{data:vendorData,isLoading:vendorsLoading,isError:vendorsError}=useQuery({
  queryKey:["adminRecentVendors"],
  queryFn:async()=>{
    const response=await fetch(
      "http://localhost:4000/api/admin/recent-vendors",
      {
        credentials:"include",
      }
    );

    const data=await response.json();

    if(!response.ok)
    {
      throw new Error(data.message);
    }
    return data
  },
});

  const stats = [
  {
    title: "Total Vendors",
    value: dashboardData?.totalVendors ?? 0,
    icon: Store,
    description: "Registered on Zentro",
  },
  {
    title: "Approved Vendors",
    value: dashboardData?.approvedVendors ?? 0,
    icon: CheckCircle2,
    description: "Approved vendors",
  },
  {
  title: "Rejected Vendors",
  value: dashboardData?.rejectedVendors ?? 0,
  icon: XCircle,
  description: "Rejected vendors",
},
{
    title: "Pending Approvals",
    value: dashboardData?.pendingApprovals ?? 0,
    icon: Clock3,
    description: "Require your review",
  },
  {
    title: "Active Stores",
    value: dashboardData?.activeStores ?? 0,
    icon: Power,
    description: "Active on Zentro",
  },
];
  const vendors = vendorData ?? [];
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
      <h1 className="text-xl font-bold text-slate-900">
        Dashboard
      </h1>

      
    </div>
  </div>

          <div className="flex items-center gap-3 sm:gap-6">

            <div className="relative">
              <button type="button" onClick={handleBellClick}
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
                  </div>

                  <div className="max-h-80 overflow-y-auto">

                    {notifications.length > 0 ? (
                      sortedNotifications.map((notification) => (
                        <button
                          key={notification.id}  type="button"
                          onClick={() =>
                            handleNotificationClick(notification)
                          }
                          className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${
                            !notification.isRead
                              ? "bg-orange-50/40"
                              : "bg-white"
                          }`}
                        >

                          <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                             !notification.isRead ? "bg-orange-500" : "bg-slate-300"
                            }`}/>

                          <div className="min-w-0 flex-1">

                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-xs ${
                                  !notification.isRead
                                    ? "font-semibold text-slate-900"
                                    : "font-medium text-slate-700"
                                }`}
                              >
                                {notification.title}
                              </p>
                            </div>

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
                SA
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  Super Admin
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>

            </div>
          </div>
        </header>


        <section className="p-4 sm:p-6 lg:p-7">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back, Admin
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
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

                    <ArrowUpRight
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

          <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

              <div>
                <h3 className="font-semibold text-slate-900">
                  Vendor Overview
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Recently registered vendors and their current status.
                </p>
              </div>

              <Link
                to="/admin/vendors"
                className="flex w-fit items-center gap-1.5 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
              >
                View All Vendors
              </Link>

            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-213 text-left">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Vendor
                    </th>

                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Store
                    </th>

                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Registered
                    </th>

                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Approval
                    </th>

                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Store Status
                    </th>

                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {vendors.map((vendor) => (
                    <tr
                      key={vendor.email}
                      className="transition hover:bg-slate-100">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                            {vendor.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {vendor.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {vendor.email}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">
                          {vendor.store}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500">
                          {new Date(vendor.registered).toLocaleDateString("en-US",{
                            month:"short",
                            day:"numeric",
                            year:"numeric"
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            vendor.approvalStatus === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {vendor.approvalStatus.charAt(0) + vendor.approvalStatus.slice(1).toLowerCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4">

                        {vendor.storeStatus === "ACTIVE" && (
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            Active
                          </span>
                        )}

                        {vendor.storeStatus === "INACTIVE" && (
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            Inactive
                          </span>
                        )}

                        {vendor.storeStatus === "—" && (
                          <span className="text-sm text-slate-400">
                            —
                          </span>
                        )}

                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;

