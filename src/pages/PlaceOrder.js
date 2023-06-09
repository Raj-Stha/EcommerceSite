import React from 'react'
import { useSelector } from 'react-redux'
import { baseURL } from '../constants/constant'
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../features/orderApi';

const PlaceOrder = () => {

  const { cartDetail, userDetail } = useSelector((store) => store.userInfo);
  const { state } = useLocation();
  const nav = useNavigate();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  return (
    <div className='grid grid-cols-4 p-7'>

      <div className='col-span-2'>
        <h1>Shipping</h1>
        <p className='py-2'>{userDetail.address.address}, {userDetail.address.city}</p>

        <h1 className='pb-4'>Order Items</h1>
        {cartDetail.map((cart) => {
          return <div key={cart.productID} className='flex items-center gap-5 mb-2'>

            <img className='h-[100px] w-[100px] object-cover' src={`${baseURL}${cart.productImage}`} alt="" />

            <h1>{cart.productName}</h1>
            <h1 className='text-gray-700'>{cart.quantity} x {cart.productPrice} &nbsp; = &nbsp; Rs.{cart.productPrice * cart.quantity}</h1>
          </div>
        })}

      </div>
      <div className='text-center'>
        <h1>Order Summary</h1>
        <h1>Total {state.totalAmount}</h1>
        <button onClick={async () => {
          try {
            const response = await createOrder({
              orderItems: cartDetail,
              totalPrice: Number(state.totalAmount),
              token: userDetail.token
            }).unwrap();
            console.log(response);
            if (response.status === 201) {
              toast.success('Products Purchase');
              nav('/', { replace: true });
            } else {
              toast.error(`${response.message}`);
            }

          } catch (err) {
            // toast.error(err.data.message);
          }


        }
        } className='my-2 bg-black p-2 text-white'>Palce an order</button>
      </div>

    </div>
  )
}

export default PlaceOrder