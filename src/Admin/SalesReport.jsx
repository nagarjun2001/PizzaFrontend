// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import { CSVLink } from "react-csv";

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const SalesReport = () => {
//   const [orders, setOrders] = useState([]);
//   const [chartData, setChartData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:1234/orders/all');
//         const data = response.data;
        
//         if (data && data.length > 0) {
//           const labels = data.map(order => order.orderdate);
//           const orderTotals = data.map(order => order.total);

//           setChartData({
//             labels: labels,
//             datasets: [{
//               label: 'Total amount of sales',
//               data: orderTotals,
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             }],
//           });
//         }

//         setOrders(data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const columns = [
//     { label: "Order ID", key: "id" },
//     { label: "Customer ID", key: "customer.id" },
//     { label: "Total", key: "total" },
//     { label: "Order Date", key: "orderdate" },
//     { label: "Delivery Status", key: "delstatus" },
//     { label: "Issue Status", key: "issuestatus" },
//   ];

//   const csvData = orders.map(order => ({
//     id: order.id,
//     customerId: order.customer?.id || 'N/A',
//     total: order.total,
//     orderdate: order.orderdate,
//     delstatus: order.delstatus,
//     issuestatus: order.issuestatus,
//   }));

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Sales Report</h1>

//       <div className="mb-6">
//         <Bar data={chartData} />
//       </div>

//       {/* <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Order History</h2>
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {columns.map(column => (
//                 <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {column.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {orders.map(order => (
//               <tr key={order.id}>
//                 {columns.map(column => (
//                   <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {column.key.split('.').reduce((o, i) => o ? o[i] : 'N/A', order)}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div>
//         <CSVLink data={csvData} headers={columns} filename="orders-report.csv">
//           <button className="px-4 py-2 bg-blue-500 text-white rounded">Export CSV</button>
//         </CSVLink>
//       </div> */}
//     </div>
//   );
// };

// export default SalesReport;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { CSVLink } from "react-csv";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const SalesReport = () => {
  const [orders, setOrders] = useState([]);
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:1234/orders/all');
        const data = response.data;
        
        if (data && data.length > 0) {
          const labels = data.map(order => order.orderdate);
          const orderTotals = data.map(order => order.total);

          const totalAmount = orderTotals.reduce((acc, curr) => acc + curr, 0);
          setTotalAmount(totalAmount);

          // Bar Chart Data
          setBarChartData({
            labels: labels,
            datasets: [{
              label: 'Total Amount of Sales',
              data: orderTotals,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });

          // Pie Chart Data
          const orderCounts = labels.reduce((acc, date) => {
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});
          
          setPieChartData({
            labels: Object.keys(orderCounts),
            datasets: [{
              data: Object.values(orderCounts),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }],
          });
        }

        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { label: "Order ID", key: "id" },
    { label: "Total", key: "total" },
    { label: "Order Date", key: "orderdate" },
    // { label: "Delivery Status", key: "delstatus" },
    // { label: "Issue Status", key: "issuestatus" },
  ];

  const csvData = orders.map(order => ({
    id: order.id,
    customerId: order.customer?.id || 'N/A',
    total: order.total,
    orderdate: order.orderdate,
    delstatus: order.delstatus,
    issuestatus: order.issuestatus,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Report</h1>

      <div className="mb-6 p-4 bg-white shadow-md rounded">
        <h2 className="text-xl font-semibold mb-2">Total Amount</h2>
        <p className="text-lg">₹ {totalAmount.toFixed(2)}</p>
      </div>

      {/* <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Sales Amount by Date</h2>
          <div style={{ width: '100%', height: '400px' }}>
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Order Counts by Date</h2>
          <div style={{ width: '100%', height: '400px' }}>
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div> */}

      <div>
        {/* <CSVLink data={csvData} headers={columns} filename="orders-report.csv">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Export CSV</button>
        </CSVLink> */}
      </div>
    </div>
  );
};

export default SalesReport;
