// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import CustomerNavbar from "../Navbar/CustomerNavbar";

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [custCartId, setCustCartId] = useState(sessionStorage.getItem("cartId") || null);
//   const [foodData, setFoodData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productRes = await axios.get(`http://localhost:1234/food/${id}`);
//         setProduct(productRes.data);

//         const allFoodsRes = await axios.get("http://localhost:1234/food/all");
//         setFoodData(allFoodsRes.data);
//         setRelatedProducts(allFoodsRes.data.filter((p) => p.id !== id).slice(0, 4));
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load product details.");
//       }
//     };

//     fetchData();
//   }, [id]);

//   const addToCart = async (foodId) => {
//     if (!custCartId) {
//       toast.error("Cart not available. Please try again later.");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:1234/simcartitems/cart/${custCartId}/food/${foodId}`);
//       const cartItems = response.data;

//       if (cartItems.length > 0) {
//         const cartItem = cartItems[0];
//         await axios.put(`http://localhost:1234/simcartitems/${cartItem.id}`, {
//           ...cartItem,
//           qty: cartItem.qty + 1,
//           total: cartItem.total + parseFloat(cartItem.food.fprice),
//         });
//         toast.success("Item quantity updated in cart");
//       } else {
//         const foodItem = foodData.find((item) => item.id === foodId);
//         if (!foodItem) {
//           toast.error("Food item not found.");
//           return;
//         }
//         await axios.post("http://localhost:1234/simcartitems", {
//           cart: { id: custCartId },
//           food: { id: foodId },
//           qty: 1,
//           total: parseFloat(foodItem.fprice),
//         });
//         toast.success("Added to cart");
//       }
//     } catch (err) {
//       console.error("Error adding item to cart:", err);
//       toast.error(`Failed to add item to cart: ${err.response ? err.response.data.message : err.message}`);
//     }
//   };

//   if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <div className="min-h-screen p-12 bg-white">
//         <div className="container mx-auto max-w-6xl">
//           {/* Main Product Card */}
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12 border border-gray-200">
//             <div className="flex flex-col lg:flex-row">
//               <div className="w-full lg:w-1/2 p-4">
//                 <img
//                   src={`data:image;base64,${product.fimg}`}
//                   alt={product.fname}
//                   className="w-full h-80 object-cover rounded-2xl"
//                   style={{ padding: '1rem', borderRadius: '0.5rem' }}
//                 />
//               </div>
//               <div className="w-full lg:w-1/2 p-6 flex flex-col">
//                 <h1 className="text-4xl font-bold text-red-600 mb-4">{product.fname}</h1>
//                 <p className="text-lg text-gray-800 mb-4">{product.fdesc}</p>
//                 <p className="text-xl font-semibold text-gray-900 mb-4">₹ {product.fprice}</p>
//                 <button
//                   onClick={() => addToCart(product.id)}
//                   className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors mb-4"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Related Products */}
//           <div className="mb-12">
//             <h2 className="text-3xl font-bold text-red-600 mb-6">Our Menu</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {relatedProducts.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group border border-gray-200 cursor-pointer"
//                 >
//                   <Link to={`/product/${item.id}`} className="w-full h-full flex flex-col">
//                     <div className="relative p-4">
//                       <img
//                         src={`data:image;base64,${item.fimg}`}
//                         alt={item.fname}
//                         className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-75 transition-opacity"
//                         style={{ padding: '1rem', borderRadius: '0.5rem' }}
//                       />
//                     </div>
//                     <div className="p-4 flex flex-col flex-grow">
//                       <h2 className="text-lg font-bold text-gray-800">{item.fname}</h2>
//                       <p className="text-sm text-gray-600 truncate">{item.fdesc}</p>
//                       <p className="text-lg font-semibold text-gray-900 mt-2">₹ {item.fprice}</p>
//                     </div>
//                   </Link>
//                   <div className="p-4">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToCart(item.id);
//                       }}
//                       className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetail;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import CustomerNavbar from "../Navbar/CustomerNavbar";

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [custCartId, setCustCartId] = useState(sessionStorage.getItem("cartId") || null);
//   const [foodData, setFoodData] = useState([]);
//   const navigate = useNavigate();  // Initialize navigate function

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productRes = await axios.get(`http://localhost:1234/food/${id}`);
//         setProduct(productRes.data);

//         const allFoodsRes = await axios.get("http://localhost:1234/food/all");
//         setFoodData(allFoodsRes.data);
//         setRelatedProducts(allFoodsRes.data.filter((p) => p.id !== id).slice(0, 4));
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load product details.");
//       }
//     };

//     fetchData();
//   }, [id]);

//   const addToCart = async (foodId) => {
//     if (!custCartId) {
//       toast.error("Cart not available. Please try again later.");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:1234/simcartitems/cart/${custCartId}/food/${foodId}`);
//       const cartItems = response.data;

//       if (cartItems.length > 0) {
//         const cartItem = cartItems[0];
//         await axios.put(`http://localhost:1234/simcartitems/${cartItem.id}`, {
//           ...cartItem,
//           qty: cartItem.qty + 1,
//           total: cartItem.total + parseFloat(cartItem.food.fprice),
//         });
//         toast.success("Item quantity updated in cart");
//       } else {
//         const foodItem = foodData.find((item) => item.id === foodId);
//         if (!foodItem) {
//           toast.error("Food item not found.");
//           return;
//         }
//         await axios.post("http://localhost:1234/simcartitems", {
//           cart: { id: custCartId },
//           food: { id: foodId },
//           qty: 1,
//           total: parseFloat(foodItem.fprice),
//         });
//         toast.success("Added to cart");
//       }
//     } catch (err) {
//       console.error("Error adding item to cart:", err);
//       toast.error(`Failed to add item to cart: ${err.response ? err.response.data.message : err.message}`);
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);  // Navigate to the previous page
//   };

