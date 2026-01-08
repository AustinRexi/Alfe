// // src/app/products/page.tsx
// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { useApp } from "@/provider/AppContext";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   AlertCircle,
//   Upload,
//   X,
//   Package,
//   Scissors,
// } from "lucide-react";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   images: string[];
//   sewingCost: number;
//   defaultFabric: string;
//   yardage: number;
//   category: string;
//   isActive: boolean;
// }

// const categories = ["Male", "Female", "Kids", "Unisex", "Packages"] as const;

// export default function Products() {
//   const { vendorProfile } = useApp();
//   const isVerified = vendorProfile.isVerified;

//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [products, setProducts] = useState<Product[]>([
//     {
//       id: "PRD-001",
//       name: "Ankara Gown",
//       description: "Beautiful fitted Ankara gown with flare",
//       images: [
//         "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
//       ],
//       sewingCost: 7000,
//       defaultFabric: "Ankara Print",
//       yardage: 3.5,
//       category: "Female",
//       isActive: true,
//     },
//     {
//       id: "PRD-002",
//       name: "Senator Suit",
//       description: "Classic senator suit with modern fit",
//       images: [
//         "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
//       ],
//       sewingCost: 13000,
//       defaultFabric: "Senator Material",
//       yardage: 5,
//       category: "Male",
//       isActive: true,
//     },
//     {
//       id: "PRD-003",
//       name: "Lace Blouse & Wrapper Set",
//       description: "Elegant lace ensemble for special occasions",
//       images: [
//         "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800&q=80",
//       ],
//       sewingCost: 10000,
//       defaultFabric: "French Lace",
//       yardage: 4,
//       category: "Female",
//       isActive: true,
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     sewingCost: "",
//     defaultFabric: "",
//     yardage: "",
//     category: "",
//     images: [] as string[],
//   });

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const newImages: string[] = [];
//     Array.from(files).forEach((file) => {
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           newImages.push(reader.result as string);
//           if (newImages.length === files.length) {
//             setFormData((prev) => ({
//               ...prev,
//               images: [...prev.images, ...newImages],
//             }));
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     });
//   };

//   const removeImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newProduct: Product = {
//       id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
//       name: formData.name,
//       description: formData.description,
//       images:
//         formData.images.length > 0
//           ? formData.images
//           : [
//               "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
//             ],
//       sewingCost: parseFloat(formData.sewingCost),
//       defaultFabric: formData.defaultFabric,
//       yardage: parseFloat(formData.yardage),
//       category: formData.category,
//       isActive: true,
//     };

//     setProducts((prev) => [...prev, newProduct]);
//     setFormData({
//       name: "",
//       description: "",
//       sewingCost: "",
//       defaultFabric: "",
//       yardage: "",
//       category: "",
//       images: [],
//     });
//     setShowUploadForm(false);
//   };

//   const toggleProductStatus = (id: string) => {
//     setProducts((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
//     );
//   };

//   const deleteProduct = (id: string) => {
//     if (confirm("Are you sure you want to delete this product?")) {
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//     }
//   };

//   return (
//     <div className="space-y-8 pb-12">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">
//             Products & Designs
//           </h1>
//           <p className="text-slate-600 mt-1">
//             Showcase your fashion designs to attract customers
//           </p>
//         </div>
//         {isVerified && (
//           <button
//             onClick={() => setShowUploadForm(true)}
//             className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 rounded-xl hover:shadow-xl transition-all flex items-center gap-3 font-medium"
//           >
//             <Plus size={22} />
//             Upload New Design
//           </button>
//         )}
//       </div>

