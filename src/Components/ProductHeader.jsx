function ProductHeader() {
  return (
    <div className="mt-6 rounded-2xl border border-[#C9D3DA] bg-white p-6 shadow-sm">
      
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

       
        <div>

          <h1 className="text-3xl font-bold tracking-tight text-[#18232B] md:text-4xl">
            TechZone
          </h1>

          <p className="mt-2 text-sm font-medium text-[#71808A]">
            Electronics & Accessories
          </p>

          <p className="mt-2 text-sm text-[#53646F]">
            48 Products
          </p>

        </div>

        <div>

          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">

            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            Active

          </span>

        </div>

      </div>

    </div>
  );
}

export default ProductHeader;