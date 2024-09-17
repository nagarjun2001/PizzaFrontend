import axios from "axios";

const base_url = "http://localhost:1234";

const api = axios.create({
    baseURL: base_url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const adminApi = {
    login: (adminData) => api.post("/admin/login",adminData)
};

export const customerApi = {
    register: (customerData) => api.post("/customer",customerData),
    verifyOtp: (otpverification) => api.post("/customer/verifyotp",otpverification),
    updatepwd: (pwdupdate) => api.post("/customer/updatepwd",pwdupdate),
    login: (logindata) => api.post("/customer/login",logindata)

};

export const handleApiError = (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received', error.request);
    } else {
      console.error('API Error:', error.message);
    }
  };