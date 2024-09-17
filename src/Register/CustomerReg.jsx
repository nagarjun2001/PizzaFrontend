import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { customerApi } from '../services/api';
import UserRegNav from '../Navbar/UserRegNav';

const CustomerReg = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    uname: '',
    email: '',
    mobno: '',
    address: '',
  });
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [addressValid, setAddressValid] = useState(true);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const checkEmailExists = async (email) => {
    try {
      const response = await customerApi.checkEmail({ email });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email existence:', error);
      toast.error('Error checking email existence.');
      return false;
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!formData.fname || !formData.lname || !formData.uname || !formData.email || !formData.mobno || !formData.address) {
        toast.error('All fields are required.');
        return;
      }

      setIsLoading(true);

      try {
        const response = await customerApi.register(formData);
        if (response.data === 'Email already exists.') {
          toast.error('Email already exists.');
        } else if (response.data === 'Success') {
          setStep(2);
        } else {
          toast.error('Registration failed.');
        }
      } catch (error) {
        toast.error('Registration failed.');
      } finally {
        setIsLoading(false);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleOtpChange = (e) => {
    const { value, dataset } = e.target;
    const index = parseInt(dataset.index, 10);

    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (e.key === 'Backspace' && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpKeyDown = (e) => {
    if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const handleOtpFocus = (e) => {
    e.target.select();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (!/^[0-9]{6}$/.test(text)) return;
    setOtp(text.split(''));
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const otpCode = otp.join('');
  
    try {
      const response = await customerApi.verifyOtp({ email: formData.email, otp: otpCode });
  
      if (response.data === 'OTP Verified') {
        toast.success('OTP verified successfully.');
        setStep(3); // Move to the password update step
      } else {
        toast.error(response.data); // Display error message from backend
      }
    } catch (error) {
      toast.error('An error occurred during OTP verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await customerApi.updatepwd({ email: formData.email, password });
      toast.success('Account created successfully.');
      navigate("/custlogin");
    } catch (error) {
      toast.error('Password update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddress = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            addressdetails: 1,
          },
        });
        if (response.data.length > 0) {
          setFormData({ ...formData, address: response.data[0].display_name });
          setAddressValid(true);
        } else {
          toast.error('Address not found.');
          setAddressValid(false);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        toast.error('Error fetching address.');
        setAddressValid(false);
      }
    } else {
      setAddressValid(true);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
              params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
                addressdetails: 1,
              },
            });
  
            if (response.data && response.data.display_name) {
              setFormData({ ...formData, address: response.data.display_name });
              setAddressValid(true);
            } else {
              toast.error('Unable to retrieve address details.');
              setAddressValid(false);
            }
          } catch (error) {
            console.error('Error fetching address from coordinates:', error);
            toast.error('Error fetching address from coordinates.');
            setAddressValid(false);
          }
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Geolocation permission denied. Please allow location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'The request to get user location timed out.';
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = 'An unknown error occurred.';
              break;
            default:
              errorMessage = 'An error occurred while retrieving location.';
              break;
          }
          console.error('Geolocation error:', error);
          toast.error(errorMessage);
        },
        {
          timeout: 10000,
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <UserRegNav />
      <div className="relative min-h-screen flex flex-col p-6 bg-cover bg-center" style={{ backgroundImage: "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3JtNjg4YmF0Y2gyLXJlbWl4LXRhLTAwNS5qcGc.jpg')" }}>
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="flex-1 mt-6 flex items-center justify-center relative z-10">
          <div className="bg-white mt-6 p-8 rounded-lg shadow-lg w-full max-w-3xl">
            {/* Stepper Navigation */}
            <div className="flex justify-between mb-6">
              <button
                onClick={() => setStep(1)}
                className={`py-2 px-4 ${step === 1 ? 'bg-red-600 text-white' : 'bg-gray-200'} rounded-md transition-colors duration-300`}
                disabled={step === 1}
              >
                Basic Details
              </button>
              <button
                onClick={() => setStep(2)}
                className={`py-2 px-4 ${step === 2 ? 'bg-red-600 text-white' : 'bg-gray-200'} rounded-md transition-colors duration-300`}
                disabled={step === 2 || step === 1}
              >
                Verify OTP
              </button>
              <button
                onClick={() => setStep(3)}
                className={`py-2 px-4 ${step === 3 ? 'bg-red-600 text-white' : 'bg-gray-200'} rounded-md transition-colors duration-300`}
                disabled={step === 3 || step < 3}
              >
                Update Password
              </button>
            </div>

            {/* Display loader */}
            {isLoading && (
              <div className="flex justify-center items-center mb-4">
                <div className="w-8 h-8 border-4 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
              </div>
            )}

            {/* Step 1: Basic Details Form */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Customer Registration</h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                      placeholder="First Name"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" />
                    <input
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                      placeholder="Last Name"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" />
                    <input
                      type="text"
                      name="uname"
                      value={formData.uname}
                      onChange={(e) => setFormData({ ...formData, uname: e.target.value })}
                      placeholder="Username"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" />
                    <input
                      type="text"
                      name="mobno"
                      value={formData.mobno}
                      onChange={(e) => setFormData({ ...formData, mobno: e.target.value })}
                      placeholder="Mobile Number"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" />
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          fetchAddress(e.target.value);
                        }}
                        placeholder="Address"
                        className={`p-3 border ${addressValid ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-600`} />
                      <FaMapMarkerAlt
                        onClick={handleGetLocation}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="mt-6 py-2 px-4 bg-red-600 text-white rounded-md focus:outline-none hover:bg-red-700 transition-colors duration-300"
                  >
                    {isLoading ? 'Processing...' : 'Next'}
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
                <form onSubmit={handleOtpSubmit}>
                  <div className="flex gap-2 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={handleOtpChange}
                        onKeyDown={handleOtpKeyDown}
                        onFocus={handleOtpFocus}
                        onPaste={handleOtpPaste}
                        data-index={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-red-600 text-white rounded-md focus:outline-none hover:bg-red-700 transition-colors duration-300"
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Update Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-6" />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-red-600 text-white rounded-md focus:outline-none hover:bg-red-700 transition-colors duration-300"
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerReg;
