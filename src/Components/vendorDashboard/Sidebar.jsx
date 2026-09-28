import { API_URL } from '../../config/api';
import {
  BoxIcon,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Boxes,
  Store,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/authContext.jsx";

const Sidebar = ({ isOpen, setIsOpen }) => {

  const navigate = useNavigate();
  const { updateAuthState } = useAuth();

  const handleLogout = async () => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
   updateAuthState(null);
    toast.success(data.message);
    navigate("/login");
  } else {
    toast.error(data.message);
  }
};

  const menuItems = [
    {
      name: "Dashboard",
      path: "/vendor/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/vendor/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/vendor/orders",
      icon: ShoppingCart,
    },
    {
      name: "My Store",
      path: "/vendor/store",
      icon: Store,
    },
  ];


  return (
    <>
      
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#061525] text-white transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }
        lg:translate-x-0`} >

        <div className="flex h-20 shrink-0 items-center gap-1 border-b border-white/10 px-6">
          <BoxIcon className="text-orange-300" size={28} />

          <h1 className="text-2xl font-bold tracking-wide text-orange-500">
            Zen<span className="text-white">Tro</span>
          </h1>

         
         
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:bg-orange-500/10 hover:text-orange-400"
                    }`
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <button type="button" onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition hover:bg-red-500/10 hover:text-red-400">
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

