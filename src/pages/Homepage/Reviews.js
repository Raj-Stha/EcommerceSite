import React from 'react'
import { Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { useUpdateProductReviewMutation } from '../../features/productApi';
import { toast } from 'react-toastify';



const Reviews = ({ productID }) => {

  const user = useSelector((s) => s.userInfo.userDetail);

  const [updateReview, { isLoading }] = useUpdateProductReviewMutation();

  const valSchema = Yup.object().shape({
    rating: Yup.string().required(),
    comment: Yup.string().min(20, 'too short').max(200, 'max character 20').required()
  });
  const formik = useFormik({
    initialValues: {
      rating: '',
      comment: ''
    },
    validationSchema: valSchema,
    onSubmit: async (val, { resetForm }) => {
      try {
        const result = await updateReview({
          token: user.token,
          body: {
            fullName: user.fullName,
            rating: Number(val.rating),
            comment: val.comment,
          },
          productID
        }).unwrap();

        console.log(result);
        if (result?.status === 400) {
          toast.error(result.message);
        }
        else {
          toast.success(result.message);
        }
      } catch (err) {
        console.log(err);
      }
      resetForm();
    },

  });

  return (
    <div className='p-4 space-y-7 py-11'>
      <h1>REVIEWS</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='pl-4 space-y-5'>
          <h1>WRITE A CUSTOMER REVIEW</h1>
          <div className="w-44 space-y-2">
            <p>Rating</p>
            <Select
              onChange={(e) => formik.setFieldValue('rating', e)}
              label="Select" name='rating'>
              <Option value='1'>Poor</Option>
              <Option value='2'>Fair</Option>
              <Option value='3'>Good</Option>
              <Option value='4'>Very Good</Option>
              <Option value='5'>Excellent</Option>
            </Select>
            {formik.errors.rating && formik.touched.rating ? <h1 className='mt-2 text-red-600'>{formik.errors.rating}</h1> : null}

          </div>

          <h2>Comment</h2>


          <div className="w-96 space-y-5">
            <Textarea
              name='comment'
              id='comment'
              onChange={formik.handleChange}
              value={formik.values.comment}
              label="Message" />
            {formik.errors.comment && formik.touched.comment ? <h1 className='mt-2 text-red-600'>{formik.errors.comment}</h1> : null}
            <button type='submit' className='text-center bg-black text-white py-1 px-4 rounded'>Submit</button>
          </div>



        </div>

      </form>

    </div>
  )
}

export default Reviews