import React from 'react'
import { Card, Input, Button, Typography, } from "@material-tailwind/react";
import { replace, useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateUserMutation } from '../../features/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { updateUsers } from '../../features/userSlice';


const Shipping = () => {
  const userDetails = useSelector((store) => store.userInfo.userDetail);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const shippingSchema = Yup.object().shape({
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      city: ''
    },
    validationSchema: shippingSchema,
    onSubmit: async (value) => {

      const shippingAddress = {
        city: value.city,
        address: value.address,
        isEmpty: false
      }

      try {
        const data = await updateUser({ shippingAddress, token: userDetails.token }).unwrap();
        if (data) {
          dispatch(updateUsers(shippingAddress));
          toast.success("User Detail Updated");
          nav('/placeorder');
        }
        else {
          toast.error("Unable to update user detail");
        }


      } catch (e) {
        toast.error(e);
      }

    }

  })
  return (
    <div className='max-w-sm mt-[6%]  mx-auto '>
      <div>
        <Card className='place-self-center' color="transparent" shadow={false} >
          <Typography variant="h4" color="blue-gray">
            Shipping
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Shipping.
          </Typography>
          <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <Input
                  name='address'
                  id='address'
                  type='address'
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  error={formik.errors.address && formik.touched.address ? true : false} size="lg" label="Address" />
                {formik.errors.address && formik.touched.address ? <h1 className='mt-2 text-red-600'>{formik.errors.address}</h1> : null}
              </div>

              <div>
                <Input
                  name='city'
                  id='city'
                  type='city'
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  error={formik.errors.city && formik.touched.city ? true : false} size="lg" label="city" />
                {formik.errors.city && formik.touched.city ? <h1 className='mt-2 text-red-600'>{formik.errors.city}</h1> : null}
              </div>
            </div>

            {/* {isLoading ? <Button disabled className="mt-6 relative py-2 flex justify-center" fullWidth>
              <div className='h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin'>
              </div>
            </Button> : */}
            <Button type='submit' className="mt-6" fullWidth>
              Submit
            </Button>
            {/* } */}

          </form>

        </Card>
      </div>

    </div>
  )
}

export default Shipping