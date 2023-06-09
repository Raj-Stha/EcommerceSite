
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../constants/constant';
import React, { useState } from 'react'
import { deleteCartItem, updateCart } from '../features/userSlice';
import { useNavigate } from 'react-router';
const Cart = () => {

  const userDetail = useSelector((store) => store.userInfo.userDetail);
  const nav = useNavigate();

  const cartData = useSelector((store) => store.userInfo.cartDetail);
  let totalAmount;
  const dispatch = useDispatch();

  const totalProdPrice = () => {
    totalAmount = cartData.reduce((start, current) => {
      let total = current.productPrice * current.quantity
      return start + total;
    }, 0);
  }

  totalProdPrice();

  if (totalAmount === 0 || cartData.length === 0) {
    return (
      <div className=" text-center pt-[15%] text-2xl">
        <h3 >Card is Empty</h3>
      </div>
    )
  }

  return (
    <div className='flex px-5 py-5  '>
      <div className="w-[50%]">
        <h2>Shopping Cart</h2>
        {cartData.map((data, index) => {
          return (
            <div className="mb-2 " key={index}>
              <div className="flex  justify-between  items-center px-5">
                <div className="w-[150px] h-[100px]">
                  <img src={` ${baseURL}${data.productImage}`} alt="" className="w-[100%] h-[100%] object-cover" />
                </div>
                <h2>{data.productName}</h2>
                <h3>{data.productPrice}</h3>

                <div className="">
                  <i className="fa-sharp fa-solid fa-trash" onClick={() => {

                    dispatch(deleteCartItem(data.productID));

                  }}></i>
                </div>
                <select name="qty" id="qty" defaultValue={data.quantity} className='text-center bg-gray-200 px-4 ' onChange={(e) => {

                  const productDetails = {
                    productID: data.productID,
                    productName: data.productName,
                    productImage: data.productImage,
                    categories: data.categories,
                    brand: data.brand,
                    productPrice: data.productPrice,
                    stock: data.stock,
                    quantity: e.target.value
                  }

                  dispatch(updateCart(productDetails));
                }} >

                  {[...Array(data.stock).keys()].map((data) => {
                    return (
                      <option key={`${data + 1}`} value={`${data + 1}`} > {data + 1}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          )
        })}

      </div>

      <div className="w-[50%] text-end  ">
        <h2 className=' '>Total Amount</h2>
        <h3>{totalAmount}</h3>


        <div className="">
          {totalAmount !== 0 && cartData.length !== 0 && <button className=' col-span-2 bg-blue-gray-500 text-white  px-6 py-2 rounded-md hover:bg-blue-gray-700' onClick={() => {

            userDetail.address.isEmpty ? nav('/shipping') :
              nav('/placeorder', { state: { totalAmount } })

          }}>Proceed to Checkout</button>}

        </div>

      </div>
    </div>
  )
}

export default Cart