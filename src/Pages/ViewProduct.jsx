import { API_URL } from '../config/api';
import { Link,useParams,useLocation,useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useState, useContext,useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CartContext from "../Context/CartContext";
import Navbar from "../Components/Navbar";
import { useAuth } from "../Context/authContext";

function ViewProduct() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();

const [selectedImage, setSelectedImage] = useState(0);
const [showLoginModal, setShowLoginModal] = useState(false);
const { addToCart,isInCart } = useContext(CartContext);

const { data, isLoading, isError } = useQuery({
  queryKey: ["customerProduct", productId],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/customer/products/${productId}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to fetch product"
      );
    }

    return result;
  },
  enabled: !!productId,
});

const product = data?.product;
useEffect(() => {
  if (
    product &&
    user &&
    location.state?.autoAddToCart
  ) {
    addToCart(product);
    toast.success("Product added to cart");

    navigate(location.pathname, {
      replace: true,
      state: {},
    });
  }
}, [
  product,
  user,
  location.state,
  location.pathname,
  addToCart,
  navigate,
]);

useEffect(() => {
  if (isError) {
    toast.error("Failed to fetch product");
  }
}, [isError]);

useEffect(()=>{
  setSelectedImage(0);
},[productId]);

const nextImage = () => {
  setSelectedImage((current) =>
    current === product.images.length - 1 ? 0 : current + 1
  );
};

const previousImage = () => {
  setSelectedImage((current) =>
    current === 0 ? product.images.length - 1 : current - 1
  );
};

const handleAddToCart = () => {
  if (!user) {
    setShowLoginModal(true);
    return;
  }

  if (isInCart(product.id)) {
    return;
  }

  addToCart(product);
  toast.success("Product added to cart");
};

if (isLoading) {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-[#F4F7FA]">
        <p className="text-sm text-slate-500">
          Loading product...
        </p>
      </div>
    </>
  );
}

if (!product) {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-[#F4F7FA]">
        <p className="text-sm text-slate-500">
          Product not found.
        </p>
      </div>
    </>
  );
}


return (
<> <Navbar />


  <div className="min-h-screen bg-[#F4F7FA] px-4 py-6 sm:px-6 sm:py-8">
    <div className="mx-auto max-w-6xl">
    

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-[#F4F7FA]">
  <img
    src={`${API_URL}${product.images[selectedImage]?.imagePath}`}
    alt={product.name}
    className="h-130.75 w-full object-contain"
  />

  {product.images.length > 1 && (
    <>
      <button
        type="button"
        onClick={previousImage}
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-slate-700 shadow-md transition hover:bg-white hover:text-orange-500 active:bg-white active:text-orange-500"
      >
        &lt;
      </button>

      <button
        type="button"
        onClick={nextImage}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-slate-700 shadow-md transition hover:bg-white hover:text-orange-500 active:bg-white active:text-orange-500">
        &gt;
      </button>
    </>
  )}
</div>

            <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-slate-200 hover:border-orange-400"
                  }`}
                >
                  <img
                    src={`${API_URL}${image.imagePath}`}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1F33] sm:text-3xl md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              SKU: {product.sku}
            </p>

            <div className="mt-4 sm:mt-5">
              {product.stockQuantity > 0 ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              )}
            </div>

            <div className="mt-6 sm:mt-8">
              <h2 className="text-base font-bold text-[#0B1F33] sm:text-lg">
                Description
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">
                {product.description}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-200 pt-5 sm:mt-8 sm:grid-cols-2 sm:gap-5 sm:pt-6">
              <div>
                <p className="text-xs text-slate-500">Price</p>

                <p className="mt-1 text-xl font-bold text-[#0B1F33] sm:text-2xl">
                  Rs. {product.price.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Available</p>

                <p className="mt-1 text-base font-semibold text-[#0B1F33] sm:text-lg">
                  {product.stockQuantity} units
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={product.stockQuantity === 0}
              onClick={handleAddToCart}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300 sm:mt-7"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-slate-500">Sold by</p>

                <p className="mt-1 text-sm font-semibold text-[#0B1F33]">
                 {product.vendor.businessName}
                </p>
              </div>

              <Link
                to={`/vendors/${product.vendor.id}`}
                className="text-sm font-semibold text-orange-500 transition hover:text-orange-600 hover:underline"
              >
                Visit Store →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {showLoginModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">

      <button
        type="button"
        onClick={() => setShowLoginModal(false)}
        className="absolute right-4 top-4 text-xl text-slate-400 hover:text-slate-700"
      >
        ×
      </button>

      <h2 className="text-xl font-bold text-[#0B1F33]">
        Login Required
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Please login to your account before adding products to your cart
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/login"
          state={{ from: `/product/${productId}` }}
          onClick={() => setShowLoginModal(false)}
          className="flex h-11 flex-1 items-center justify-center rounded-lg bg-orange-500 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Login
        </Link>

        <Link
          to="/register/customer"
          state={{ from: `/product/${productId}` }}
          onClick={() => setShowLoginModal(false)}
          className="flex h-11 flex-1 items-center justify-center rounded-lg border border-slate-300 text-sm font-semibold text-[#0B1F33] transition hover:bg-slate-50"
        >
          Create Account
        </Link>
      </div>
    </div>
  </div>
)}
</>


);
}

export default ViewProduct;
