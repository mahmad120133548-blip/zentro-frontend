import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/authContext.jsx";

const RouteAccess = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until /api/auth/me finishes
  if (loading) {
    return null;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isVendorRoute = location.pathname.startsWith("/vendor/");

  if (isAdminRoute && (!user || user.role !== "SUPER_ADMIN")) {
    return <Navigate to="/login" replace />;
  }

 
 if (
  isVendorRoute &&
  (
    !user ||
    user.role !== "VENDOR" ||
    user.vendor?.approvalStatus !== "APPROVED"
  )
) {
  return <Navigate to="/login" replace />;
}

  return children;
};

export default RouteAccess;