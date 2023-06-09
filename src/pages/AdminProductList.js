import React from 'react'
import { useNavigate } from 'react-router'
import { useGetAllProductQuery } from '../features/productApi';
import { baseURL } from "../constants/constant";
import { useState } from "react";
import Popup from '../components/Popup';

const AdminProductList = () => {
  const { data, isLoading } = useGetAllProductQuery();
  const nav = useNavigate();
  const [popup, setPopUp] = useState(false);
  const [prodDetail, setDetail] = useState({});

  if (isLoading) {
    return (
      <div className='w-[120px] mt-[12%] mx-auto'>
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_p8bfn5to.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
    )
  }


  return (
    <div className='px-5 mx-5  py-5'>
      {popup && <Popup setPopup={setPopUp} popup={popup} prodDetail={prodDetail} />}
      <div className="flex justify-between items-center">
        <div className="text-xl ">Product Lists</div>

        <div className="">
          <button className='px-5 bg-blue-gray-500 py-2 rounded-sm text-white hover:bg-blue-gray-700' onClick={() => nav('/add-product')}>Add Product </button>
        </div>
      </div>
      <div className="space-y-6 w-[50%] pt-4  ">
        {data?.products.map((product, index) => {
          return (
            <div className="" key={index}>


              <div key={index} className=" rounded-lg overflow-hidden  flex  items-center justify-between pr-5  ">

                <div className="w-[25%]  shadow-blue-gray-200 shadow-2xl overflow-hidden  h-[110px] ">
                  <img src={` ${baseURL}${product?.productImage}`} alt="" className="w-[100%] h-[100%] object-cover" />
                </div>
                <div className="w-[60%] px-2" >
                  <h2 className='text-xl pb-1 font-semibold '>{product?.productName}</h2>
                  <h2 className="pb-2 text-base font-bold text-pink-400 ">Rs {product?.productPrice}</h2>
                  <div className="flex justify-between font-medium w-[60%]">
                    <h2>No Review Yet</h2>
                    <h2>0 Review</h2>
                  </div>
                </div>

                <div className="icons wrapper space-x-4  w-[10%]">
                  <i className="fa-solid fa-pen-to-square hover:text-blue-gray-700" onClick={() => nav(`/update-product/${product?._id}`, { state: { product } })}></i>
                  <i className="fa-solid fa-trash" onClick={() => {
                    setDetail({ productID: product?._id, imagePath: product?.productImage });
                    setPopUp(!popup);

                  }}></i>
                </div>


              </div>
            </div>
          )
        })}
      </div>

    </div >
  )
}

export default AdminProductList