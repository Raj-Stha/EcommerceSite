import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGetProductByIDQuery } from '../features/productApi';
import { baseURL } from "../constants/constant";
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/userSlice';
import { toast } from 'react-toastify';
import Reviews from './Homepage/Reviews';


const Product = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIDQuery(id);
  const [quantity, setQTY] = useState(1);
  const nav = useNavigate();
  const dispatch = useDispatch();

  console.log(data);




  const avgRating = data?.reviews.reduce((s, c) => {
    let total = s + c.rating;
    return Math.round(total / data?.reviews.length);
  }, 0)

  console.log(avgRating);


  if (isLoading) {
    return (
      <div className='w-[120px] mt-[12%] mx-auto'>
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_p8bfn5to.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
    )
  }


  const addtoCart = () => {
    const productDetails = {
      productID: data?._id,
      productName: data?.productName,
      productImage: data?.productImage,
      categories: data?.categories,
      brand: data?.brand,
      productPrice: data?.productPrice,
      stock: data?.stock,
      quantity: quantity
    }
    dispatch(addToCart(productDetails));
    toast.success("Added to Cart");
    nav('/cart');
  }

  return (
    <div >
      <div className="flex px-10 py-7  justify-between">
        <div className="left flex w-[75%] justify-between ">
          <div className="w-[43%] h-[270px] ">
            <img src={` ${baseURL}${data?.productImage}`} alt="" className="w-[100%] h-[100%] object-cover rounded-md" />
          </div>
          <div className="w-[55%] px-5 pt-4 space-y-4">
            <h2 className='text-2xl'>{data?.productName}</h2>
            {data?.reviews.length === 0 ? <h2 className='border-t-2 border-b-2 py-2 border-gray-300'>No Review yet</h2> :

              <div className='flex space-x-1'>
                {[...Array(5).keys()].map((data, index) => {
                  return (

                    <div key={data}>
                      {data + 1 <= avgRating ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                    </div>
                  )
                })}
                <h2 className='pl-3'>{data?.reviews.length} Reviews</h2>
              </div>

            }

            <h2 className='border-t-2 border-b-2 py-2 border-gray-300'>Price: Rs {data?.productPrice}</h2>
            <h3>{data?.productDetail}</h3>
          </div>
        </div>
        <div className="right w-[25%] pl-[1%]">

          <table className='border-separate'>

            <tbody>
              <tr className='px-5' >
                <td className='border-2 border-gray-200 px-10 py-4 '>Price</td>
                <td className='border-2 px-10 py-4 border-gray-200 '>Rs {data?.productPrice}</td>
              </tr>
              <tr >
                <td className='border-2 px-10 py-4 border-gray-200'>Status</td>
                {data?.stock > 0 ? <td className='border-2 border-gray-200 px-10 py-4'>In Stock </td> : <td className='border-2 border-gray-200 px-4  '> Out of Stock </td>
                }
              </tr>

              <tr >
                <td className='border-2 border-gray-200 px-10 py-4'>Qty</td>
                <td className='border-2 border-gray-200 text-center px-10 py-4'>

                  <select name="qty" id="qty" className='text-center bg-gray-200 px-4 py-2' onChange={(e) => setQTY(e.target.value)} >

                    {[...Array(data?.stock).keys()].map((data) => {
                      return (
                        <option key={`${data + 1}`} value={`${data + 1}`} > {data + 1}</option>
                      )
                    })}
                  </select>


                </td>
              </tr>

              <tr className='text-center'>
                <td className=' border-2 border-gray-200 px-10 py-4' colSpan={2}>
                  {data?.stock > 0 ? <button className=' col-span-2 bg-blue-gray-500 text-white  px-6 py-2 rounded-md hover:bg-blue-gray-700' onClick={() => {
                    addtoCart();
                  }}>Add to Cart</button> :
                    <button className=' col-span-2 bg-blue-gray-200 text-white  px-6 py-2 rounded-md ' disabled>Sold Out</button>}

                </td>
              </tr>
            </tbody>


          </table>




        </div>
      </div>
      <Reviews productID={data?._id} />
    </div >
  )
}

export default Product