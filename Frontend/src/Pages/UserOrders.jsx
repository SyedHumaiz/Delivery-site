import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const UserOrders = () => {
  const { getUserOrders } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getUserOrders();
      setOrders(data);
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {!orders || orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border p-4 mb-3 rounded shadow">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ${order.amount}</p>
            <p><b>Date:</b> {new Date(order.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
