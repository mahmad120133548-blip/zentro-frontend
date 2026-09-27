function CartSummary() {
  return (
    <div className="rounded-2xl border border-[#C9D3DA] bg-white p-6 shadow-sm">

      <h2 className="text-lg font-bold text-[#18232B]">
        Order Summary
      </h2>


      <div className="mt-6 space-y-4">

        {/* Items */}
        <div className="flex items-center justify-between text-sm">

          <span className="text-[#71808A]">
            Items
          </span>

          <span className="font-semibold text-[#53646F]">
            3
          </span>

        </div>


        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">

          <span className="text-[#71808A]">
            Subtotal
          </span>

          <span className="font-semibold text-[#53646F]">
            Rs. 13,800
          </span>

        </div>


        <div className="border-t border-[#E3E8EC]" />


        {/* Total */}
        <div className="flex items-center justify-between">

          <span className="text-base font-bold text-[#18232B]">
            Total
          </span>

          <span className="text-xl font-bold text-[#18232B]">
            Rs. 13,800
          </span>

        </div>


        {/* Checkout */}
        <button
          type="button"
          className="mt-3 w-full rounded-xl bg-[#3979A6] py-3.5 text-sm font-bold text-white transition hover:bg-[#285F85]"
        >
          Proceed to Checkout
        </button>

      </div>

    </div>
  );
}

export default CartSummary;