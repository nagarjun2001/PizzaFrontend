// import React, { useEffect, useState } from 'react';
// import StaffNavbar from '../Navbar/StaffNavbar';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const HomePage = () => {
//   const [orders, setOrders] = useState([]);
//   const [chartData, setChartData] = useState({});
//   const staffid = sessionStorage.getItem("staffId");

//   useEffect(() => {
//     // Fetch delivered orders by staff
//     fetch(`http://localhost:1234/orders/staff/${staffid}`)  // Replace with dynamic staff ID if needed
//       .then(response => response.json())
//       .then(data => {
//         setOrders(data);
//         prepareChartData(data);
//       });
//   }, []);

//   const prepareChartData = (orders) => {
//     const orderDates = orders.map(order => order.orderdate);
//     const orderTotals = orders.map(order => order.total);

//     setChartData({
//       labels: orderDates,
//       datasets: [
//         {
//           label: 'Order Totals',
//           data: orderTotals,
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//         },
//       ],
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <StaffNavbar />
//       <main className="flex-1 container mx-auto p-6">
//         <h2 className="text-3xl font-semibold text-gray-800">Welcome, Staff!</h2>
//         <p className="mt-4 text-gray-600">Manage your deliveries and keep track of orders efficiently!</p>
        
//         <div className="mt-6">
//           <h3 className="text-2xl font-semibold text-gray-800">Orders Overview</h3>
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: 'top',
//                 },
//                 tooltip: {
//                   callbacks: {
//                     label: function (tooltipItem) {
//                       return `Total: $${tooltipItem.raw}`;
//                     },
//                   },
//                 },
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Order Date',
//                   },
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'Total Amount',
//                   },
//                   beginAtZero: true,
//                 },
//               },
//             }}
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import StaffNavbar from '../Navbar/StaffNavbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});
  const [totalDeliveries, setTotalDeliveries] = useState(0); // Added state for total deliveries
  const staffId = sessionStorage.getItem("staffId");

  useEffect(() => {
    if (!staffId) {
      console.error('Staff ID is missing');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:1234/orders/staff/${staffId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setOrders(data);
          prepareChartData(data);
          preparePieData(data);
          setTotalDeliveries(data.length); // Set total deliveries
        } else {
          console.error('Expected an array of orders');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchOrders();
  }, [staffId]);

  const prepareChartData = (orders) => {
    if (!orders || !Array.isArray(orders)) {
      console.error('Invalid orders data');
      return;
    }

    // Extract order dates and totals
    const orderDates = orders.map(order => order.orderdate);
    const orderTotals = orders.map(order => order.total);

    // Prepare chart data
    setChartData({
      labels: orderDates,
      datasets: [
        {
          label: 'Order Totals',
          data: orderTotals,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const preparePieData = (orders) => {
    if (!orders || !Array.isArray(orders)) {
      console.error('Invalid orders data');
      return;
    }

    // Count orders by status
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.delstatus] = (acc[order.delstatus] || 0) + 1;
      return acc;
    }, {});

    // Prepare pie chart data
    setPieData({
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <StaffNavbar />
      <main className="flex-1 container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800"></h2>
        <p className="mt-4 text-gray-600">Manage your deliveries and keep track of orders efficiently!</p>

        {/* Total Deliveries Card */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Total Deliveries</h3>
          <p className="text-3xl font-bold text-gray-600">{totalDeliveries}</p>
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Total amount of sales</h3>
            {Object.keys(chartData).length > 0 && (
              <div style={{ height: '300px', width: '100%' }}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Orders Overview',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `Total: $${context.raw}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Delivery Status Distribution</h3>
            {Object.keys(pieData).length > 0 && (
              <div style={{ height: '300px', width: '100%' }}>
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Status Distribution',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.label}: ${context.raw}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
