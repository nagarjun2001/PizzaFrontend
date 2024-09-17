import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { useParams, Link } from 'react-router-dom';
import UNav from '../Navbar/UNav';

function ProductsByType() {
  const { type } = useParams();
  const [foodData, setFoodData] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get("http://localhost:1234/food/all")
      .then((res) => {
        const filtered = res.data.filter(food => food.ftype.toLowerCase() === type.toLowerCase());
        setFoodData(filtered);
        setFilteredFoods(filtered);
      })
      .catch(err => console.error(err));
  }, [type]);

  useEffect(() => {
    let filtered = foodData;

    if (priceRange !== 'all') {
      filtered = filtered.filter(food => {
        const price = parseFloat(food.fprice);
        return priceRange === 'low' ? price < 100 : price >= 100;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(food => food.fname.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredFoods(filtered);
  }, [priceRange, searchQuery, foodData]);

  return (
    <>
      <UNav />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto flex">
          <aside className="w-1/4 bg-white shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Search</h3>
              <div className="flex items-center border rounded-md p-2">
                <MdSearch size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 w-full outline-none"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <button
                onClick={() => setPriceRange(priceRange === 'all' ? 'low' : (priceRange === 'low' ? 'high' : 'all'))}
                className={`block p-2 rounded-md ${priceRange === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {priceRange === 'all' ? 'All Prices' : priceRange === 'low' ? 'Below 100' : 'Above 100'}
              </button>
            </div>
          </aside>

          <main className="w-3/4 p-6">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Products - {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFoods.map(food => (
                <Link key={food.id} to={`/product/${food.id}`} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group">
                  <img src={`data:image;base64,${food.fimg}`} alt={food.fname} className="w-full h-40 object-cover group-hover:opacity-75 transition-opacity" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold text-gray-800">{food.fname}</h2>
                    <p className="text-sm text-gray-600 truncate">{food.fdesc}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">₹{food.fprice}</p>
                  </div>
                  <div className="p-4 flex justify-between items-center bg-gray-100">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Add to Cart</button>
                    <FaStar size={20} className="text-yellow-400" />
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ProductsByType;
