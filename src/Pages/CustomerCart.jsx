import { API_URL } from '../config/api';
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2,X,ShoppingCart } from "lucide-react";
import { useState,useEffect,useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import CartContext from "../Context/CartContext.jsx";
import { useAuth } from "../Context/authContext.jsx";
import Navbar from "../Components/Navbar";


function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { user, loading: authLoading } = useAuth();

const [quantities, setQuantities] = useState({});


useEffect(() => {
  const initialQuantities = {};

  cartItems.forEach((item) => {
    initialQuantities[item.id] = quantities[item.id] || 1;
  });

  setQuantities(initialQuantities);
}, [cartItems]);

const validateCartMutation = useMutation({
  mutationFn: async (items) => {
    const response = await fetch(
      `${API_URL}/api/customer/cart/validate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ items }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to validate cart");
    }

    return data;
  },
});

const validatedCart = validateCartMutation.data;

const loading = validateCartMutation.isPending;

const error = validateCartMutation.error?.message || "";

useEffect(() => {
  if (authLoading || !user) {
    return;
  }

  if (cartItems.length === 0) {
    return;
  }

  if (Object.keys(quantities).length !== cartItems.length) {
    return;
  }

  const items = cartItems.map((item) => ({
    productId: item.id,
    quantity: quantities[item.id] || 1,
  }));

  validateCartMutation.mutate(items);
}, [authLoading, user, cartItems, quantities]);


  const increaseQuantity = (id, stock) => {
  setQuantities((current) => {
    const currentQuantity = current[id] || 1;

    if (currentQuantity >= stock) {
      return current;
    }

    return {
      ...current,
      [id]: currentQuantity + 1,
    };
  });
};

const decreaseQuantity = (id) => {
  setQuantities((current) => {
    const currentQuantity = current[id] || 1;

    if (currentQuantity <= 1) {
      return current;
    }

    return {
      ...current,
      [id]: currentQuantity - 1,
    };
  });
};

const removeItem = (id) => {
  removeFromCart(id);
};

const subtotal = validatedCart?.subtotal || 0;
const delivery = validatedCart?.delivery || 0;
const total = validatedCart?.total || 0;

if (!authLoading && !user) {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F4F7FA]" />

      <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#061525]/50 px-4 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

          <button
            type="button"
            onClick={() => window.history.back()}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
              <ShoppingCart size={25} className="text-orange-500" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#0B1F33]">
              Login to Continue
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
          Please log in to your account to view your cart and continue shopping
        </p>

          
          </div>
        </div>
      </div>
    </>
  );
}


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F4F7FA] px-6 py-8">
        <div className="mx-auto max-w-6xl">

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0B1F33]">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review your items before placing your order
            </p>
          </div>

          {cartItems.length === 0 ? (
            

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F7FA]">
                <span className="text-2xl text-slate-400">
                  🛒
                </span>
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#0B1F33]">
                Your cart is empty
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Looks like you haven't added anything to your cart yet
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">

              <div className="space-y-4">

                {validatedCart?.items.map((item) => (

                  <div
                    key={item.productId}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" >

                    <div className="flex gap-5">

                      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#F4F7FA]">
                        <img 
                          src={item.image? `${API_URL}${item.image}` : "https://placehold.co/500x400/E9EEF2/0B1F33?text=Product"
}
                          className="h-full w-full object-contain"/>
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-4">

                          <div>
                            <h2 className="text-base font-bold text-[#0B1F33]">
                              {item.name}
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                              SKU: {item.sku}
                            </p>
                          </div>

                          <button type="button"
                           onClick={() => removeItem(item.productId)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            Sold by
                          </span>

                          <Link to={`/vendors/${item.vendor.id}`}
                            className="text-xs font-semibold text-[#0B1F33] transition hover:text-orange-500"
                          >
                            {item.vendor.businessName}
                          </Link>
                        </div>

                        <div className="mt-4 flex items-center justify-between">

                          <p className="text-base font-bold text-[#0B1F33]">
                           Rs. {Number(item.price).toLocaleString()}
                          </p>

                          <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200">

                            <button
                              type="button"
                             onClick={() => decreaseQuantity(item.productId)}
                              disabled={item.quantity === 1}
                              className="flex h-9 w-9 items-center justify-center text-[#0B1F33] transition hover:bg-[#F4F7FA] hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus size={13} />
                            </button>

                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-[#0B1F33]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                             onClick={() => increaseQuantity(item.productId, item.stockQuantity)}
                             disabled={item.quantity === item.stockQuantity}
                              className="flex h-9 w-9 items-center justify-center text-[#0B1F33] transition hover:bg-[#F4F7FA] hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Plus size={13} />
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-3 text-right">

                      <span className="text-xs text-slate-500">
                        Item Total
                      </span>

                      <span className="ml-2 text-sm font-bold text-[#0B1F33]">
                        Rs.{" "}
                       {Number(item.subtotal).toLocaleString()}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

              <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-bold text-[#0B1F33]">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-semibold text-[#0B1F33]">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Delivery
                    </span>

                    <span className="font-semibold text-[#0B1F33]">
                      Rs. {delivery.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-4">

                    <div className="flex items-center justify-between">

                      <span className="text-base font-bold text-[#0B1F33]">
                        Total
                      </span>

                      <span className="text-xl font-bold text-orange-500">
                        Rs. {total.toLocaleString()}
                      </span>

                    </div>

                  </div>

                </div>

                <Link to="/checkout"
                   className="mt-3 flex w-full items-center justify-center rounded-xl border bg-orange-500 text-white py-3 text-sm font-semibold transition hover:border-orange-400 hover:bg-orange-600"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/products"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-[#0B1F33] transition hover:border-orange-400 hover:text-orange-500"
                >
                  Continue Shopping
                </Link>

              </div>

            </div>

          )}

        </div>
      </div>
    </>
  );
}

export default Cart;