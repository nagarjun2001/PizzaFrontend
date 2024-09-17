import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ANav from '../Navbar/ANav';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';
import AdminNavbar from '../Navbar/AdminNavbar';

const ITEMS_PER_PAGE = 12;

function ManageFood() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:1234/food/all')
      .then(response => {
        setFoods(response.data);
        setFilteredFoods(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(foods.filter(food => food.ftype.toLowerCase() === filter.toLowerCase()));
    }
    setCurrentPage(1);
  }, [filter, foods]);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex items-center">
        <p className="mr-4">Are you sure you want to delete this food item?</p>
        <button
          onClick={() => {
            axios.delete(`http://localhost:1234/food/${id}`)
              .then(() => {
                toast.success('Food deleted successfully');
                setFoods(foods.filter(food => food.id !== id));
                setFilteredFoods(filteredFoods.filter(food => food.id !== id));
              })
              .catch(() => toast.error('Error deleting food'));
            toast.dismiss(t.id);
          }}
          className="shadow-lg bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="shadow-xl text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-200"
        >
          No
        </button>
      </div>
    ));
  };

  const handleUpdate = (id) => {
    navigate(`/updfood/${id}`);
  };

  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFoods = filteredFoods.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full"
          >
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-red-600 ml-4">Manage Food</h1>
        </div>
        <Link
          to='/addfood'
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
        >
          Add Food
        </Link>
        <div className="my-6">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-md px-4 py-2"
          >
            <option value="">All Types</option>
            <option value="Beverages">Beverages</option>
            <option value="Pizza">Pizza</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        <div className="flex flex-wrap -m-4 mt-6">
          {currentFoods.map(food => (
            <div key={food.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full group">
                <div className="relative group">
                  <img
                    src={`data:image;base64,${food.fimg}`}
                    alt={food.fname}
                    className="w-full h-32 object-cover object-center transition-transform transform group-hover:blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => handleUpdate(food.id)}
                        className="text-white hover:bg-black/80 p-3 rounded-full transition-colors mb-2"
                        aria-label="Update"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(food.id)}
                        className="text-white hover:bg-red-700 p-3 rounded-full transition-colors"
                        aria-label="Delete"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg text-black/80 title-font mb-2">{food.ftype}</h2>
                  <h2 className="text-lg text-gray-800 font-bold title-font mb-2">{food.fname}</h2>
                  <p className="text-base text-gray-600 mb-2 truncate">{food.fdesc}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-auto">₹{food.fprice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
            >
              &gt;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ManageFood;
