import { useState } from "react";
import {
  ArrowLeft,
  Package,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  GripVertical,
} from "lucide-react";
import {useMutation,useQuery} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Sidebar from "../../Components/vendorDashboard/Sidebar";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");

  const { data: categories = [], isLoading: categoriesLoading,} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/api/categories");
  
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
  
      const data = await response.json();
  
      return data.categories;
    },
  });

  const createProductMutation = useMutation({
  mutationFn: async (formData) => {
    const response = await fetch(
      "http://localhost:4000/api/vendor/products",
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create product");
    }

    return data;
  },

  onSuccess: () => {
    toast.success("Product added successfully.");
  },

  onError: (error) => {
     console.error("Create product error:", error);
    toast.error(error.message);
  },
});

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  if (!files.length) return;

  const imageFiles = files.filter((file) =>
    file.type.startsWith("image/")
  );

  const newImages = imageFiles.map((file) => ({
    id: `${file.name}-${file.lastModified}-${Math.random()}`,
    file,
    preview: URL.createObjectURL(file),
  }));

  setImages((currentImages) => [...currentImages, ...newImages]);
  setImageError("");
  e.target.value = "";
};

  

  const handleSubmit = (e) => {
  e.preventDefault();

  if (images.length === 0) {
    setImageError("Please upload at least one product image.");
    return;
  }

  setImageError("");

  const formData = new FormData(e.currentTarget);

  formData.delete("images");

  images.forEach((image) => {
    formData.append("images", image.file);
  });

  createProductMutation.mutate(formData);
};

  const removeImage = (imageId) => {
    setImages((currentImages) => {
      const imageToRemove = currentImages.find(
        (image) => image.id === imageId
      );

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      return currentImages.filter((image) => image.id !== imageId);
    });
  };

  const handleDragStart = (e, imageId) => {
    e.dataTransfer.setData("imageId", imageId);
  };

  const handleDrop = (e, targetImageId) => {
    e.preventDefault();

    const draggedImageId = e.dataTransfer.getData("imageId");

    if (!draggedImageId || draggedImageId === targetImageId) {
      return;
    }

    setImages((currentImages) => {
      const draggedIndex = currentImages.findIndex(
        (image) => image.id === draggedImageId
      );

      const targetIndex = currentImages.findIndex(
        (image) => image.id === targetImageId
      );

      if (draggedIndex === -1 || targetIndex === -1) {
        return currentImages;
      }

      const updatedImages = [...currentImages];

      const [draggedImage] = updatedImages.splice(draggedIndex, 1);

      updatedImages.splice(targetIndex, 0, draggedImage);

      return updatedImages;
    });
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen ml-0 lg:ml-64">
        <header className="flex min-h-20 items-center border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Add a new product to your store.
            </p>
          </div>
        </header>

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/vendor/products"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Back to Products
            </Link>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Package size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Product Information
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Enter the details of your product.
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="p-5 sm:p-7"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="productName"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Product Name
                    </label>

                    <input
                      id="productName"
                      name="name"
                      type="text"
                      placeholder="Enter product name"
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <label className="block text-sm font-medium text-slate-700">
                        Product Images
                      </label>
                    </div>

                    <label
                      htmlFor="productImages"
                      className={`group flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-7 text-center transition ${
                        imageError
                          ? "border-red-300 bg-red-50 hover:border-red-400 hover:bg-red-50"
                          : "border-slate-200 bg-slate-50 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500 transition group-hover:bg-orange-200">
                        <Upload size={22} />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        Upload Product Images
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Select one or multiple images
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        JPG, PNG or WEBP
                      </p>

                      <input
                        id="productImages"
                        name="images"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    {imageError && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {imageError}
                      </p>
                    )}

                    {images.length > 0 && (
                      <div className="mt-5">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-700">
                            Selected Images
                          </p>

                          <p className="text-xs text-slate-400">
                            Drag images to change their order
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                          {images.map((image, index) => (
                            <div
                              key={image.id}
                              draggable
                              onDragStart={(e) =>
                                handleDragStart(e, image.id)
                              }
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => handleDrop(e, image.id)}
                              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-orange-300"
                            >
                              <div className="relative aspect-square bg-slate-100">
                                <img
                                  src={image.preview}
                                  alt={`Product ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />

                                {index === 0 && (
                                  <div className="absolute left-2 top-2 rounded-lg bg-orange-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                                    Primary
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={() => removeImage(image.id)}
                                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                                  aria-label="Remove image"
                                >
                                  <X size={16} />
                                </button>

                                <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-500 opacity-0 shadow-sm transition group-hover:opacity-100">
                                  <GripVertical size={16} />
                                </div>
                              </div>

                              <div className="flex items-center justify-between px-3 py-2.5">
                                <div className="flex min-w-0 items-center gap-2">
                                  <ImageIcon
                                    size={15}
                                    className="shrink-0 text-orange-500"
                                  />

                                  <span className="truncate text-xs text-slate-500">
                                    Image {index + 1}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="sku"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      SKU
                    </label>

                    <input
                      id="sku"
                      name="sku"
                      type="text"
                      placeholder="e.g. WH-102"
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Category
                    </label>

                    <select
                      id="category"
                      name="categoryId"
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    >
                      <option value="">Select category</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Price
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                        Rs.
                      </span>

                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        required
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Initial Stock
                    </label>

                    <input
                      id="stock"
                      name="stockQuantity"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Enter quantity"
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="minimumStock"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Minimum Stock Level
                    </label>

                    <input
                      id="minimumStock"
                      name="minimumStock"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Enter minimum level"
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Low stock warning starts at this level.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      placeholder="Enter product description"
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                  <Link
                    to="/vendor/products"
                    className="flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    <Save size={17} />
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddProduct;