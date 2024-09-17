// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Footer from './Footer';
// import HomeNavbar from '../Navbar/HomeNavbar';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Homepage = () => {
//   const [foods, setFoods] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('All');
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:1234/food/all')
//       .then(response => setFoods(response.data))
//       .catch(error => console.error('Error fetching food items:', error));
//   }, []);

//   const handleAddToCart = (foodId) => {
//     const custId = sessionStorage.getItem('custId');
//     if (!custId) {
//       navigate('/login');
//       return;
//     }
//     // Logic to add food to the cart
//     console.log(`Adding food with id ${foodId} to the cart.`);
//   };

//   const filteredFoods = foods.filter(food =>
//     (filter === 'All' || food.ftype === filter) &&
//     food.fname.toLowerCase().includes(search.toLowerCase())
//   );

//   // Carousel settings for header
//   const carouselSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//   };

//   return (
//     <>
//       <HomeNavbar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
//       <div className="container mx-auto px-4 py-6">

//         {/* Header Carousel Section */}
//         <section className="relative my-6">
//           <Slider {...carouselSettings} className="rounded-lg">
//             <div className="relative">
//               <img
//                 src="https://elpollonorteno.net/wp-content/uploads/ELPOLLONORTENO020520-1300x650.jpg"
//                 alt="Carousel Image 1"
//                 className="w-full h-72 object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//                 <div className="text-center text-white">
//                   <h1 className="text-4xl font-bold mb-4">Welcome to Our New Location!</h1>
//                   <p className="text-lg mb-6">Experience our delicious pizzas at our brand new place. Come visit us and enjoy special offers!</p>
//                   <button
//                     onClick={() => navigate('/custlogin')}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
//                   >
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <img
//                 src="https://watermark.lovepik.com/photo/20211123/large/lovepik-vegetable-pizza-picture_500817485.jpg"
//                 alt="Carousel Image 2"
//                 className="w-full h-72 object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//                 <div className="text-center text-white">
//                   <h1 className="text-4xl font-bold mb-4">Delicious Pizzas Await!</h1>
//                   <p className="text-lg mb-6">Discover our wide range of pizzas made with the freshest ingredients.</p>
//                   <button
//                     onClick={() => navigate('/custlogin')}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
//                   >
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <img
//                 src="https://t4.ftcdn.net/jpg/07/34/49/81/240_F_734498147_K79UMuj4XcYNIfYQmzZwoh4rJYBNHYCB.jpg"
//                 alt="Carousel Image 3"
//                 className="w-full h-72 object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//                 <div className="text-center text-white">
//                   <h1 className="text-4xl font-bold mb-4">Join Us for a Pizza Feast!</h1>
//                   <p className="text-lg mb-6">Explore our menu and take advantage of our ongoing specials.</p>
//                   <button
//                     onClick={() => navigate('/custlogin')}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
//                   >
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Slider>
//         </section>

//         {/* Search and Filter Section */}
//         <section className="my-6 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="relative w-full md:w-1/2">
//             <input
//               type="text"
//               placeholder="Search for pizzas..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mt-4 md:mt-0 w-full md:w-1/4">
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
//             >
//               <option value="All">All Categories</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Desserts">Desserts</option>
//               <option value="Beverages">Beverages</option>
//             </select>
//           </div>
//         </section>

//         {/* Featured Items Section */}
//         <section className="my-8">
//           <h2 className="text-xl font-semibold mb-4 text-start">Explore Our Dishes</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {filteredFoods.slice(0, 6).map(food => (
//               <div key={food.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
//                 <img
//                   src={`data:image/jpeg;base64,${food.fimg}`}
//                   alt={food.fname}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{food.fname}</h3>
//                   <p className="text-gray-600 text-sm">{food.fdesc}</p>
//                   <p className="text-red-500 font-bold mt-2">₹{food.fprice.toFixed(2)}</p>
//                   <button
//                     onClick={() => handleAddToCart(food.id)}
//                     className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Special Offers Section */}
//         <section className="my-8">
//           <h2 className="text-2xl font-semibold mb-4 text-center">Special Offers</h2>
//           <div className="bg-red-600 text-white p-6 rounded-lg text-center">
//             <h3 className="text-xl font-bold mb-2">Buy One Get One Free</h3>
//             <p className="mb-4">Order any large pizza and get another one free! Limited time offer.</p>
//             <button
//               onClick={() => navigate('/order')}
//               className="bg-white text-red-600 font-bold py-2 px-4 rounded-lg transition-colors"
//             >
//               Order Now
//             </button>
//           </div>
//         </section>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Homepage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import HomeNavbar from '../Navbar/HomeNavbar';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactSlider from 'react-slider';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility reasons

const Homepage = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Adjust maxPrice as needed
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:1234/food/all')
      .then(response => setFoods(response.data))
      .catch(error => console.error('Error fetching food items:', error));
  }, []);

  const handleAddToCart = (foodId) => {
    const custId = sessionStorage.getItem('custId');
    if (!custId) {
      navigate('/custlogin');
      return;
    }
    // Logic to add food to the cart
    console.log(`Adding food with id ${foodId} to the cart.`);
  };

  const filteredFoods = foods.filter(food =>
    (filter === 'All' || food.ftype === filter) &&
    food.fname.toLowerCase().includes(search.toLowerCase()) &&
    food.fprice >= priceRange[0] &&
    food.fprice <= priceRange[1]
  );

  // Carousel settings for header
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <HomeNavbar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <div className="container mx-auto px-4 py-6">

        {/* Header Carousel Section */}
        <section className="relative my-6">
          <Slider {...carouselSettings} className="rounded-lg">
            <div className="relative">
              <img
                src="https://elpollonorteno.net/wp-content/uploads/ELPOLLONORTENO020520-1300x650.jpg"
                alt="Carousel Image 1"
                className="w-full h-72 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">Welcome to Our New Location!</h1>
                  <p className="text-lg mb-6">Experience our delicious pizzas at our brand new place. Come visit us and enjoy special offers!</p>
                  <button
                    onClick={() => navigate('/custlogin')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://watermark.lovepik.com/photo/20211123/large/lovepik-vegetable-pizza-picture_500817485.jpg"
                alt="Carousel Image 2"
                className="w-full h-72 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">Delicious Pizzas Await!</h1>
                  <p className="text-lg mb-6">Discover our wide range of pizzas made with the freshest ingredients.</p>
                  <button
                    onClick={() => navigate('/custlogin')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://t4.ftcdn.net/jpg/07/34/49/81/240_F_734498147_K79UMuj4XcYNIfYQmzZwoh4rJYBNHYCB.jpg"
                alt="Carousel Image 3"
                className="w-full h-72 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">Join Us for a Pizza Feast!</h1>
                  <p className="text-lg mb-6">Explore our menu and take advantage of our ongoing specials.</p>
                  <button
                    onClick={() => navigate('/custlogin')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </Slider>
        </section>

        {/* Search, Filter, and Price Range Section */}
        <section className="my-6 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/3 flex justify-center">
            <input
              type="text"
              placeholder="Search for pizzas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            >
              <option value="All">All Categories</option>
              <option value="Pizza">Pizza</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <button
              onClick={() => setModalIsOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Filter by Price
            </button>
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="my-8">
          <h2 className="text-xl font-semibold mb-4 text-start">Explore Our Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredFoods.slice(0, 6).map(food => (
              <div key={food.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={`data:image/jpeg;base64,${food.fimg}`}
                  alt={food.fname}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{food.fname}</h3>
                  <p className="text-gray-600 text-sm">{food.fdesc}</p>
                  <p className="text-red-500 font-bold mt-2">₹{food.fprice.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(food.id)}
                    className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Special Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://img.freepik.com/premium-photo/two-slices-cheese-pizza-red-background_14117-871827.jpg"
                alt="Special Offer 1"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-bold mb-2">Buy One Get One Free</h3>
                <p className="text-sm mb-4">Order any large pizza and get another one free! Limited time offer.</p>
                <button
                  onClick={() => navigate('/order')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Order Now
                </button>
              </div>
            </div>
            <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://us.gozney.com/cdn/shop/articles/Gluten_Free_Pizza_Adam_Atkins.jpg?v=1680121478"
                alt="Special Offer 2"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-bold mb-2">Free Delivery on Orders Over ₹500</h3>
                <p className="text-sm mb-4">Enjoy free delivery on all orders above ₹500. No delivery charges!</p>
                <button
                  onClick={() => navigate('/order')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Order Now
                </button>
              </div>
            </div>
            <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://t4.ftcdn.net/jpg/07/34/48/93/360_F_734489356_FYG1xdBwzvRFYdbuPz9e5JMrMTvF2Zxc.jpg"
                alt="Special Offer 3"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-bold mb-2">20% Off on Your First Order</h3>
                <p className="text-sm mb-4">Get a 20% discount on your first order. Use code: FIRST20 at checkout.</p>
                <button
                  onClick={() => navigate('/custlogin')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Price Range Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Price Range Filter"
          className="bg-white p-6 rounded-lg max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Filter by Price</h2>
          <div className="mb-6">
            <ReactSlider
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={1000} // Adjust maxPrice as needed
              step={10}
              className="relative flex items-center"
              thumbClassName="absolute w-6 h-6 bg-red-600 rounded-full cursor-pointer"
              trackClassName="absolute w-full h-2 bg-gray-300"
              minDistance={10}
            />
            <div className="flex justify-between mt-4 text-gray-700">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Apply
          </button>
        </Modal>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;
