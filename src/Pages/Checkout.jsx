import { API_URL } from '../config/api';
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useContext } from "react";
import CartContext from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MapPin, CreditCard, ShoppingBag,CheckCircle2 } from "lucide-react";

function Checkout() {
  
 const { cartItems, clearCart } = useContext(CartContext);
 const [showForm, setShowForm] = useState(true);
const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const placeOrderMutation = useMutation({
  mutationFn: async (orderData) => {
    const response = await fetch(
      `${API_URL}/api/customer/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }

    return data;
  },

  onSuccess: () => {
    clearCart();
    setShowForm(false);
    setShowSuccess(true);
    toast.success("Order placed successfully!");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

 const handlePlaceOrder = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const orderData = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    address: formData.get("address"),
    paymentMethod: "COD",
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };

  placeOrderMutation.mutate(orderData);
};


  const subtotal = cartItems.reduce(
  (total, product) => total + product.price * product.quantity,
  0
);

  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F4F7FA] px-6 py-8">

  <div
    className={`mx-auto max-w-6xl transition-all duration-500 ease-in-out ${
      showForm
        ? "opacity-100 scale-100" //opacity controls the transparency(100% means fully visible)
        : "opacity-50 scale-95 pointer-events-none" // scale95 giving the shrinking effect
    }`}>

        
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#0B1F33]">
              Checkout
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Complete your order securely
            </p>
          </div>

    
          <form onSubmit={handlePlaceOrder}>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">

              <div className="space-y-6">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="flex items-center gap-3 border-b border-slate-200 pb-5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                      <MapPin size={20} className="text-orange-500" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#0B1F33]">
                        Delivery Information
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Enter your delivery details
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="md:col-span-2">

                      <label className="text-sm font-semibold text-[#0B1F33]">
                        Full Name
                      </label>

                      <input type="text" name="fullName"  placeholder="Enter your full name" required
                         className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#0B1F33] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"/>

                    </div>

                    <div>

                      <label className="text-sm font-semibold text-[#0B1F33]">
                        Phone Number
                      </label>

                      <input type="tel" name="phone"  placeholder="03XX-XXXXXXX" required
                        className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#0B1F33] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"/>

                    </div>

                    <div>

                      <label className="text-sm font-semibold text-[#0B1F33]">
                        City
                      </label>

                      <input type="text"  name="city"  placeholder="Enter your city"  required 
                        className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#0B1F33] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"/>

                    </div>

                    <div className="md:col-span-2">

                      <label className="text-sm font-semibold text-[#0B1F33]">
                        Delivery Address
                      </label>

                      <textarea name="address" rows="4"  placeholder="Enter your complete delivery address"  required
                        className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-[#0B1F33] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />

                    </div>

                  </div>

                </div>


              
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="flex items-center gap-3 border-b border-slate-200 pb-5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                      <CreditCard size={20}
                        className="text-orange-500" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#0B1F33]">
                        Payment Method
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Choose how you want to pay
                      </p>
                    </div>

                  </div>

                  <label className="mt-5 flex cursor-pointer items-center gap-4 rounded-xl border border-orange-200 bg-orange-50/50 p-4">

                    <input type="radio" name="paymentMethod" value="cod" defaultChecked
                      className="h-4 w-4 accent-orange-500" />

                    <div>

                      <p className="text-sm font-semibold text-[#0B1F33]">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Pay when your order is delivered
                      </p>

                    </div>

                  </label>

                </div>

              </div>

              <div>

                <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="flex items-center gap-3 border-b border-slate-200 pb-5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                      <ShoppingBag size={20}
                        className="text-orange-500" />
                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-[#0B1F33]">
                        Order Summary
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {cartItems.length} products
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 space-y-5">

                    {cartItems.map((product) => (

                      <div
                        key={product.id}
                        className="flex gap-3" >

                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F4F7FA]">

                         <img
  src={
    product.image
      ? `${API_URL}${product.image}`
      : "https://placehold.co/500x400/E9EEF2/0B1F33?text=Product"
  }

  className="h-full w-full object-contain"
/>

                        </div>


                        <div className="min-w-0 flex-1">

                          <h3 className="truncate text-sm font-semibold text-[#0B1F33]">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            SKU: {product.sku}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Sold by{" "}
                            <span className="font-medium text-[#0B1F33]">
                              {product.vendorName}
                            </span>
                          </p>

                          <div className="mt-2 flex items-center justify-between">

                            <span className="text-xs text-slate-500">
                              Qty: {product.quantity}
                            </span>

                            <span className="text-sm font-bold text-[#0B1F33]">
                              Rs.{" "}
                              {(
                                product.price * product.quantity
                              ).toLocaleString()}
                            </span>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">

                    <div className="flex items-center justify-between text-sm">

                      <span className="text-slate-500">
                        Subtotal
                      </span>

                      <span className="font-medium text-[#0B1F33]">
                        Rs. {subtotal.toLocaleString()}
                      </span>

                    </div>


                    <div className="mt-3 flex items-center justify-between text-sm">

                      <span className="text-slate-500">
                        Delivery
                      </span>

                      <span className="font-medium text-[#0B1F33]">
                        Rs. {deliveryFee.toLocaleString()}
                      </span>

                    </div>


                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">

                      <span className="text-base font-bold text-[#0B1F33]">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-[#0B1F33]">
                        Rs. {total.toLocaleString()}
                      </span>

                    </div>

                  </div>

                  <button
  type="submit"
  disabled={placeOrderMutation.isPending}
  className="mt-6 w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
>
  {placeOrderMutation.isPending ? "Placing Order..." : "Place Order"}
</button>

                  <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                    By placing your order, you agree to our terms and
                    conditions.
                  </p>

                </div>

              </div>

            </div>

          </form>

        </div>

      </div>
      {showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F33]/40 px-4 backdrop-blur-sm">

    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

        <CheckCircle2
          size={40}
          className="text-green-600"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-[#0B1F33]">
        Order Placed Successfully!
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Your order has been placed successfully. You will receive
        updates about your order shortly.
      </p>

      <button
        type="button" onClick={() => navigate("/")}
        className="mt-6 w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 cursor-pointer" >
        Continue Shopping
      </button>

    </div>

  </div>
)}
    </>
  );
}

export default Checkout;