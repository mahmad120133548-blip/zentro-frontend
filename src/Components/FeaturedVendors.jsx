import { Link } from "react-router-dom";
const vendors = [
  {
    id: 1,
    name: "TechZone",
    category: "Electronics & Accessories",
    products: 48,
      status: "Active",
  },
  {
    id: 2,
    name: "StyleHub",
    category: "Fashion & Clothing",
    products: 35,
      status: "Active",
  },
  {
    id: 3,
    name: "HomeNest",
    category: "Home & Furniture",
    products: 27,
      status: "Active",
  },
  {
    id: 4,
    name: "FreshMart",
    category: "Groceries & Essentials",
    products: 62,
      status: "Active",
  },
  {
    id: 5,
    name: "OfficePoint",
    category: "Office & Stationery",
    products: 41,
      status: "Active",
  },
  {
    id: 6,
    name: "AutoGear",
    category: "Automotive Accessories",
    products: 33,
      status: "Active",
  },
];

function FeaturedVendors() {
  return (
    <section className="bg-[#E9EEF2] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">

      
<div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

  <div>
   

    <h2 className="text-3xl font-bold tracking-tight text-[#18232B] md:text-4xl">
      Featured Vendors
    </h2>

    
  </div>

 
  <Link to="/vendors/"
  className="
    self-start
    rounded-lg
    border border-[#3979A6]
    px-5 py-2.5
    font-bold
    text-[#3979A6]
    transition-all duration-300
    hover:bg-[#3979A6]
    hover:text-white
    hover:shadow-md
    sm:self-auto
  "
>
  View All Vendors →
</Link>

</div>

        
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="
                group flex items-center gap-4
                rounded-xl
                border border-[#C9D3DA]
                bg-[#F7F9FA]
                p-4
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#3979A6]
                hover:bg-white
                hover:shadow-lg
                hover:shadow-[#718795]/20
              "
            >

              
              <div
                className="
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-lg
                  border border-[#C7D2DA]
                  bg-[#E8EFF4] font-bold text-[#3979A6]transition-all duration-300 group-hover:border-[#3979A6] group-hover:bg-[#3979A6] group-hover:text-white" >
                {vendor.name.charAt(0)}
              </div>

              
              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">

                  <h3
                    className="truncate text-bas font-bold
                      text-[#18232B]
                      transition-colors duration-300
                      group-hover:text-[#3979A6]">
                    {vendor.name}
                  </h3>
                 <span
  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
    vendor.status === "Active"
      ? "bg-emerald-500"
      : "bg-red-500"
  }`}
/>
                </div>

                <p className="mt-1 truncate text-xs text-[#71808A]">
                  {vendor.category}
                </p>

                <p className="mt-1 text-xs font-medium text-[#53646F]">
                  {vendor.products} Products
                </p>

              </div>

              
              <Link to={`/vendors/${vendor.id}`}
                className="
                  shrink-0
                  rounded-lg
                  border border-[#C7D2DA]
                  px-3 py-2
                  text-xs font-bold
                  text-[#3979A6]
                  transition-all duration-300
                  hover:border-[#3979A6]
                  hover:bg-[#3979A6]
                  hover:text-white
                ">
                Visit →
              </Link>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedVendors;