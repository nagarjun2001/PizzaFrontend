// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaStar } from 'react-icons/fa';
// import { MdSearch } from 'react-icons/md';
// import { Link } from 'react-rouModconst [foodData, setFoodData] = useState([]);
//   const [filteredFoods, setFilteredFoods] = useState([]);
//   const [filterType, setFilterType] = useState('');
//   const [priceRange, setPriceRange] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [foodTypes, setFoodTypes] = useState([]);

//   const custid = sessionStorage.getItem("custid");

//   useEffect(() => {
//     axios.get("http://localhost:1234/food/all")
//       .then((res) => {
//         setFoodData(res.data);
//         setFilteredFoods(res.data);
//         setRecommendations(res.data.slice(0, 5));
//         const types = [...new Set(res.data.map(food => food.ftype))];
//         setFoodTypes(types);
//       })
//       .then((res) => {
//         axios
//           .post("http://localhost:1234/cart/",{custid})
//           .then((res) => {
//             console.log("Cart created for customer:",custid);
//           })
//       })
//       .catch(err => console.error(err));
//   }, []);

//   useEffect(() => {
//     let filtered = foodData;

//     if (filterType) {
//       filtered = filtered.filter(food => food.ftype.toLowerCase() === filterType.toLowerCase());
//     }

//     if (priceRange !== 'all') {
//       filtered = filtered.filter(food => {
//         const price = parseFloat(food.fprice);
//         return priceRange === 'low' ? price < 100 : price >= 100;
//       });
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(food => food.fname.toLowerCase().includes(searchQuery.toLowerCase()));
//     }

//     setFilteredFoods(filtered);
//   }, [filterType, priceRange, searchQuery, foodData]);

//   return (
//     <>
//       <NewNav />
//       <div className="min-h-screen bg-gray-100">
//         <div className="container mx-auto flex">
//           <aside className="w-1/4 bg-white shadow-md p-6">
//             <h2 className="text-xl font-bold mb-4">Filters</h2>
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold mb-2">Search</h3>
//               <div className="flex items-center border rounded-md p-2">
//                 <MdSearch size={20} className="text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="ml-2 w-full outline-none"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold mb-2">Type</h3>
//               {foodTypes.map(type => (
//                 <button
//                   key={type}
//                   onClick={() => {
//                     setFilterType(type);
//                   }}
//                   className={`block p-2 mt-2 rounded-md ${filterType === type ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                 >
//                   {type}
//                 </button>
//               ))}
//               <button
//                 onClick={() => {
//                   setFilterType('');
//                 }}
//                 className={`block p-2 mt-2 rounded-md ${filterType === '' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 All Types
//               </button>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Price Range</h3>
//               <button
//                 onClick={() => setPriceRange(priceRange === 'all' ? 'low' : (priceRange === 'low' ? 'high' : 'all'))}
//                 className={`block p-2 rounded-md ${priceRange === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 {priceRange === 'all' ? 'All Prices' : priceRange === 'low' ? 'Below 100' : 'Above 100'}
//               </button>
//             </div>
//           </aside>

//           <main className="w-3/4 p-6">
//             <h1 className="text-3xl font-bold text-red-600 mb-4">Explore Our Menu</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {filteredFoods.map(food => (
//                 <Link key={food.id} to={`/product/${food.id}`} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group">
//                   <img src={`data:image;base64,${food.fimg}`} alt={food.fname} className="w-full h-40 object-cover group-hover:scale-105 hover:opacity-75 transition-opacity" />
//                   <div className="p-4 flex flex-col flex-grow">
//                     <h2 className="text-lg font-bold text-gray-800">{food.fname}</h2>
//                     <p className="text-sm text-gray-600 truncate">{food.fdesc}</p>
//                     <p className="text-lg font-semibold text-gray-900 mt-2">₹{food.fprice}</p>
//                   </div>
//                   <div className="p-4 flex justify-between items-center bg-gray-100">
//                     <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Add to Cart</button>
//                     <FaStar size={20} className="text-yellow-400" />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold text-red-600 mb-4">Recommended For You</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {recommendations.map(food => (
//                   <Link key={food.id} to={`/product/${food.id}`} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group">
//                     <img src={`data:image;base64,${food.fimg}`} alt={food.fname} className="w-full h-40 object-cover group-hover:opacity-75 transition-opacity" />
//                     <div className="p-4 flex flex-col flex-grow">
//                       <h2 className="text-lg font-bold text-gray-800">{food.fname}</h2>
//                       <p className="text-sm text-gray-600 truncate">{food.fdesc}</p>
//                       <p className="text-lg font-semibold text-gray-900 mt-2">₹{food.fprice}</p>
//                     </div>
//                     <div className="p-4 flex justify-between items-center bg-gray-100">
//                       <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Add to Cart</button>
//                       <FaStar size={20} className="text-yellow-400" />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </main>
//         </div>
//         <div className="container mx-auto mt-6 text-center">
//           {filterType && (
//             <Link
//               to={`/products/${filterType.toLowerCase()}`}
//               className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
//             >
//               See More {filterType}
//             </Link>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default CHomepage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MdSearch } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import NewNav from "./NewNav";
// import toast from "react-hot-toast";

