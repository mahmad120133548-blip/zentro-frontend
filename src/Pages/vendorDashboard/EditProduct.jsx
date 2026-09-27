import { useState,useEffect } from "react";
import {
  ArrowLeft,
  Package,
  Save,
  Upload,
  X,
} from "lucide-react";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useParams,useNavigate } from "react-router-dom";

import Sidebar from "../../Components/vendorDashboard/Sidebar";

const EditProduct = () => {
  const { productId } = useParams();

const [name, setName] = useState("");
const [sku, setSku] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("");
const [images, setImages] = useState([]);
const [draggedIndex, setDraggedIndex] = useState(null);

const navigate = useNavigate();
const queryClient = useQueryClient();

const { data: productData, isLoading: productLoading,isError:productError,error:productErrorMessage} = useQuery({
  queryKey: ["vendorProduct", productId],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:4000/api/vendor/products/${productId}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch product");
    }

    return data.product;
  },
  enabled: !!productId,
});

const { data: categories = [] } = useQuery({
  queryKey: ["categories"],
  queryFn: async () => {
    const response = await fetch(
      "http://localhost:4000/api/categories"
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch categories");
    }

    return data.categories;
  },
});

useEffect(() => {
  if (!productData) return;

  setName(productData.name);
  setSku(productData.sku);
  setDescription(productData.description);
  setPrice(String(productData.price));
  setCategory(String(productData.categoryId));

   setImages(
  (productData.images || []).map((image) => ({
      id: image.id,
      preview: `http://localhost:4000${image.imagePath}`,
      existing: true,
    }))
  );
}, [productData]);

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  const newImages = files.map((file) => ({
    preview: URL.createObjectURL(file),
    file,
    existing: false,
  }));

  setImages((current) => [...current, ...newImages]);

  e.target.value = "";
};

  const removeImage = (index) => {
    setImages((current) => current.filter((_, i) => i !== index));
  };

  const handleDragStart = (index) => {
  setDraggedIndex(index);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (index) => {
  if (draggedIndex === null || draggedIndex === index) {
    return;
  }

  setImages((current) => {
    const updatedImages = [...current];
    const draggedImage = updatedImages[draggedIndex];

    updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, draggedImage);

    return updatedImages;
  });

  setDraggedIndex(null);
};

const handleDragEnd = () => {
  setDraggedIndex(null);
};

  const updateProductMutation = useMutation({
  mutationFn: async (formData) => {
    const response = await fetch(
      `http://localhost:4000/api/vendor/products/${productId}`,
      {
        method: "PUT",
        credentials: "include",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }

    return data;
  },

  onSuccess: () => {
    toast.success("Product updated successfully");

    queryClient.invalidateQueries({
      queryKey: ["vendorProduct", productId],
    });

    queryClient.invalidateQueries({
      queryKey: ["vendorProducts"],
    });

    navigate("/vendor/products");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", name);
  formData.append("sku", sku);
  formData.append("categoryId", category);
  formData.append("price", price);
  formData.append("description", description);

  const existingImages = images.filter(
    (image) => image.existing
  );

  const existingImageIds = existingImages.map(
    (image) => image.id
  );

  const imageOrder = existingImages.map(
    (image) => image.id
  );

  formData.append(
    "existingImageIds",
    JSON.stringify(existingImageIds)
  );

  formData.append(
    "imageOrder",
    JSON.stringify(imageOrder)
  );

  images
    .filter((image) => !image.existing)
    .forEach((image) => {
      formData.append("images", image.file);
    });

  updateProductMutation.mutate(formData);
};

if (productLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-500">Loading product...</p>
    </div>
  );
}

if (productError) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-red-500">
        {productErrorMessage?.message || "Failed to load product"}
      </p>
    </div>
  );
}

if (!productData) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-500">Product not found.</p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen ml-0 lg:ml-64">
        <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Edit Product
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update your product information.
          </p>
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

            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Package size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Product Information
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Update the details of your product.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Product Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
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
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Category
                    </label>

                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    >
                      <option value="">Select Category</option>
                      {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                      {item.name}
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

                    <input
                      id="price"
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Product Images
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {images.map((image, index) => {
                      const imageUrl =
                        typeof image === "string"
                          ? image
                          : image.preview;

                      return (
                        <div
  key={image.existing ? image.id : image.preview}
  draggable
  onDragStart={() => handleDragStart(index)}
  onDragOver={handleDragOver}
  onDrop={() => handleDrop(index)}
  onDragEnd={handleDragEnd}
  className={`relative aspect-square cursor-grab overflow-hidden rounded-xl border bg-slate-50 active:cursor-grabbing ${
    draggedIndex === index
      ? "border-orange-400 opacity-50"
      : "border-slate-200"
  }`}
>
                          <img
                            src={imageUrl}
                            alt={`Product ${index + 1}`}
                            className="h-full w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      );
                    })}

                    <label
                      htmlFor="productImages"
                      className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center transition hover:border-orange-300 hover:bg-orange-50"
                    >
                      <Upload
                        size={20}
                        className="text-orange-500"
                      />

                      <span className="mt-2 text-xs font-semibold text-slate-600">
                        Add Image
                      </span>

                      <input
                        id="productImages"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
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
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditProduct;

