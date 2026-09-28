import { API_URL } from '../../config/api';
import { Search, Clock3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import Sidebar from "../../Components/superadmin/SidebarTemp";

const PendingApprovals = () => {

  const queryClient=useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

const { data: pendingVendors = [], isLoading, isError } = useQuery({
  queryKey: ["adminPendingApprovals"],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/admin/pending-approvals`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      email: vendor.email,
      store: vendor.store,
      date: new Date(vendor.registered).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      approval:
        vendor.approval.charAt(0) + vendor.approval.slice(1).toLowerCase(),
    }));
  },
});

const filteredVendors = pendingVendors.filter((vendor) =>
  `${vendor.name} ${vendor.email} ${vendor.store}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

const approveMutation=useMutation({
  mutationFn:async(vendorId)=>{
    const response=await fetch(
      `${API_URL}/api/admin/vendors/approve/${vendorId}`,
      {
        method:"PATCH",
        credentials:"include"
      }
    );
    const data=await response.json();
    if(!response.ok)
    {
      throw new Error(data.message)
    }
    return data;
  },
  onSuccess:(data)=>{
    toast.success(data.message);

    queryClient.invalidateQueries({
      queryKey:["adminPendingApprovals"],
    });

    queryClient.invalidateQueries({
      queryKey:["adminDashboard"],
    });
  },

  onError:(error)=>{
    toast.error(error.message);

  },

});

const rejectMutation=useMutation({
  mutationFn:async(vendorId)=>{

    const response=await fetch(
      `${API_URL}/api/admin/vendors/reject/${vendorId}`,
      {
        method:"PATCH",
        credentials:"include",
      }
    );

    const data=await response.json();

    if(!response.ok)
    {
      throw new Error(data.message);
    }

    return data;
  },

  onSuccess:(data)=>{
    toast.success(data.message);

  queryClient.invalidateQueries({
    queryKey:["adminPendingApprovals"],
  });
  
  queryClient.invalidateQueries({
    queryKey:["adminDashboard"],
  });
  },

  onError:(error)=>
  {
    toast.error(error.message);
  },
})


return ( 

<div className="min-h-screen bg-slate-50"> <Sidebar />

  <main className="min-h-screen lg:ml-64">
    <header className="flex min-h-20 items-center border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
          Pending Approvals
        </h1>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Review vendor registrations awaiting approval
        </p>
      </div>
    </header>

    <section className="p-4 sm:p-6 lg:p-7">
      <div className="mb-6 sm:mb-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Clock3 size={20} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Vendor Approvals
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              These vendors are waiting for your decision.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative w-full sm:max-w-md lg:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="Search pending vendors..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div>
            <h3 className="font-semibold text-slate-900">
              Pending Vendor Registrations
            </h3>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {pendingVendors.length} vendors are waiting for approval.
            </p>
          </div>

          <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            {pendingVendors.length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-215 text-left">
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
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.email}
                  className="transition hover:bg-slate-50"
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
                    <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      Pending
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-2">
                   <button onClick={()=>approveMutation.mutate(vendor.id)}
                   disabled={approveMutation.isPending || rejectMutation.isPending}
                        type="button"
                        className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100" >
                        Approve
                      </button>

                  <button onClick={()=>rejectMutation.mutate(vendor.id)}
                  disabled={approveMutation.isPending || rejectMutation.isPending}
                        type="button"
                        className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100">
                        Reject
                      </button>
                    </div>
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

export default PendingApprovals;
