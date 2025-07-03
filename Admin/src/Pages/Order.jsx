import React, { useEffect, useState } from "react";
import axios from "axios";

const AllOrders = ({ baseUrl }) => {
  const [orders, setOrders] = useState([]);




  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      setOrders(res.data.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.post(`${baseUrl}/api/order/update`, { orderId, status: newStatus });
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Amount:</b> ${order.amount}</p>
            <p><b>Status:</b></p>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="border rounded p-1 mt-1 mb-3"
            >
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
            </select>
            <p><b>Date:</b> {new Date(order.date).toLocaleString()}</p>
            <p><b>Address:</b> {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}`}</p>
            <hr className="my-3" />
            <p><b>Items:</b></p>
            <ul className="list-disc ml-5">
              {Object.entries(order.items).map(([itemId, quantity]) => (
                <li key={itemId}>Item ID: {itemId}, Quantity: {quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AllOrders;
