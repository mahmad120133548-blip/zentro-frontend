import {
  LayoutDashboard,
  Store,
  Clock3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { BoxIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, setIsOpen }) => {
 
  const navigate = useNavigate();

  const handleLogout = async () => {
  const response = await fetch("http://localhost:4000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    toast.success(data.message);
    navigate("/login");
  } else {
    toast.error(data.message);
  }
};
 
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Vendors",
      path: "/admin/vendors",
      icon: Store,
    },
    {
      name: "Pending Approvals",
      path: "/admin/pending-approvals",
      icon: Clock3,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <>
  
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#061525] text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-1">
            <BoxIcon className="text-orange-300" size={28} />

            <h1 className="text-2xl font-bold tracking-wide text-orange-500">
              Zen<span className="text-white">Tro</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:bg-orange-500/10 hover:text-orange-500"
                    }`
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      <button
  onClick={handleLogout}
  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-red-500/10 hover:text-red-400">
  <LogOut size={19} />
  <span>Logout</span>
</button>
      </aside>
    </>
  );
};

export default Sidebar;