// function CHomepage() {
//   const [foodData, setFoodData] = useState([]);
//   const [filteredFoods, setFilteredFoods] = useState([]);
//   const [filterType, setFilterType] = useState("");
//   const [priceRange, setPriceRange] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recommendations, setRecommendations] = useState([]);
//   const [foodTypes, setFoodTypes] = useState([]);
//   const [custCartId, setCustCartId] = useState(sessionStorage.getItem("cartId") || null);
//   const [custid, setCustid] = useState(sessionStorage.getItem("custid"));
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:1234/food/all");
//         setFoodData(res.data);
//         setFilteredFoods(res.data);
//         setRecommendations(res.data.slice(0, 5));
//         const types = [...new Set(res.data.map((food) => food.ftype))];
//         setFoodTypes(types);
//       } catch (err) {
//         console.error("Error fetching food data:", err);
//         toast.error("Failed to fetch food data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         if (custid) {
//           const response = await axios.get(`http://localhost:1234/simcart/customer/${custid}`);
//           const cart = response.data;
//           if (cart) {
//             setCustCartId(cart.id);
//             sessionStorage.setItem("cartId", cart.id);
//           } else {
//             const createResponse = await axios.post("http://localhost:1234/simcart/create", {
//               customer: { id: custid },
//             });
//             setCustCartId(createResponse.data.id);
//             sessionStorage.setItem("cartId", createResponse.data.id);
//           }
//         }
//       } catch (err) {
//         console.error("Error handling cart:", err);
//         toast.error("Failed to handle cart");
//       }
//     };

//     fetchCart();
//   }, [custid]);

//   useEffect(() => {
//     let filtered = foodData;

//     if (filterType) {
//       filtered = filtered.filter(
//         (food) => food.ftype.toLowerCase() === filterType.toLowerCase()
//       );
//     }

//     if (priceRange !== "all") {
//       filtered = filtered.filter((food) => {
//         const price = parseFloat(food.fprice);
//         return priceRange === "low" ? price < 100 : price >= 100;
//       });
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((food) =>
//         food.fname.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredFoods(filtered);
//   }, [filterType, priceRange, searchQuery, foodData]);

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

//   const navi = useNavigate();
//   const logout = () => {
//     sessionStorage.clear();
//     navi("/custlogin");
//   };

//   return (
//     <>
//       <NewNav />
//       <div className="p-4 bg-gray-800 text-white flex justify-end">
//         <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
//           Logout
//         </button>
//       </div>
//       <div className="min-h-screen bg-gray-100">
//         <div className="container mx-auto flex flex-col md:flex-row">
//           <aside className="w-full md:w-1/4 bg-white shadow-md p-4 md:p-6">
//             <h2 className="text-xl font-bold mb-4">Filters</h2>
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold mb-2">Search</h3>
//               <div className="flex items-center border rounded-md p-2 bg-gray-50 shadow-sm">
//                 <MdSearch size={20} className="text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="ml-2 w-full outline-none bg-gray-50"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold mb-2">Type</h3>
//               {foodTypes.map((type) => (
//                 <button
//                   key={type}
//                   onClick={() => setFilterType(type)}
//                   className={`block p-2 mt-2 rounded-md ${filterType === type ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold mb-2">Price</h3>
//               <button
//                 onClick={() => setPriceRange("all")}
//                 className={`block p-2 mt-2 rounded-md ${priceRange === "all" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setPriceRange("low")}
//                 className={`block p-2 mt-2 rounded-md ${priceRange === "low" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
//               >
//                 Below ₹100
//               </button>
//               <button
//                 onClick={() => setPriceRange("high")}
//                 className={`block p-2 mt-2 rounded-md ${priceRange === "high" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
//               >
//                 ₹100 and Above
//               </button>
//             </div>
//           </aside>
//           <main className="w-full md:w-3/4 p-4 md:p-6">
//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <>
//                 <h1 className="text-3xl font-bold mb-6">Food Menu</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredFoods.length > 0 ? (
//                     filteredFoods.map((food) => (
//                       <div
//                         key={food.id}
//                         className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//                       >
//                         <Link to={`/product/${food.id}`} className="w-full">
//                           <img
//                             src={`data:image;base64,${food.fimg}`}
//                             alt={food.fname}
//                             className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
//                           />
//                           <div className="p-4">
//                             <h2 className="text-xl font-semibold mb-2">{food.fname}</h2>
//                             <p className="text-gray-600 mb-2">{food.fdesc}</p>
//                             <p className="text-gray-900 font-bold">₹ {food.fprice}</p>
//                             <button
//                               onClick={() => addToCart(food.id)}
//                               className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </Link>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-center col-span-full">No items found</p>
//                   )}
//                 </div>
//                 <div className="mt-12">
//                   <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {recommendations.map((food) => (
//                       <div
//                         key={food.id}
//                         className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//                       >
//                         <Link to={`/product/${food.id}`} className="w-full">
//                           <img
//                             src={`data:image;base64,${food.fimg}`}
//                             alt={food.fname}
//                             className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
//                           />
//                           <div className="p-4">
//                             <h2 className="text-xl font-semibold mb-2">{food.fname}</h2>
//                             <p className="text-gray-600 mb-2">{food.fdesc}</p>
//                             <p className="text-gray-900 font-bold">₹ {food.fprice}</p>
//                             <button
//                               onClick={() => addToCart(food.id)}
//                               className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </Link>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CHomepage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import CustomerNavbar from "../Navbar/CustomerNavbar";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { MdFilterList } from "react-icons/md";

// // FilterModal Component
// const FilterModal = ({
//   open,
//   onClose,
//   filterType,
//   setFilterType,
//   priceRange,
//   setPriceRange,
//   foodTypes,
// }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//         >
//           &times;
//         </button>
//         <h3 className="text-xl font-semibold mb-4">Filters</h3>

//         {/* Type Filter */}
//         <div className="mb-4">
//           <h4 className="text-md font-semibold mb-2">Type</h4>
//           <div className="flex flex-wrap gap-2">
//             {foodTypes.map((type) => (
//               <button
//                 key={type}
//                 onClick={() => {
//                   setFilterType((prev) =>
//                     prev.includes(type)
//                       ? prev.filter((t) => t !== type)
//                       : [...prev, type]
//                   );
//                 }}
//                 className={`px-4 py-2 rounded-full border transition-colors ${
//                   filterType.includes(type)
//                     ? "bg-red-600 text-white border-red-600"
//                     : "bg-gray-200 text-gray-700 border-gray-300"
//                 }`}
//               >
//                 {type}
//                 {filterType.includes(type) && (
//                   <span className="ml-2 text-red-500">x</span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Price Filter */}
//         <div>
//           <h4 className="text-md font-semibold mb-2">Price Range</h4>
//           <Slider
//             range
//             min={0}
//             max={200}
//             step={10}
//             value={priceRange}
//             onChange={(value) => setPriceRange(value)}
//             className="mb-4"
//             trackStyle={{ backgroundColor: "#f87171" }}
//             railStyle={{ backgroundColor: "#e5e7eb" }}
//             handleStyle={{ borderColor: "#f87171", backgroundColor: "#f87171" }}
//           />
//           <div className="flex justify-between text-sm text-gray-600 mt-2">
//             <span>₹ {priceRange[0]}</span>
//             <span>₹ {priceRange[1]}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main CHomepage Component
// function CHomepage() {
//   const [foodData, setFoodData] = useState([]);
//   const [filteredFoods, setFilteredFoods] = useState([]);
//   const [filterType, setFilterType] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 200]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recommendations, setRecommendations] = useState([]);
//   const [foodTypes, setFoodTypes] = useState([]);
//   const [custCartId, setCustCartId] = useState(
//     sessionStorage.getItem("cartId") || null
//   );
//   const [custid, setCustid] = useState(sessionStorage.getItem("custid"));
//   const [loading, setLoading] = useState(true);
//   const [openFilterModal, setOpenFilterModal] = useState(false);
//   const [selectedType, setSelectedType] = useState(null);
//   const navi = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:1234/food/all");
//         setFoodData(res.data);
//         setFilteredFoods(res.data);
//         setRecommendations(res.data.slice(0, 5));
//         const types = [...new Set(res.data.map((food) => food.ftype))];
//         setFoodTypes(types);
//       } catch (err) {
//         console.error("Error fetching food data:", err);
//         toast.error("Failed to fetch food data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!custid) return;

//       try {
//         const response = await axios.get(
//           `http://localhost:1234/simcart/customer/${custid}`
//         );
//         const cart = response.data;

//         if (cart) {
//           setCustCartId(cart.id);
//           sessionStorage.setItem("cartId", cart.id);
//         } else {
//           const createResponse = await axios.post(
//             "http://localhost:1234/simcart/create",
//             {
//               customer: { id: custid },
//             }
//           );
//           setCustCartId(createResponse.data.id);
//           sessionStorage.setItem("cartId", createResponse.data.id);
//         }
//       } catch (err) {
//         console.error("Error handling cart:", err);
//         toast.error("Failed to handle cart");
//       }
//     };

//     fetchCart();
//   }, [custid]);

//   useEffect(() => {
//     let filtered = foodData;

//     if (filterType.length > 0) {
//       filtered = filtered.filter((food) => filterType.includes(food.ftype));
//     }

//     if (priceRange.length === 2) {
//       filtered = filtered.filter((food) => {
//         const price = parseFloat(food.fprice);
//         return price >= priceRange[0] && price <= priceRange[1];
//       });
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((food) =>
//         food.fname.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredFoods(filtered);
//   }, [filterType, priceRange, searchQuery, foodData]);

//   const addToCart = async (foodId, e) => {
//     e.stopPropagation();
//     if (!custCartId) {
//       toast.error("Cart not available. Please try again later.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:1234/simcartitems/cart/${custCartId}/food/${foodId}`
//       );
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
//       toast.error(
//         `Failed to add item to cart: ${
//           err.response ? err.response.data.message : err.message
//         }`
//       );
//     }
//   };

//   const handleCardClick = (foodId) => {
//     navi(`/product/${foodId}`);
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     navi("/custlogin");
//   };

//   const filterByType = (type) => {
//     setSelectedType(type);
//     setFilteredFoods(
//       foodData.filter((food) => food.ftype === type)
//     );
//   };

//   return (
//     <>
//       <CustomerNavbar />

//       {/* Filter Button */}
//       <div className="p-4 bg-white flex justify-between items-center mb-4">
//         <button
//           onClick={() => setOpenFilterModal(true)}
//           className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
//         >
//           <MdFilterList size={20} className="mr-2" />
//           Filters
//         </button>
//       </div>

//       {/* Filter Modal */}
//       <FilterModal
//         open={openFilterModal}
//         onClose={() => setOpenFilterModal(false)}
//         filterType={filterType}
//         setFilterType={setFilterType}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//         foodTypes={foodTypes}
//       />

//       {/* Carousel */}
//       <div className="mb-6 mx-4">
//         <Carousel
//           autoPlay
//           infiniteLoop
//           showThumbs={false}
//           showStatus={false}
//           interval={3000}
//           className="carousel-container rounded-lg overflow-hidden"
//           style={{ margin: '0 auto', maxWidth: '100%' }}
//         >
//           <div>
//             <img
//               src="https://png.pngtree.com/thumb_back/fw800/background/20231009/pngtree-gourmet-pizza-baking-on-a-textured-dark-background-image_13606859.png"
//               alt="Pizza Offer 1"
//               style={{ height: "300px", width: "100%", objectFit: "cover" }}
//             />
//           </div>
//           <div>
//             <img
//               src="https://www.naegele-inc.com/wp-content/uploads/2019/08/bigstock-Hot-Smoked-Italian-Round-Pizza-279712438.jpg"
//               alt="Pizza Offer 2"
//               style={{ height: "300px", width: "100%", objectFit: "cover" }}
//             />
//           </div>
//           <div>
//             <img
//               src="https://static.vecteezy.com/system/resources/previews/030/625/823/non_2x/pizza-image-hd-free-photo.jpg"
//               alt="Pizza Offer 3"
//               style={{ height: "300px", width: "100%", objectFit: "cover" }}
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Food Menu */}
//       <div className="min-h-screen bg-white">
//         <div className="container mx-auto flex flex-col md:flex-row mt-4">
//           <main className="w-full md:w-3/4 p-6">
//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <>
//                 <h1 className="text-4xl font-bold mb-6">Food Menu</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredFoods.length > 0 ? (
//                     filteredFoods.map((food) => (
//                       <div
//                         key={food.id}
//                         onClick={() => handleCardClick(food.id)}
//                         className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                       >
//                         <img
//                           src={`data:image;base64,${food.fimg}`}
//                           alt={food.fname}
//                           className="w-full h-32 object-cover rounded-md"
//                         />
//                         <div className="p-4">
//                           <h2 className="text-xl font-semibold mb-2">
//                             {food.fname}
//                           </h2>
//                           <p className="text-gray-600 mb-2 text-sm">
//                             {food.fdesc}
//                           </p>
//                           <p className="text-gray-900 font-bold">
//                             ₹ {food.fprice}
//                           </p>
//                           <button
//                             onClick={(e) => addToCart(food.id, e)}
//                             className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                           >
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-center col-span-full">No items found</p>
//                   )}
//                 </div>
//                 <div className="mt-12">
//                   <h2 className="text-3xl font-bold mb-4">Recommendations</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {recommendations.map((food) => (
//                       <div
//                         key={food.id}
//                         onClick={() => handleCardClick(food.id)}
//                         className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                       >
//                         <img
//                           src={`data:image;base64,${food.fimg}`}
//                           alt={food.fname}
//                           className="w-full h-32 object-cover rounded-md"
//                         />
//                         <div className="p-4">
//                           <h2 className="text-xl font-semibold mb-2">
//                             {food.fname}
//                           </h2>
//                           <p className="text-gray-600 mb-2 text-sm">
//                             {food.fdesc}
//                           </p>
//                           <p className="text-gray-900 font-bold">
//                             ₹ {food.fprice}
//                           </p>
//                           <button
//                             onClick={(e) => addToCart(food.id, e)}
//                             className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                           >
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Food Types Section */}
//                 <div className="mt-12">
//                   <h2 className="text-3xl font-bold mb-4">Browse by Type</h2>
//                   <div className="flex flex-wrap gap-4 mb-6">
//                     {foodTypes.map((type) => (
//                       <button
//                         key={type}
//                         onClick={() => filterByType(type)}
//                         className={`px-4 py-2 rounded-md border transition-colors ${
//                           selectedType === type
//                             ? "bg-red-600 text-white border-red-600"
//                             : "bg-gray-200 text-gray-700 border-gray-300"
//                         }`}
//                       >
//                         {type}
//                       </button>
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredFoods.length > 0 && !selectedType ? (
//                       filteredFoods.map((food) => (
//                         <div
//                           key={food.id}
//                           onClick={() => handleCardClick(food.id)}
//                           className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                         >
//                           <img
//                             src={`data:image;base64,${food.fimg}`}
//                             alt={food.fname}
//                             className="w-full h-32 object-cover rounded-md"
//                           />
//                           <div className="p-4">
//                             <h2 className="text-xl font-semibold mb-2">
//                               {food.fname}
//                             </h2>
//                             <p className="text-gray-600 mb-2 text-sm">
//                               {food.fdesc}
//                             </p>
//                             <p className="text-gray-900 font-bold">
//                               ₹ {food.fprice}
//                             </p>
//                             <button
//                               onClick={(e) => addToCart(food.id, e)}
//                               className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-center col-span-full">No items found</p>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CHomepage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import CustomerNavbar from "../Navbar/CustomerNavbar";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { MdFilterList } from "react-icons/md";
// import Footer from "../components/Footer";

// // FilterModal Component
// const FilterModal = ({
//   open,
//   onClose,
//   filterType,
//   setFilterType,
//   priceRange,
//   setPriceRange,
//   foodTypes,
// }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//         >
//           &times;
//         </button>
//         <h3 className="text-xl font-semibold mb-4">Filters</h3>

//         {/* Type Filter */}
//         <div className="mb-4">
//           <h4 className="text-md font-semibold mb-2">Type</h4>
//           <div className="flex flex-wrap gap-2">
//             {foodTypes.map((type) => (
//               <button
//                 key={type}
//                 onClick={() => {
//                   setFilterType((prev) =>
//                     prev.includes(type)
//                       ? prev.filter((t) => t !== type)
//                       : [...prev, type]
//                   );
//                 }}
//                 className={`px-4 py-2 rounded-full border transition-colors ${
//                   filterType.includes(type)
//                     ? "bg-red-600 text-white border-red-600"
//                     : "bg-gray-200 text-gray-700 border-gray-300"
//                 }`}
//               >
//                 {type}
//                 {filterType.includes(type) && (
//                   <span className="ml-2 text-red-500">x</span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Price Filter */}
//         <div>
//           <h4 className="text-md font-semibold mb-2">Price Range</h4>
//           <Slider
//             range
//             min={0}
//             max={200}
//             step={10}
//             value={priceRange}
//             onChange={(value) => setPriceRange(value)}
//             className="mb-4"
//             trackStyle={{ backgroundColor: "#f87171" }}
//             railStyle={{ backgroundColor: "#e5e7eb" }}
//             handleStyle={{ borderColor: "#f87171", backgroundColor: "#f87171" }}
//           />
//           <div className="flex justify-between text-sm text-gray-600 mt-2">
//             <span>₹ {priceRange[0]}</span>
//             <span>₹ {priceRange[1]}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main CHomepage Component
// function CHomepage() {
//   const [foodData, setFoodData] = useState([]);
//   const [filteredFoods, setFilteredFoods] = useState([]);
//   const [filterType, setFilterType] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 200]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recommendations, setRecommendations] = useState([]);
//   const [foodTypes, setFoodTypes] = useState([]);
//   const [custCartId, setCustCartId] = useState(
//     sessionStorage.getItem("cartId") || null
//   );
//   const [custid, setCustid] = useState(sessionStorage.getItem("custid"));
//   const [loading, setLoading] = useState(true);
//   const [openFilterModal, setOpenFilterModal] = useState(false);
//   const navi = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:1234/food/all");
//         setFoodData(res.data);
//         setFilteredFoods(res.data);
//         setRecommendations(res.data.slice(0, 5));
//         const types = [...new Set(res.data.map((food) => food.ftype))];
//         setFoodTypes(types);
//       } catch (err) {
//         console.error("Error fetching food data:", err);
//         toast.error("Failed to fetch food data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!custid) return;

//       try {
//         const response = await axios.get(
//           http://localhost:1234/simcart/customer/${custid}
//         );
//         const cart = response.data;

//         if (cart) {
//           setCustCartId(cart.id);
//           sessionStorage.setItem("cartId", cart.id);
//         } else {
//           const createResponse = await axios.post(
//             "http://localhost:1234/simcart/create",
//             {
//               customer: { id: custid },
//             }
//           );
//           setCustCartId(createResponse.data.id);
//           sessionStorage.setItem("cartId", createResponse.data.id);
//         }
//       } catch (err) {
//         console.error("Error handling cart:", err);
//         toast.error("Failed to handle cart");
//       }
//     };

//     fetchCart();
//   }, [custid]);

//   useEffect(() => {
//     let filtered = foodData;

//     if (filterType.length > 0) {
//       filtered = filtered.filter((food) => filterType.includes(food.ftype));
//     }

//     if (priceRange.length === 2) {
//       filtered = filtered.filter((food) => {
//         const price = parseFloat(food.fprice);
//         return price >= priceRange[0] && price <= priceRange[1];
//       });
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((food) =>
//         food.fname.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredFoods(filtered);
//   }, [filterType, priceRange, searchQuery, foodData]);

//   const addToCart = async (foodId, e) => {
//     e.stopPropagation();
//     if (!custCartId) {
//       toast.error("Cart not available. Please try again later.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         http://localhost:1234/simcartitems/cart/${custCartId}/food/${foodId}
//       );
//       const cartItems = response.data;

//       if (cartItems.length > 0) {
//         const cartItem = cartItems[0];
//         await axios.put(http://localhost:1234/simcartitems/${cartItem.id}, {
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
//       toast.error(`
//         Failed to add item to cart: ${
//           err.response ? err.response.data.message : err.message
//         }
//       );
//     }
//   };

//   const handleCardClick = (foodId) => {
//     navi(`/product/${foodId}`);
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     navi("/custlogin");
//   };

//   // Function to filter food items by type
//   const filterByType = (type) => {
//     setFilteredFoods(
//       foodData.filter((food) => food.ftype === type)
//     );
//   };

//   // Group food items by their type
//   const groupByType = (type) => {
//     return foodData.filter((food) => food.ftype === type);
//   };

//   return (
//     <>
//       <CustomerNavbar />

//       {/* Filter Button */}
//       <div className="p-4 bg-white flex justify-between items-center mb-4">
//         <button
//           onClick={() => setOpenFilterModal(true)}
//           className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
//         >
//           <MdFilterList size={20} className="mr-2" />
//           Filters
//         </button>
//       </div>

//       {/* Filter Modal */}
//       <FilterModal
//         open={openFilterModal}
//         onClose={() => setOpenFilterModal(false)}
//         filterType={filterType}
//         setFilterType={setFilterType}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//         foodTypes={foodTypes}
//       />

//       {/* Carousel */}
//       <div className="mb-6 mx-4">
//         <Carousel
//           autoPlay
//           infiniteLoop
//           showThumbs={false}
//           showStatus={false}
//           interval={3000}
//           className="carousel-container rounded-lg overflow-hidden"
//           style={{ margin: '0 auto', maxWidth: '100%' }}
//         >
//           <div>
//             <img
//               src="https://png.pngtree.com/thumb_back/fw800/background/20231009/pngtree-gourmet-pizza-baking-on-a-textured-dark-background-image_13606859.png"
//               alt="Pizza Offer 1"
//               style={{ height: "300px", width: "100%", objectFit: "cover" }}
//             />
//           </div>
//           <div>
//             <img
//               src="https://www.naegele-inc.com/wp-content/uploads/2019/08/bigstock-Hot-Smoked-Italian-Round-Pizza-279712438.jpg"
//               alt="Pizza Offer 2"
//               style={{ height: "300px", width: "100%", objectFit: "cover" }}
//             />
//           </div>
//           <div>
//             <img
//               src="https://static.vecteezy.com/system/resources/previews/030/625/823/non_2x/pizza-image-hd-free-photo.jpg"
//               alt="Pizza Offer 3"
//               style={{ height: "300px", width: "100%", objectFit: "cover" }}
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Food Menu */}
//       <div className="min-h-screen bg-white">
//         <div className="container mx-auto flex flex-col md:flex-row mt-4">
//           <main className="w-full md:w-3/4 p-6">
//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <>
//                 <h1 className="text-4xl font-bold mb-6">Food Menu</h1>
                
//                 {/* All Foods Section */}
//                 <div className="mb-12">
//                   <h2 className="text-3xl font-bold mb-4">All Foods</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredFoods.length > 0 ? (
//                       filteredFoods.map((food) => (
//                         <div
//                           key={food.id}
//                           onClick={() => handleCardClick(food.id)}
//                           className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                         >
//                           <img
//                             src={`data:image;base64,${food.fimg}`}
//                             alt={food.fname}
//                             className="w-full h-32 object-cover rounded-md"
//                           />
//                           <div className="p-4">
//                             <h2 className="text-xl font-semibold mb-2">
//                               {food.fname}
//                             </h2>
//                             <p className="text-gray-600 mb-2 text-sm">
//                               {food.fdesc}
//                             </p>
//                             <p className="text-gray-900 font-bold">
//                               ₹ {food.fprice}
//                             </p>
//                             <button
//                               onClick={(e) => addToCart(food.id, e)}
//                               className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-center col-span-full">No food items available</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Pizza Section */}
//                 <div className="mb-12">
//                   <h2 className="text-3xl font-bold mb-4">Pizza</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {groupByType("Pizza").length > 0 ? (
//                       groupByType("Pizza").map((food) => (
//                         <div
//                           key={food.id}
//                           onClick={() => handleCardClick(food.id)}
//                           className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                         >
//                           <img
//                             src={`data:image;base64,${food.fimg}`}
//                             alt={food.fname}
//                             className="w-full h-32 object-cover rounded-md"
//                           />
//                           <div className="p-4">
//                             <h2 className="text-xl font-semibold mb-2">
//                               {food.fname}
//                             </h2>
//                             <p className="text-gray-600 mb-2 text-sm">
//                               {food.fdesc}
//                             </p>
//                             <p className="text-gray-900 font-bold">
//                               ₹ {food.fprice}
//                             </p>
//                             <button
//                               onClick={(e) => addToCart(food.id, e)}
//                               className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-center col-span-full">No pizzas available</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Beverages Section */}
//                 <div className="mb-12">
//                   <h2 className="text-3xl font-bold mb-4">Beverages</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {groupByType("Beverages").length > 0 ? (
//                       groupByType("Beverages").map((food) => (
//                         <div
//                           key={food.id}
//                           onClick={() => handleCardClick(food.id)}
//                           className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                         >
//                           <img
//                             src={`data:image;base64,${food.fimg}`}
//                             alt={food.fname}
//                             className="w-full h-32 object-cover rounded-md"
//                           />
//                           <div className="p-4">
//                             <h2 className="text-xl font-semibold mb-2">
//                               {food.fname}
//                             </h2>
//                             <p className="text-gray-600 mb-2 text-sm">
//                               {food.fdesc}
//                             </p>
//                             <p className="text-gray-900 font-bold">
//                               ₹ {food.fprice}
//                             </p>
//                             <button
//                               onClick={(e) => addToCart(food.id, e)}
//                               className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-center col-span-full">No beverages available</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Desserts Section */}
//                 <div className="mb-12">
//                   <h2 className="text-3xl font-bold mb-4">Desserts</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {groupByType("Desserts").length > 0 ? (
//                       groupByType("Desserts").map((food) => (
//                         <div
//                           key={food.id}
//                           onClick={() => handleCardClick(food.id)}
//                           className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                         >
//                           <img
//                             src={`data:image;base64,${food.fimg}`}
//                             alt={food.fname}
//                             className="w-full h-32 object-cover rounded-md"
//                           />
//                           <div className="p-4">
//                             <h2 className="text-xl font-semibold mb-2">
//                               {food.fname}
//                             </h2>
//                             <p className="text-gray-600 mb-2 text-sm">
//                               {food.fdesc}
//                             </p>
//                             <p className="text-gray-900 font-bold">
//                               ₹ {food.fprice}
//                             </p>
//                             <button
//                               onClick={(e) => addToCart(food.id, e)}
//                               className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-center col-span-full">No desserts available</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Recommendations Section */}
//                 <div className="mt-12">
//                   <h2 className="text-3xl font-bold mb-4">Recommendations</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {recommendations.map((food) => (
//                       <div
//                         key={food.id}
//                         onClick={() => handleCardClick(food.id)}
//                         className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
//                       >
//                         <img
//                           src={`data:image;base64,${food.fimg}`}
//                           alt={food.fname}
//                           className="w-full h-32 object-cover rounded-md"
//                         />
//                         <div className="p-4">
//                           <h2 className="text-xl font-semibold mb-2">
//                             {food.fname}
//                           </h2>
//                           <p className="text-gray-600 mb-2 text-sm">{food.fdesc}</p>
//                           <p className="text-gray-900 font-bold">₹ {food.fprice}</p>
//                           <button
//                             onClick={(e) => addToCart(food.id, e)}
//                             className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
//                           >
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     <Footer />
//     </>
//   );
// }

// export default CHomepage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomerNavbar from "../Navbar/CustomerNavbar";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdFilterList } from "react-icons/md";

// FilterModal Component
const FilterModal = ({
  open,
  onClose,
  filterType,
  setFilterType,
  priceRange,
  setPriceRange,
  foodTypes,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">Filters</h3>

        {/* Type Filter */}
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">Type</h4>
          <div className="flex flex-wrap gap-2">
            {foodTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFilterType((prev) =>
                    prev.includes(type)
                      ? prev.filter((t) => t !== type)
                      : [...prev, type]
                  );
                }}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  filterType.includes(type)
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-gray-200 text-gray-700 border-gray-300"
                }`}
              >
                {type}
                {filterType.includes(type) && (
                  <span className="ml-2 text-red-500">x</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h4 className="text-md font-semibold mb-2">Price Range</h4>
          <Slider
            range
            min={0}
            max={200}
            step={10}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
            className="mb-4"
            trackStyle={{ backgroundColor: "#f87171" }}
            railStyle={{ backgroundColor: "#e5e7eb" }}
            handleStyle={{ borderColor: "#f87171", backgroundColor: "#f87171" }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>₹ {priceRange[0]}</span>
            <span>₹ {priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main CHomepage Component
function CHomepage() {
  const [foodData, setFoodData] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [custCartId, setCustCartId] = useState(
    sessionStorage.getItem("cartId") || null
  );
  const [custid, setCustid] = useState(sessionStorage.getItem("custid"));
  const [loading, setLoading] = useState(true);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const navi = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:1234/food/all");
        setFoodData(res.data);
        setFilteredFoods(res.data);
        setRecommendations(res.data.slice(0, 5));
        const types = [...new Set(res.data.map((food) => food.ftype))];
        setFoodTypes(types);
      } catch (err) {
        console.error("Error fetching food data:", err);
        toast.error("Failed to fetch food data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!custid) return;

      try {
        const response = await axios.get(
          `http://localhost:1234/simcart/customer/${custid}`
        );
        const cart = response.data;

        if (cart) {
          setCustCartId(cart.id);
          sessionStorage.setItem("cartId", cart.id);
        } else {
          const createResponse = await axios.post(
            "http://localhost:1234/simcart/create",
            {
              customer: { id: custid },
            }
          );
          setCustCartId(createResponse.data.id);
          sessionStorage.setItem("cartId", createResponse.data.id);
        }
      } catch (err) {
        console.error("Error handling cart:", err);
        toast.error("Failed to handle cart");
      }
    };

    fetchCart();
  }, [custid]);

  useEffect(() => {
    let filtered = foodData;

    if (filterType.length > 0) {
      filtered = filtered.filter((food) => filterType.includes(food.ftype));
    }

    if (priceRange.length === 2) {
      filtered = filtered.filter((food) => {
        const price = parseFloat(food.fprice);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((food) =>
        food.fname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
  }, [filterType, priceRange, searchQuery, foodData]);

  const addToCart = async (foodId, e) => {
    e.stopPropagation();
    if (!custCartId) {
      toast.error("Cart not available. Please try again later.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:1234/simcartitems/cart/${custCartId}/food/${foodId}`
      );
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
      toast.error(
        `Failed to add item to cart: ${
          err.response ? err.response.data.message : err.message
        }`
      );
    }
  };

  const handleCardClick = (foodId) => {
    navi(`/product/${foodId}`);
  };

  const logout = () => {
    sessionStorage.clear();
    navi("/custlogin");
  };

  // Function to filter food items by type
  const filterByType = (type) => {
    setFilteredFoods(
      foodData.filter((food) => food.ftype === type)
    );
  };

  // Group food items by their type
  const groupByType = (type) => {
    return foodData.filter((food) => food.ftype === type);
  };

  return (
    <>
      <CustomerNavbar />

      {/* Filter Button */}
      <div className="p-4 bg-white flex justify-between items-center mb-4">
        <button
          onClick={() => setOpenFilterModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          <MdFilterList size={20} className="mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        filterType={filterType}
        setFilterType={setFilterType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        foodTypes={foodTypes}
      />

      {/* Carousel */}
      <div className="mb-6 mx-4">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          className="carousel-container rounded-lg overflow-hidden"
          style={{ margin: '0 auto', maxWidth: '100%' }}
        >
          <div>
            <img
              src="https://png.pngtree.com/thumb_back/fw800/background/20231009/pngtree-gourmet-pizza-baking-on-a-textured-dark-background-image_13606859.png"
              alt="Pizza Offer 1"
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://www.naegele-inc.com/wp-content/uploads/2019/08/bigstock-Hot-Smoked-Italian-Round-Pizza-279712438.jpg"
              alt="Pizza Offer 2"
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/030/625/823/non_2x/pizza-image-hd-free-photo.jpg"
              alt="Pizza Offer 3"
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </Carousel>
      </div>

      {/* Food Menu */}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto flex flex-col md:flex-row mt-4">
          <main className="w-full md:w-3/4 p-6">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-6">Food Menu</h1>
                
                {/* All Foods Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">All Foods</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFoods.length > 0 ? (
                      filteredFoods.map((food) => (
                        <div
                          key={food.id}
                          onClick={() => handleCardClick(food.id)}
                          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
                        >
                          <img
                            src={`data:image;base64,${food.fimg}`}
                            alt={food.fname}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                              {food.fname}
                            </h2>
                            <p className="text-gray-600 mb-2 text-sm">
                              {food.fdesc}
                            </p>
                            <p className="text-gray-900 font-bold">
                              ₹ {food.fprice}
                            </p>
                            <button
                              onClick={(e) => addToCart(food.id, e)}
                              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center col-span-full">No food items available</p>
                    )}
                  </div>
                </div>

                {/* Pizza Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Pizza</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupByType("Pizza").length > 0 ? (
                      groupByType("Pizza").map((food) => (
                        <div
                          key={food.id}
                          onClick={() => handleCardClick(food.id)}
                          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
                        >
                          <img
                            src={`data:image;base64,${food.fimg}`}
                            alt={food.fname}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                              {food.fname}
                            </h2>
                            <p className="text-gray-600 mb-2 text-sm">
                              {food.fdesc}
                            </p>
                            <p className="text-gray-900 font-bold">
                              ₹ {food.fprice}
                            </p>
                            <button
                              onClick={(e) => addToCart(food.id, e)}
                              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center col-span-full">No pizzas available</p>
                    )}
                  </div>
                </div>

                {/* Beverages Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Beverages</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupByType("Beverages").length > 0 ? (
                      groupByType("Beverages").map((food) => (
                        <div
                          key={food.id}
                          onClick={() => handleCardClick(food.id)}
                          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
                        >
                          <img
                            src={`data:image;base64,${food.fimg}`}
                            alt={food.fname}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                              {food.fname}
                            </h2>
                            <p className="text-gray-600 mb-2 text-sm">
                              {food.fdesc}
                            </p>
                            <p className="text-gray-900 font-bold">
                              ₹ {food.fprice}
                            </p>
                            <button
                              onClick={(e) => addToCart(food.id, e)}
                              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center col-span-full">No beverages available</p>
                    )}
                  </div>
                </div>

                {/* Desserts Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Desserts</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupByType("Desserts").length > 0 ? (
                      groupByType("Desserts").map((food) => (
                        <div
                          key={food.id}
                          onClick={() => handleCardClick(food.id)}
                          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
                        >
                          <img
                            src={`data:image;base64,${food.fimg}`}
                            alt={food.fname}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                              {food.fname}
                            </h2>
                            <p className="text-gray-600 mb-2 text-sm">
                              {food.fdesc}
                            </p>
                            <p className="text-gray-900 font-bold">
                              ₹ {food.fprice}
                            </p>
                            <button
                              onClick={(e) => addToCart(food.id, e)}
                              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center col-span-full">No desserts available</p>
                    )}
                  </div>
                </div>

                {/* Recommendations Section */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-4">Recommendations</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((food) => (
                      <div
                        key={food.id}
                        onClick={() => handleCardClick(food.id)}
                        className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-4 cursor-pointer"
                      >
                        <img
                          src={`data:image;base64,${food.fimg}`}
                          alt={food.fname}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="p-4">
                          <h2 className="text-xl font-semibold mb-2">
                            {food.fname}
                          </h2>
                          <p className="text-gray-600 mb-2 text-sm">{food.fdesc}</p>
                          <p className="text-gray-900 font-bold">₹ {food.fprice}</p>
                          <button
                            onClick={(e) => addToCart(food.id, e)}
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default CHomepage;