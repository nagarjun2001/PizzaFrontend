import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import UNav from '../Navbar/UNav';
import { FaArrowLeft } from 'react-icons/fa';
import AdminNavbar from '../Navbar/AdminNavbar';

function UpdateFood() {
  const { id } = useParams();
  const [fooddata, setFooddata] = useState({
    fname: "",
    fdesc: "",
    fprice: "",
    ftype: "",
    fimg: null,
  });
  const [isloading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching food data for ID:", id);
    axios.get(`http://localhost:1234/food/${id}`)
      .then((res) => {
        setFooddata(res.data);
        setImagePreview(`data:image;base64,${res.data.fimg}`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching food data");
      });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!fooddata.fname) newErrors.fname = "Food name is required.";
    if (!fooddata.fdesc) newErrors.fdesc = "Description is required.";
    if (!fooddata.fprice || isNaN(fooddata.fprice)) newErrors.fprice = "Valid price is required.";
    if (!fooddata.ftype) newErrors.ftype = "Food type is required.";
    if (!fooddata.fimg && !imagePreview) newErrors.fimg = "Image upload is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    if (!validateForm()) return;

    setIsloading(true);
    const formData = new FormData();
    formData.append("fname", fooddata.fname);
    formData.append("fdesc", fooddata.fdesc);
    formData.append("fprice", parseFloat(fooddata.fprice));
    formData.append("ftype", fooddata.ftype);
    if (fooddata.fimg) formData.append("fimg", fooddata.fimg);

    axios.put(`http://localhost:1234/food/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
        console.log(res.data);
      setIsloading(false);
      toast.success("Updated Successfully.");
      navigate("/managefood");
    })
    .catch(() => {
      setIsloading(false);
      toast.error("Error updating Food Data");
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "fimg") {
      const file = e.target.files[0];
      setFooddata({ ...fooddata, fimg: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!fooddata) return <div>No data available</div>;

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center justify-center p-14">
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md border border-gray-300">
          <div className="flex items-center mb-6">
            <button
              onClick={handleGoBack}
              className="text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full"
            >
              <FaArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-red-600 ml-4">Update Food Data</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2 text-sm font-medium">
                Upload Food Image
              </label>
              <div className="relative rounded-lg hover:bg-gray-200 border-solid w-full max-w-sm">
                <input
                  type="file"
                  name="fimg"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-full h-60 border hover:bg-black/80 border-dashed border-black/80 rounded-md flex items-center justify-center text-gray-500">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-md"
                    />
                  ) : (
                    <p className="text-center">Drag & drop an image or click to select</p>
                  )}
                </div>
              </div>
              {errors.fimg && <p className="text-red-500 text-sm mt-2">{errors.fimg}</p>}
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Food Name
                  </label>
                  <input
                    type="text"
                    value={fooddata.fname}
                    onChange={(e) =>
                      setFooddata({ ...fooddata, fname: e.target.value })
                    }
                    className={`w-full px-4 py-2 border ${errors.fname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500`}
                  />
                  {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Food Type
                  </label>
                  <select
                    value={fooddata.ftype}
                    onChange={(e) =>
                      setFooddata({ ...fooddata, ftype: e.target.value })
                    }
                    className={`w-full px-4 py-2 border ${errors.ftype ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500`}
                  >
                    <option value="">Select Food Type</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                  {errors.ftype && <p className="text-red-500 text-sm">{errors.ftype}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={fooddata.fprice}
                    onChange={(e) =>
                      setFooddata({ ...fooddata, fprice: e.target.value })
                    }
                    className={`w-full px-4 py-2 border ${errors.fprice ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500`}
                  />
                  {errors.fprice && <p className="text-red-500 text-sm">{errors.fprice}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    value={fooddata.fdesc}
                    onChange={(e) =>
                      setFooddata({ ...fooddata, fdesc: e.target.value })
                    }
                    className={`w-full px-4 py-2 border ${errors.fdesc ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500`}
                    rows="1"
                  />
                  {errors.fdesc && <p className="text-red-500 text-sm">{errors.fdesc}</p>}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleUpload}
                  className={`bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors ${isloading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isloading}
                >
                  {isloading ? "Uploading..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateFood;
