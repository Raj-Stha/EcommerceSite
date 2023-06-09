import React from 'react'
import { useGetAllProductQuery } from '../../features/productApi';
import { baseURL } from "../../constants/constant";
import { useNavigate } from 'react-router';
const ProductList = () => {
  const { data, isLoading } = useGetAllProductQuery();
  const nav = useNavigate();


  if (isLoading) {
    return (
      <div className='w-[120px] mt-[12%] mx-auto'>
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_p8bfn5to.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-4 space-x-6 px-6 my-6">
      {data?.products.map((product, index) => {
        return (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden  shadow-xl " onClick={() => nav(`/product/${product?._id}`)}>

            <div className="w-[100%]   shadow-blue-gray-200 shadow-2xl overflow-hidden  h-[230px]">
              <img src={` ${baseURL}${product?.productImage}`} alt="" className="w-[100%] h-[100%] object-cover" />
            </div>
            <div className=" px-2 pb-4" >
              <h2 className='pt-6 text-xl pb-1  font-semibold '>{product?.productName}</h2>
              <h2 className="pb-4 text-base font-bold text-pink-400 ">Rs {product?.productPrice}</h2>
              <div className="flex justify-between font-medium">
                <h2>No Review Yet</h2>
                <h2>0 Review</h2>
              </div>


            </div>





          </div>
        )
      })}


    </div >
  )
}

export default ProductList