//       {/* Verification Alert */}
//       {!isVerified && (
//         <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
//           <AlertCircle
//             className="text-amber-600 mt-1 flex-shrink-0"
//             size={24}
//           />
//           <div>
//             <h3 className="font-semibold text-amber-900">
//               Profile Verification Required
//             </h3>
//             <p className="text-sm text-amber-800 mt-1">
//               Complete your profile verification to upload and sell your
//               designs.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
//           >
//             {/* Product Image */}
//             <div className="relative aspect-square bg-slate-100">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                 className="object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//               {!product.isActive && (
//                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                   <span className="bg-slate-900 text-white px-6 py-3 rounded-full text-lg font-bold">
//                     Inactive
//                   </span>
//                 </div>
//               )}
//               <div className="absolute top-3 left-3 bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-medium">
//                 {product.category}
//               </div>
//               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
//                 {product.yardage} yards
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="p-5 space-y-4">
//               <div>
//                 <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-slate-600 line-clamp-2 mt-1">
//                   {product.description}
//                 </p>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-slate-600 flex items-center gap-2">
//                     <Scissors size={16} /> Sewing Cost
//                   </span>
//                   <span className="font-bold text-blue-900">
//                     ₦{product.sewingCost.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="text-xs text-slate-500">
//                   <span className="flex items-center gap-2">
//                     <Package size={14} /> {product.defaultFabric}
//                   </span>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2 pt-3 border-t border-slate-100">
//                 <button
//                   onClick={() => toggleProductStatus(product.id)}
//                   className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                     product.isActive
//                       ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   {product.isActive ? "Active" : "Inactive"}
//                 </button>
//                 <button className="p-2.5 bg-blue-100 text-blue-900 rounded-xl hover:bg-blue-200 transition-all">
//                   <Edit size={18} />
//                 </button>
//                 <button
//                   onClick={() => deleteProduct(product.id)}
//                   className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Upload Form Modal */}
//       {showUploadForm && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-slate-900">
//                 Upload New Design
//               </h2>
//               <button
//                 onClick={() => setShowUploadForm(false)}
//                 className="p-3 hover:bg-slate-100 rounded-full transition-colors"
//               >
//                 <X size={28} className="text-slate-600" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-8 space-y-8">
//               {/* Product Images */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-4">
//                   Product Images <span className="text-red-500">*</span>
//                 </label>
//                 <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:border-blue-400 transition-colors cursor-pointer">
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                     id="product-images"
//                   />
//                   <label htmlFor="product-images">
//                     <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Upload size={36} className="text-blue-900" />
//                     </div>
//                     <p className="text-lg font-medium text-slate-700">
//                       Click to upload images
//                     </p>
//                     <p className="text-sm text-slate-500 mt-2">
//                       PNG, JPG, WebP up to 5MB each
//                     </p>
//                   </label>
//                 </div>

//                 {formData.images.length > 0 && (
//                   <div className="mt-6">
//                     <p className="text-sm font-medium text-slate-700 mb-4">
//                       Preview ({formData.images.length})
//                     </p>
//                     <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
//                       {formData.images.map((img, index) => (
//                         <div
//                           key={index}
//                           className="relative group aspect-square rounded-xl overflow-hidden shadow-md"
//                         >
//                           <Image
//                             src={img}
//                             alt={`Preview ${index + 1}`}
//                             fill
//                             className="object-cover"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Form Fields */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Design Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, name: e.target.value }))
//                     }
//                     className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
//                     placeholder="e.g., Royal Ankara Gown"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Category <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         category: e.target.value,
//                       }))
//                     }
//                     className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
//                     required
//                   >
//                     <option value="">Choose category</option>
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>
//                         {cat}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       description: e.target.value,
//                     }))
//                   }
//                   rows={4}
//                   className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all resize-none"
//                   placeholder="Describe the style, fit, occasion, and unique features..."
//                   required
//                 />
//               </div>

//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Sewing Cost (₦) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.sewingCost}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         sewingCost: e.target.value,
//                       }))
//                     }
//                     className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
//                     placeholder="7000"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Yardage Required <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     value={formData.yardage}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         yardage: e.target.value,
//                       }))
//                     }
//                     className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
//                     placeholder="3.5"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Default Fabric <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.defaultFabric}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         defaultFabric: e.target.value,
//                       }))
//                     }
//                     className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
//                     placeholder="e.g., Ankara Print"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex gap-4 pt-6 border-t border-slate-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowUploadForm(false)}
//                   className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-medium transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-4 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-3"
//                 >
//                   <Upload size={22} />
//                   Publish Design
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/app/products/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/provider/AppContext";
import {
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Upload,
  X,
  Package,
  Scissors,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  sewingCost: number;
  defaultFabric: string;
  yardage: number;
  category: string;
  size: string; // ← Added size to product
  isActive: boolean;
}

const categories = ["Male", "Female", "Kids", "Unisex", "Packages"] as const;

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"] as const;

