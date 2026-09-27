import { useState,useEffect } from "react";
import {
  ArrowLeft,
  Store,
  Save,
  Power,
  CheckCircle,
  AlertCircle,
  Menu
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Sidebar from "../../Components/vendorDashboard/Sidebar";

const MyStore = () => {


 const [storeName, setStoreName] = useState("");
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const queryClient = useQueryClient();

const { data: storeStatusData, isLoading: isStoreStatusLoading } = useQuery({
  queryKey: ["vendorStoreStatus"],
  queryFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/vendor/store-status",
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

const updateStoreStatusMutation = useMutation({
  mutationFn: async (storeStatus) => {
    const response = await fetch(
      "http://localhost:4000/api/vendor/store-status",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          storeStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update store status");
    }

    return data;
  },

  onSuccess: (data) => {
    queryClient.setQueryData(["vendorStoreStatus"], data);
    toast.success("Store status updated successfully");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

const { data: storeInformationData, isLoading: isStoreInformationLoading } =
  useQuery({
    queryKey: ["vendorStoreInformation"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:4000/api/vendor/store-information",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch store information"
        );
      }

      return data;
    },
  });

  const updateStoreInformationMutation = useMutation({
  mutationFn: async (businessName) => {
    const response = await fetch(
      "http://localhost:4000/api/vendor/store-information",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          businessName,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update store information"
      );
    }

    return data;
  },

  onSuccess: (data) => {
    queryClient.setQueryData(["vendorStoreInformation"], data);
    setStoreName(data.businessName);
    toast.success("Store name updated successfully");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

  useEffect(() => {
  if (storeInformationData?.businessName) {
    setStoreName(storeInformationData.businessName);
  }
}, [storeInformationData]);


const handleStatusToggle = () => {
  const newStatus =
    storeStatusData?.storeStatus === "ACTIVE"
      ? "INACTIVE"
      : "ACTIVE";

  updateStoreStatusMutation.mutate(newStatus);
};

const handleSave = (e) => {
  e.preventDefault();

  updateStoreInformationMutation.mutate(storeName);
};

  const storeStatus =
  storeStatusData?.storeStatus === "ACTIVE"
    ? "Active"
    : storeStatusData?.storeStatus === "INACTIVE"
    ? "Inactive"
    : "";

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
              My Store
            </h1>

          </div>
        </header>

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">
        
            <Link
              to="/vendor/dashboard"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
           
              <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        storeStatus === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Power size={21} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Store Status
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Control whether your store is available to customers
                      </p>
                    </div>
                  </div>

                  <div
                    className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      storeStatus === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        storeStatus === "Active"
                          ? "bg-green-500"
                          : "bg-slate-400"
                      }`}
                    />

                    {storeStatus}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div
                  className={`rounded-xl border p-4 ${
                    storeStatus === "Active"
                      ? "border-green-100 bg-green-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 
                    <div className="flex items-start gap-3">
                      {storeStatus === "Active" ? (
                        <CheckCircle
                          size={20}
                          className="mt-0.5 shrink-0 text-green-600"
                        />
                      ) : (
                        <AlertCircle
                          size={20}
                          className="mt-0.5 shrink-0 text-slate-500"
                        />
                      )}

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            storeStatus === "Active"
                              ? "text-green-700"
                              : "text-slate-700"
                          }`}
                        >
                          Your store is currently{" "}
                          {storeStatus.toLowerCase()}.
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {storeStatus === "Active"
                            ? "Customers can access your store and place orders"
                            : "Customers cannot place orders from your store while it is inactive"}
                        </p>
                      </div>
                    </div>

                    <button type="button"onClick={handleStatusToggle}
                     disabled={isStoreStatusLoading || updateStoreStatusMutation.isPending}
                      aria-label={`Set store ${
                        storeStatus === "Active" ? "inactive" : "active"
                      }`}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                        storeStatus === "Active"
                          ? "bg-green-500"
                          : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                          storeStatus === "Active" ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSave}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              
                <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <Store size={21} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Store Information
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Update the information customers see about your store
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="space-y-6">
                  
                    <div>
                      <label
                        htmlFor="storeName"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Store Name
                      </label>

                      <input
                        id="storeName"
                        name="storeName"
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Enter store name"
                        required
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                  </div>

                  <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                    <Link
                      to="/vendor/dashboard"
                      className="flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                       disabled={updateStoreInformationMutation.isPending}
                      className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                    >
                      <Save size={17} />
{updateStoreInformationMutation.isPending
  ? "Saving..."
  : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyStore;

