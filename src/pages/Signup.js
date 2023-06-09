import React from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useCreateUserMutation } from '../features/authApi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
const Signup = () => {
  const nav = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const signUpSchema = Yup.object().shape({
    fullName: Yup.string().required("Enter your full Name").min(5, "Name is too Short "),
    email: Yup.string().email('Invalid Email Address').required("Enter you email address"),
    password: Yup.string().required("Please enter password").min(5, "Password is too short")
  });
  const signUp = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: ""
    },
    validationSchema: signUpSchema,
    onSubmit: async (value) => {
      try {
        const res = await createUser(value).unwrap();
        toast.success("Account Registered ");
        console.log(res);
        nav('/login');
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
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={signUp.handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" onChange={signUp.handleChange} name='fullName' value={signUp.values.fullName} />
              {signUp.errors.fullName && signUp.touched.fullName && <h1>{signUp.errors.fullName}</h1>}
              <Input size="lg" label="Email" name='email' onChange={signUp.handleChange} value={signUp.values.email} />
              {signUp.errors.email && signUp.touched.email && <h1>{signUp.errors.email}</h1>}
              <Input type="password" size="lg" label="Password" onChange={signUp.handleChange} name='password' value={signUp.values.password} />
              {signUp.errors.password && signUp.touched.password && <h1>{signUp.errors.password}</h1>}
            </div>

            {isLoading ? <Button disabled className="mt-6 relative py-2 flex justify-center" fullWidth>
              <div className='h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin'>
              </div>
            </Button> : <Button type='submit' className="mt-6" fullWidth>
              Register
            </Button>}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <NavLink
                to={'/login'}
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </NavLink>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Signup