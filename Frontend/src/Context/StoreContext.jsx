import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    let url = import.meta.env.VITE_BASE_URL;
    const [cartItem, setcartItem] = useState({})
    const [token, setToken] = useState("")
    const [food_list, setfood_list] = useState([])

    const addToCart = async (itemID) => {
        if (!cartItem[itemID]) {
            setcartItem(prev => ({ ...prev, [itemID]: 1 }))
        }
        else {
            setcartItem(prev => ({ ...prev, [itemID]: prev[itemID] + 1 }))
        }
        await axios.post(url + "/api/cart/add", { itemID }, { headers: { token } })
    }

    const removeFromCart = async (itemID) => {
        setcartItem(prev => ({ ...prev, [itemID]: prev[itemID] - 1 }))
        await axios.post(url + "/api/cart/remove", { itemID }, { headers: { token } })
    }

    const getFoodData = async () => {
        await axios.get(url + "/api/food/list")
            .then(result => {
                if (result.data.success) {
                    setfood_list(result.data.data)
                }
                else {
                    console.log(result.data.message)
                }
            })
    }

    const loadCartData = async () => {
        const token = localStorage.getItem("token");

        if (!token) return console.warn("No token found. Please log in.");

        try {
            const res = await axios.post(
                `${url}/api/cart/getcart`,
                {},
                {
                    headers: { token }, // ✅ Send token in headers
                }
            );
            setcartItem(res.data.data);
        } catch (err) {
            console.error("getCart error:", err.response?.data || err.message);
        }
    };

    const placeOrder = async (addressData) => {
        try {
            const res = await axios.post(`${url}/api/order/place`, {
                items: cartItem,
                address: addressData,
                amount: getTotalAmount() + 2
            }, {
                headers: { token }
            });

            if (res.data.success) {
                alert("Order placed successfully!");
                setcartItem({});
            } else {
                alert("Order failed: " + res.data.message);
            }
        } catch (err) {
            console.error("Place order error:", err);
            alert("An error occurred while placing the order.");
        }
    };


    const getUserOrders = async () => {
        try {
            let token = localStorage.getItem("token");
            const res = await axios.get(`${url}/api/order/user`, {
                headers: { token },
            });
            if (res.data.success) {
                return res.data.data;
            }
            return [];
        } catch (err) {
            console.error("getUserOrders error:", err.response?.data || err.message);
            return [];
        }
    };

    const clearCart = async () => {
        setcartItem({}); // Clear local cart
        try {
            await axios.post(`${url}/api/cart/clear`, {}, {
                headers: { token }
            });
        } catch (err) {
            console.error("Clear cart error:", err.response?.data || err.message);
        }
    };


    const getTotalAmount = () => {
        let total = 0;
        for (let id in cartItem) {
            const item = food_list.find(food => food._id === id); // ✅ fix here
            if (item) {
                total += item.price * cartItem[id];
            }
        }
        return total;
    };



    useEffect(() => {

        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getFoodData();
            loadCartData();
        }
    }, [])


    const contextValue = {
        food_list,
        cartItem,
        setcartItem,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        token,
        placeOrder,
        getUserOrders,
        clearCart,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;