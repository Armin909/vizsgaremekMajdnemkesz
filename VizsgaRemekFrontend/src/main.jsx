import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Register from './Register.jsx'
import App from './App.jsx'
import Create from './Create.jsx'
import LogIn from './LogIn.jsx'
import Restaurant from './Restaurant.jsx'
import Reviews from './Reviews.jsx'
import Cart from './Cart.jsx'
import UserClaim from './UserClaim.jsx';
import ReviewForm from './Components/ReviewForm.jsx';
import { CartProvider } from './CartItems.jsx';
import Payment from './Payment.jsx';
import FoodForm from './Components/FoodForm.jsx';
import RestaurantEdit from './Components/RestaurantEdit.jsx';
import FoodEdit from './Components/FoodEdit.jsx';

const orederList=[];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <UserClaim>
          <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<App />} />
          <Route path="/create" element={<Create />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editRestaurant/:id" element={<RestaurantEdit />} />
          <Route path="/rendel/:id" element={<Restaurant />} />
          <Route path="/reviews/:id" element={<Reviews />} />
          <Route path="/reviewcreate/:id" element={<ReviewForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userclaim" element={<UserClaim />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/foodcreate/:id" element={<FoodForm />} />
          <Route path="/foodedit/:id" element={<FoodEdit />} />
        </Routes>
        </UserClaim>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)