import React from 'react'

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import { useUserLoginMutation } from '../features/authApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import * as Yup from 'yup';
const Login = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Address').required('Please enter the email address !!'),
    password: Yup.string().required('Please enter the password'),

  });

  const login = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: loginSchema,
    onSubmit: async (value) => {
      try {
        const res = await userLogin(value).unwrap();
        dispatch(addUser(res.userDetails));
        toast.success("Login Successfully");
        nav('/');
      }

      catch (e) {
        toast.error(e.data.message);
      }

    }

  });
  return (
    <div className='flex justify-center mt-4 pt-6'>
      <div className="">

        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>

          <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={login.handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Email" name='email' onChange={login.handleChange} value={login.values.email} />
              {login.errors.email && login.touched.email && <h1>{login.errors.email}</h1>}
              <Input type="password" size="lg" label="Password" onChange={login.handleChange} name='password' value={login.values.password} />
              {login.errors.password && login.touched.password && <h1>{login.errors.password}</h1>}
            </div>
            {isLoading ? <Button disabled className="mt-6 relative  flex justify-center" fullWidth>
              <div className='h-7 w-7 mx-auto border-2  rounded-full border-t-gray-900 animate-spin'>
              </div>
            </Button> : <Button className="mt-6" fullWidth type='submit'>
              Login
            </Button>}

        <h3 className='pt-6 text-center'>Create an account ? <span><NavLink to={'/signup'} className={'font-medium text-blue-500 transition-colors hover:text-blue-700'}>Register</NavLink> </span></h3>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Login