//   if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <div className="min-h-screen p-12 bg-white">
//         <div className="container mx-auto max-w-6xl">
//           {/* Back Button */}
//           <button
//             onClick={handleBack}
//             className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
//           >
//             Back
//           </button>

//           {/* Main Product Card */}
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12 border border-gray-200">
//             <div className="flex flex-col lg:flex-row">
//               <div className="w-full lg:w-1/2 p-4">
//                 <img
//                   src={`data:image;base64,${product.fimg}`}
//                   alt={product.fname}
//                   className="w-full h-80 object-cover rounded-2xl"
//                   style={{ padding: '1rem', borderRadius: '0.5rem' }}
//                 />
//               </div>
//               <div className="w-full lg:w-1/2 p-6 flex flex-col">
//                 <h1 className="text-4xl font-bold text-red-600 mb-4">{product.fname}</h1>
//                 <p className="text-lg text-gray-800 mb-4">{product.fdesc}</p>
//                 <p className="text-xl font-semibold text-gray-900 mb-4">₹ {product.fprice}</p>
//                 <button
//                   onClick={() => addToCart(product.id)}
//                   className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors mb-4"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Related Products */}
//           <div className="mb-12">
//             <h2 className="text-3xl font-bold text-red-600 mb-6">Our Menu</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {relatedProducts.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group border border-gray-200 cursor-pointer"
//                 >
//                   <Link to={`/product/${item.id}`} className="w-full h-full flex flex-col">
//                     <div className="relative p-4">
//                       <img
//                         src={`data:image;base64,${item.fimg}`}
//                         alt={item.fname}
//                         className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-75 transition-opacity"
//                         style={{ padding: '1rem', borderRadius: '0.5rem' }}
//                       />
//                     </div>
//                     <div className="p-4 flex flex-col flex-grow">
//                       <h2 className="text-lg font-bold text-gray-800">{item.fname}</h2>
//                       <p className="text-sm text-gray-600 truncate">{item.fdesc}</p>
//                       <p className="text-lg font-semibold text-gray-900 mt-2">₹ {item.fprice}</p>
//                     </div>
//                   </Link>
//                   <div className="p-4">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToCart(item.id);
//                       }}
//                       className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetail;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomerNavbar from "../Navbar/CustomerNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [custCartId, setCustCartId] = useState(sessionStorage.getItem("cartId") || null);
  const [foodData, setFoodData] = useState([]);
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`http://localhost:1234/food/${id}`);
        setProduct(productRes.data);

        const allFoodsRes = await axios.get("http://localhost:1234/food/all");
        setFoodData(allFoodsRes.data);
        setRelatedProducts(allFoodsRes.data.filter((p) => p.id !== id).slice(0, 4));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product details.");
      }
    };

    fetchData();
  }, [id]);

  const addToCart = async (foodId) => {
    if (!custCartId) {
      toast.error("Cart not available. Please try again later.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:1234/simcartitems/cart/${custCartId}/food/${foodId}`);
      const cartItems = response.data;

      if (cartItems.length > 0) {
        const cartItem = cartItems[0];
        await axios.put(`http://localhost:1234/simcartitems/${cartItem.id}`, {
          ...cartItem,
          qty: cartItem.qty + 1,
          total: cartItem.total + parseFloat(cartItem.food.fprice),
        });
        toast.success("Item quantity updated in cart");
      } else {
        const foodItem = foodData.find((item) => item.id === foodId);
        if (!foodItem) {
          toast.error("Food item not found.");
          return;
        }
        await axios.post("http://localhost:1234/simcartitems", {
          cart: { id: custCartId },
          food: { id: foodId },
          qty: 1,
          total: parseFloat(foodItem.fprice),
        });
        toast.success("Added to cart");
      }
    } catch (err) {
      console.error("Error adding item to cart:", err);
      toast.error(`Failed to add item to cart: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <>
      <CustomerNavbar />
      <div className="min-h-screen p-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button with Font Awesome Icon */}
          <button
            onClick={handleBack}
            className="mb-4 text-gray-800 hover:text-gray-600 transition-colors"
            aria-label="Go Back"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
          </button>

          {/* Main Product Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12 border border-gray-200">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-4">
                <img
                  src={`data:image;base64,${product.fimg}`}
                  alt={product.fname}
                  className="w-full h-80 object-cover rounded-2xl"
                  style={{ padding: '1rem', borderRadius: '0.5rem' }}
                />
              </div>
              <div className="w-full lg:w-1/2 p-6 flex flex-col">
                <h1 className="text-4xl font-bold text-red-600 mb-4">{product.fname}</h1>
                <p className="text-lg text-gray-800 mb-4">{product.fdesc}</p>
                <p className="text-xl font-semibold text-gray-900 mb-4">₹ {product.fprice}</p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors mb-4"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Our Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group border border-gray-200 cursor-pointer"
                >
                  <Link to={`/product/${item.id}`} className="w-full h-full flex flex-col">
                    <div className="relative p-4">
                      <img
                        src={`data:image;base64,${item.fimg}`}
                        alt={item.fname}
                        className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-75 transition-opacity"
                        style={{ padding: '1rem', borderRadius: '0.5rem' }}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-bold text-gray-800">{item.fname}</h2>
                      <p className="text-sm text-gray-600 truncate">{item.fdesc}</p>
                      <p className="text-lg font-semibold text-gray-900 mt-2">₹ {item.fprice}</p>
                    </div>
                  </Link>
                  <div className="p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item.id);
                      }}
                      className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
