import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Navbar/AdminNavbar';

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [status, setStatus] = useState('');
    const cartId = sessionStorage.getItem('cartId');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/carthistory/cart/${cartId}`);
                setOrderDetails(response.data);
                const statusResponse = await axios.get(`http://localhost:1234/deliverystatus/status/${cartId}`);
                setStatus(statusResponse.data.status);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [cartId]);

    const handleStatusChange = async (newStatus) => {
        try {
            await axios.put('http://localhost:1234/api/delivery/updateStatus', {
                cartId,
                foodId: orderDetails[0]?.foodId,
                status: newStatus,
            });
            setStatus(newStatus);
        } catch (error) {
            console.error('Error updating delivery status:', error);
        }
    };

    return (
        <><AdminNavbar /><div>
            <h1>Order Details</h1>
            <ul>
                {orderDetails.map((item) => (
                    <li key={item.id}>
                        Food ID: {item.foodId} | Quantity: {item.qty} | Total: ${item.total}
                    </li>
                ))}
            </ul>
            <h2>Current Status: {status}</h2>
            <button onClick={() => handleStatusChange('In Transit')}>Mark as In Transit</button>
            <button onClick={() => handleStatusChange('Delivered')}>Mark as Delivered</button>
        </div></>
    );
};

export default OrderDetails;
