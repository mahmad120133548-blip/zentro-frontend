import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem() {
  return (
    <div className="rounded-2xl border border-[#C9D3DA] bg-white p-4 shadow-sm sm:p-5">

      <div className="flex gap-4">

        {/* Product Image */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#E9EEF2] sm:h-28 sm:w-28">

          <img
            src="https://placehold.co/300x300/E9EEF2/3979A6?text=Headphones"
            alt="Wireless Headphones"
            className="h-full w-full object-cover"
          />

        </div>


        {/* Product Information */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-[#3979A6]">
                Audio
              </p>

              <h3 className="mt-1 text-base font-bold text-[#18232B] sm:text-lg">
                Wireless Headphones
              </h3>

              <p className="mt-1 text-xs text-[#71808A]">
                SKU: TZ-WH-001
              </p>

            </div>

            {/* Remove */}
            <button
              type="button"
              className="shrink-0 rounded-lg p-2 text-[#71808A] transition hover:bg-red-50 hover:text-red-500"
              aria-label="Remove product"
            >
              <Trash2 size={17} />
            </button>

          </div>


          {/* Price & Quantity */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Price */}
            <p className="text-lg font-bold text-[#18232B]">
              Rs. 4,500
            </p>


            {/* Quantity */}
            <div className="flex items-center gap-3">

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9D3DA] bg-white text-[#53646F] transition hover:border-[#3979A6] hover:text-[#3979A6]"
              >
                <Minus size={15} />
              </button>

              <span className="min-w-6 text-center text-sm font-semibold text-[#18232B]">
                2
              </span>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9D3DA] bg-white text-[#53646F] transition hover:border-[#3979A6] hover:text-[#3979A6]"
              >
                <Plus size={15} />
              </button>

            </div>


            {/* Item Total */}
            <p className="text-sm font-semibold text-[#53646F] sm:text-right">
              Rs. 9,000
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartItem;