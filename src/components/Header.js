import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar } from '@material-tailwind/react'
import { removeCart } from '../features/userSlice'


const Header = () => {
  const userData = useSelector((state) => state.userInfo.userDetail);
  const [dropdown, setdropdown] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();


  return (
    <div className='relative px-6 pt-[2px] pb-[2px] bg-blue-gray-500'>
      <div className=' text-white   flex justify-between items-center'>
        <div className="">
          <h1 className='text-xl' onClick={() => nav('/')}>Shop</h1>
        </div>

        <div className="flex items-center space-x-4">

          {userData?.isAdmin &&
            <h2 className='select-none cursor-pointer' onClick={() => nav('/products')}>Products</h2>
          }
          {userData ? <div className='pr-4'>
            <div className={`space-x-3  pr-2 pl-2 py-1 cursor-pointer ${dropdown && "bg-blue-gray-700  rounded-md "}`}
              onClick={() => {
                setdropdown(!dropdown)
              }}>
              <Avatar
                variant="circular"
                size="sm"
                alt="candice wu"
                className=" border-teal-200-800 p-0.5 border-2"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              {dropdown ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}

            </div>
          </div>
            :
            <div className="space-x-4">
              <NavLink to={'/login'}> Login</NavLink>
            </div>
          }
        </div>
      </div>

      {
        dropdown && <div className="flex flex-col fixed right-8 shadow-lg px-6 pt-2 pb-3 space-y-1 rounded-md">
          <NavLink>My Profile</NavLink>
          <NavLink>Edit Profile</NavLink>
          <NavLink className={'text-red-600'} onClick={() => {
            dispatch(removeCart());
            setdropdown(false);

          }}> Sign Out</NavLink>
        </div>
      }
    </div >
  )
}

export default Header