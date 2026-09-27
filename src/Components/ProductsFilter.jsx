import { Search, ChevronDown } from "lucide-react";

function ProductFilters() {
  return (
    <div className="mt-8 rounded-2xl border border-[#C9D3DA] bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        
        <div className="relative flex-1">

          <Search
            size={19}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71808A]"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-[#C9D3DA] bg-[#F7F9FA] py-3 pl-11 pr-4 text-sm text-[#18232B] outline-none transition focus:border-[#3979A6] focus:bg-white focus:ring-2 focus:ring-[#3979A6]/10"/>

        </div>


        
        <div className="relative">

          <select
            className="w-full appearance-none rounded-xl border border-[#C9D3DA] bg-[#F7F9FA] py-3 pl-4 pr-10 text-sm font-medium text-[#53646F] outline-none transition focus:border-[#3979A6] lg:w-48"
          >
            <option>All Categories</option>
            <option>Audio</option>
            <option>Accessories</option>
            <option>Computer</option>
            <option>Gaming</option>
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71808A]"
          />

        </div>


       
        <div className="relative">

          <select
            className="w-full appearance-none rounded-xl border border-[#C9D3DA] bg-[#F7F9FA] py-3 pl-4 pr-10 text-sm font-medium text-[#53646F] outline-none transition focus:border-[#3979A6] lg:w-48"
          >
            <option>Sort: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A to Z</option>
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71808A]"
          />

        </div>

      </div>

    </div>
  );
}

export default ProductFilters;