export default function Products() {
  const { vendorProfile } = useApp();
  const isVerified = vendorProfile.isVerified;

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PRD-001",
      name: "Ankara Gown",
      description: "Beautiful fitted Ankara gown with flare",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      ],
      sewingCost: 7000,
      defaultFabric: "Ankara Print",
      yardage: 3.5,
      category: "Female",
      size: "M", // Example size
      isActive: true,
    },
    {
      id: "PRD-002",
      name: "Senator Suit",
      description: "Classic senator suit with modern fit",
      images: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
      ],
      sewingCost: 13000,
      defaultFabric: "Senator Material",
      yardage: 5,
      category: "Male",
      size: "L",
      isActive: true,
    },
    {
      id: "PRD-003",
      name: "Lace Blouse & Wrapper Set",
      description: "Elegant lace ensemble for special occasions",
      images: [
        "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800&q=80",
      ],
      sewingCost: 10000,
      defaultFabric: "French Lace",
      yardage: 4,
      category: "Female",
      size: "XL",
      isActive: true,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sewingCost: "",
    defaultFabric: "",
    yardage: "",
    category: "",
    size: "", // ← Added size to form state
    images: [] as string[],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, ...newImages],
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
      name: formData.name,
      description: formData.description,
      images:
        formData.images.length > 0
          ? formData.images
          : [
              "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
            ],
      sewingCost: parseFloat(formData.sewingCost),
      defaultFabric: formData.defaultFabric,
      yardage: parseFloat(formData.yardage),
      category: formData.category,
      size: formData.size, // ← Save selected size
      isActive: true,
    };

    setProducts((prev) => [...prev, newProduct]);
    setFormData({
      name: "",
      description: "",
      sewingCost: "",
      defaultFabric: "",
      yardage: "",
      category: "",
      size: "", // ← Reset size
      images: [],
    });
    setShowUploadForm(false);
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Products & Designs
          </h1>
          <p className="text-slate-600 mt-1">
            Showcase your fashion designs to attract customers
          </p>
        </div>
        {isVerified && (
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 rounded-xl hover:shadow-xl transition-all flex items-center gap-3 font-medium"
          >
            <Plus size={22} />
            Upload New Design
          </button>
        )}
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <AlertCircle
            className="text-amber-600 mt-1 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="font-semibold text-amber-900">
              Profile Verification Required
            </h3>
            <p className="text-sm text-amber-800 mt-1">
              Complete your profile verification to upload and sell your
              designs.
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-slate-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {!product.isActive && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-slate-900 text-white px-6 py-3 rounded-full text-lg font-bold">
                    Inactive
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                {product.category}
              </div>
              <div className="absolute top-3 right-3 space-y-1">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                  Size: {product.size}
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                  {product.yardage} yards
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <Scissors size={16} /> Sewing Cost
                  </span>
                  <span className="font-bold text-blue-900">
                    ₦{product.sewingCost.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  <span className="flex items-center gap-2">
                    <Package size={14} /> {product.defaultFabric}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => toggleProductStatus(product.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    product.isActive
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </button>
                <button className="p-2.5 bg-blue-100 text-blue-900 rounded-xl hover:bg-blue-200 transition-all">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Upload New Design
              </h2>
              <button
                onClick={() => setShowUploadForm(false)}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={28} className="text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Product Images */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">
                  Product Images <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="product-images"
                  />
                  <label htmlFor="product-images">
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={36} className="text-blue-900" />
                    </div>
                    <p className="text-lg font-medium text-slate-700">
                      Click to upload images
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      PNG, JPG, WebP up to 5MB each
                    </p>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-slate-700 mb-4">
                      Preview ({formData.images.length})
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {formData.images.map((img, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square rounded-xl overflow-hidden shadow-md"
                        >
                          <Image
                            src={img}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Design Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                    placeholder="e.g., Royal Ankara Gown"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                    required
                  >
                    <option value="">Choose category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                  placeholder="Describe the style, fit, occasion, and unique features..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sewing Cost (₦) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.sewingCost}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sewingCost: e.target.value,
                      }))
                    }
                    className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                    placeholder="7000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Yardage Required <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.yardage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        yardage: e.target.value,
                      }))
                    }
                    className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                    placeholder="3.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Body Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        size: e.target.value,
                      }))
                    }
                    className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                    required
                  >
                    <option value="">Select size</option>
                    {sizes.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Default Fabric <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.defaultFabric}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      defaultFabric: e.target.value,
                    }))
                  }
                  className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  placeholder="e.g., Ankara Print"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-4 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <Upload size={22} />
                  Publish Design
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
