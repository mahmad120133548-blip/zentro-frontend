import { useState } from "react";
import {User,Shield,Settings as SettingsIcon,Save,} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Sidebar from "../../Components/superadmin/SidebarTemp";

const Settings = () => {
const [activeSection, setActiveSection] = useState("Profile");

const menuItems = [
{
name: "Profile",
icon: User,
},
{
name: "Security",
icon: Shield,
},
{
name: "Platform",
icon: SettingsIcon,
},
];
const {data: profileData,isLoading,isError} = useQuery({
  queryKey: ["adminProfile"],
  queryFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/admin/profile",
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


return ( <div className="min-h-screen bg-slate-50"> <Sidebar />

  <main className="min-h-screen lg:ml-64">
    <header className="flex min-h-20 items-center border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
          Settings
        </h1>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Manage your account and platform preferences
        </p>
      </div>
    </header>

    <section className="p-4 sm:p-6 lg:p-7">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr] lg:gap-6">
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <div className="flex gap-1 overflow-x-auto lg:block">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveSection(item.name)}
                  className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition sm:justify-start ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={17} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
         {activeSection === "Profile" && ( <ProfileSettings profileData={profileData} />)}
          {activeSection === "Security" && <SecuritySettings />}

          {activeSection === "Platform" && <PlatformSettings />}
        </div>
      </div>
    </section>
  </main>
</div>


);
};

const ProfileSettings = ({profileData}) => {
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");

   useEffect(() => {
    if (profileData?.admin) {
      setName(profileData.admin.name);
      setEmail(profileData.admin.email);
    }
  }, [profileData]);

  const updateMutation = useMutation({
  mutationFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/admin/profile",
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  onSuccess: (data) => {
    toast.success(data.message);
  },

  onError: (error) => {
    toast.error(error.message);
  },
});
return ( 
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="border-b border-slate-200 px-4 py-5 sm:px-6"> <h2 className="font-semibold text-slate-900">
Profile </h2>


    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
      Manage your administrator account information.
    </p>
  </div>

  <div className="p-4 sm:p-6">
    <div className="mb-7 flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-base font-bold text-orange-600 sm:h-16 sm:w-16 sm:text-lg">
        {profileData?.admin?.name?.split(" ")
  .map((word) => word.charAt(0)) .join("") .toUpperCase()}
      </div>

      <div>
        <p className="font-semibold text-slate-900">
         {profileData?.admin?.name}
        </p>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Administrator
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>

        <input
          type="text"
          value={name}
           onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
           Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Role
        </label>

        <input
          type="text"
          value="Super Admin"
          disabled
          className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-400"
        />
      </div>
    </div>

    <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
      <button
        type="button"
        onClick={()=>updateMutation.mutate()}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
      >
        <Save size={16} />
        Save Changes
      </button>
    </div>
  </div>
</div>


);
};

const SecuritySettings = () => {
   const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordMutation = useMutation({
  mutationFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/admin/change-password",
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  onSuccess: (data) => {
    toast.success(data.message);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

return (
   <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"> <h2 className="font-semibold text-slate-900">
Security </h2>


  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
    Manage your administrator account security.
  </p>

  <div className="mt-7">
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Current Password
        </label>

        <input
          type="password"
          value={currentPassword}
          onChange={(e)=>setCurrentPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          New Password
        </label>

        <input
          type="password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Confirm New Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white"
        />
      </div>
    </div>

    <div className="mt-6 border-t border-slate-100 pt-5">
      <button
        type="button"
        onClick={()=>updatePasswordMutation.mutate()}
        className="w-full rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
      >
        Update Password
      </button>
    </div>
  </div>
</div>


);
};

const PlatformSettings = () => {
return (
   <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"> <h2 className="font-semibold text-slate-900">
Platform Settings </h2>

  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
    Manage your Zentro platform configuration.
  </p>

  <div className="mt-7 space-y-5">
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Platform Name
      </label>

      <input
        type="text"
        defaultValue="Zentro"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-400 focus:bg-white"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Platform Email
      </label>

      <input
        type="email"
        defaultValue="support@zentro.com"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-400 focus:bg-white"
      />
    </div>
  </div>

  <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
    >
      <Save size={16} />
      Save Changes
    </button>
  </div>
</div>


);
};

export default Settings;
