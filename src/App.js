import { Route, Routes } from 'react-router';
import './App.css';
import RootLayout from './components/RootLayout'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoute from './middleware/AuthRoute';
import AddProudct from './pages/AddProudct';
import AdminProductList from './pages/AdminProductList';
import UpdateProduct from './pages/UpdateProduct';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Shipping from './pages/Homepage/Shipping';
import PlaceOrder from './pages/PlaceOrder';



function App() {
  return (
    < >
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route element={<AuthRoute />}>
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='/add-product' element={<AddProudct />} />
          <Route path='/products' element={<AdminProductList />} />
          <Route path='/update-product/:id' element={<UpdateProduct />} />

          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='/shipping' element={<Shipping
          />} />
          <Route path='/placeorder' element={<PlaceOrder />} />

        </Route>
      </Routes>
      <ToastContainer position="top-right"
        autoClose={5000} />
    </>
  );
}

export default App;
