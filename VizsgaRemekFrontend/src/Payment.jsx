import { CartContext } from "./CartItems";
import { use, useContext } from "react";
import { data, useNavigate } from 'react-router-dom';



const Payment = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    const navigate = useNavigate();
   
    
    const handlePayment = async () => {
        const response = await fetch("http://localhost:3000/api/Orders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
            
        });
        const data=await response.json();

        const orderPaying=async()=>{
            try {
                const pay = await fetch(`http://localhost:3000/api/Orders/${data[0].publicId}/checkout?pointsToUse=0`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    //body: JSON.stringify([{ "foodpublicId": `${response.publicId}`, "pointsToUse":0 }])
                    
                });
                alert("Sikeres fizetés!");
                setCartItems([]);
                //navigate('/');
            } catch (error) {
                console.error("Payment error:", error);
        
            }    
        }
        orderPaying();
    }

    return (
        <div>
            <h2>Payment</h2>
            <button onClick={() => navigate(-1)}>Vissza</button>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>{item.name} - {item.price.toFixed(2)}Ft </li>
                ))}
            </ul>
            <p>Total Price: {totalPrice.toFixed(2)} Ft</p>
            <button onClick={handlePayment}>Fizetés</button>
        </div>
    );
}

export default Payment;