import React from 'react';
import toast from 'react-hot-toast';

const RazorpayCheckout = () => {
  const handlePayment = () => {
    const options = {
      key: 'rzp_test_6BuISsgqJKKNuq',
      amount: '1',
      currency: 'INR',
      name: 'PizzaMan',
      description: 'Pizza Shop',
      image: 'https://yourdomain.com/your_logo.png',
      handler: function (response) {
        toast.success('Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Nagarjun N S',
        email: 'nagarjunns250701@gmail.com',
        contact: '6379414314',
      },
      notes: {
        address: '102, Munichalai Road, Madurai-9',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayCheckout;
