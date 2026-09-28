import { API_URL } from '../../config/api';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
Store,
Search,
Filter,
MoreHorizontal,
} from "lucide-react";
import Sidebar from "../../Components/superadmin/SidebarTemp";

const Vendors = () => {
const [searchTerm, setSearchTerm] = useState("");
const [filterOpen, setFilterOpen] = useState(false);
const [filter, setFilter] = useState("All");

const { data: vendors = [], isLoading, isError } = useQuery({
  queryKey: ["adminVendors"],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/admin/vendors`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.map((vendor) => ({
      name: vendor.user.name,
      email: vendor.user.email,
      store: vendor.businessName,

      date: new Date(vendor.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),

      status:
        vendor.approvalStatus.charAt(0) + vendor.approvalStatus.slice(1).toLowerCase(),

    storeStatus:
     vendor.storeStatus.charAt(0) + vendor.storeStatus.slice(1).toLowerCase(),
    }));
  },
});
const filteredVendors = vendors.filter((vendor) => {
const search = searchTerm.toLowerCase();


const matchesSearch =
  vendor.name.toLowerCase().includes(search) ||
  vendor.email.toLowerCase().includes(search) ||
  vendor.store.toLowerCase().includes(search);

const matchesFilter =
  filter === "All" ||
  vendor.status === filter ||
  vendor.storeStatus === filter;

return matchesSearch && matchesFilter;
});

return ( 
<div className="min-h-screen bg-slate-50"> <Sidebar />

  <main className="min-h-screen lg:ml-64">
    <header className="flex min-h-20 items-center border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
          All Vendors
        </h1>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Manage and review all registered vendors on Zentro
        </p>
      </div>
    </header>

    <section className="p-4 sm:p-6 lg:p-7">
      <div className="mb-6 sm:mb-7">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Vendors
        </h2>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          View vendor registration, approval, and store status.
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="relative w-full sm:max-w-md lg:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition sm:w-auto ${
              filter !== "All"
                ? "border-orange-300 bg-orange-50 text-orange-600"
                : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600"
            }`}
          >
            <Filter size={16} />
            Filter
          </button>

          {filterOpen && (
            <div className="absolute right-0 z-20 mt-2 w-full min-w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg sm:w-48">
              {[
                "All",
                "Pending",
                "Approved",
                "Rejected",
                "Active",
                "Inactive",
              ].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFilter(option);
                    setFilterOpen(false);
                  }}
                  className={`block w-full px-4 py-2.5 text-left text-sm transition ${
                    filter === option
                      ? "bg-orange-50 font-semibold text-orange-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option === "Active"
                    ? "Active Store"
                    : option === "Inactive"
                    ? "Inactive Store"
                    : option === "All"
                    ? "All Vendors"
                    : option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading && (
    <div className="py-12 text-center">
      <p className="text-sm font-semibold text-slate-600">
        Loading vendors...
      </p>
    </div>
  )}

  {isError && (
    <div className="py-12 text-center">
      <p className="text-sm font-semibold text-red-600">
        Failed to load vendors.
      </p>
    </div>
  )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-245 text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Vendor
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Store
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Registered
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Approval
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Store Status
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.email}
                  className="transition hover:bg-slate-100"
                >
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
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

                  <td className="px-4 py-4 sm:px-6">
                    <span className="text-sm text-slate-700">
                      {vendor.store}
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <span className="text-sm text-slate-500">
                      {vendor.date}
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        vendor.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : vendor.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    {vendor.storeStatus === "Active" && (
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        Active
                      </span>
                    )}

                    {vendor.storeStatus === "Inactive" && (
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Inactive
                      </span>
                    )}

                  </td>

                  <td className="px-4 py-4 sm:px-6">
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

          {filteredVendors.length === 0 && (
            <div className="py-12 text-center">
              <Store
                size={32}
                className="mx-auto mb-3 text-slate-300"
              />

              <p className="text-sm font-semibold text-slate-700">
                No vendors found
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

export default Vendors;
