function CartVendorHeader() {
  return (
    <div className="rounded-2xl border border-[#C9D3DA] bg-[#DCE5EB] p-5 shadow-sm">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-xl font-bold text-[#18232B]">
            TechZone
          </h2>

          <p className="mt-1 text-sm font-medium text-[#71808A]">
            Electronics & Accessories
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Active
        </span>

      </div>

    </div>
  );
}

export default CartVendorHeader;