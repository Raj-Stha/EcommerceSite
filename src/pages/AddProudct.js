import React from 'react'
import {
  Card,
  Input,
  Button,
  Select,
  Option,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateProductMutation } from '../features/productApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';



const AddProudct = () => {
  const nav = useNavigate();
  const userToken = useSelector((state) => state.userInfo.userDetail);


  const [createProduct, { isLoading }] = useCreateProductMutation();


  const productValidation = Yup.object().shape({
    productName: Yup.string().required("Required").min(3, "Too Short"),
    brand: Yup.string().required("Required").min(3, "Too Short"),
    price: Yup.number().required("Required").positive("Price should be positive value"),
    productImage: Yup.mixed().test('File Format', "Unsupported File Format", (value) => value && ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type)),
    categories: Yup.string().required("Required").min(3, "Too Short"), productDesc: Yup.string().required("Required").min(3, "Too Short"),
    stock: Yup.number().required("Required").positive("Stock should be positive value"),

  });

  const product = useFormik({
    initialValues: {
      productName: "",
      brand: "",
      price: 1,
      productImage: "",
      categories: "Mens Wear",
      productDesc: "",
      stock: 1

    },

    validationSchema: productValidation,
    onSubmit: async (value) => {

      try {
        const formData = new FormData();
        formData.append('productName', value.productName);
        formData.append('brand', value.brand);
        formData.append('price', value.price);
        formData.append('productImage', value.productImage);
        formData.append('categories', value.categories);
        formData.append('productDesc', value.productDesc);
        formData.append('stock', value.stock);

        const res = await createProduct({
          details: formData,
          token: userToken.token
        }).unwrap();
        console.log(res);
        if (res.status === 201) {
          toast.success('Product Created');
          nav('/');

        }

      }
      catch (e) {
        toast.error(e.data.message);
      }
    }
  });



  return (

    <div className='flex justify-center pt-5 mt-5'>

      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Product
        </Typography>

        <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={product.handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">

            <Input size="lg" label="Name" name='productName' onChange={product.handleChange} value={product.values.productName} />
            {product.errors.productName && product.touched.productName && <h3>{product.errors.productName}</h3>}

            <Input type='number' size="lg" label="Price" name='price' min={1} value={product.values.price} onChange={product.handleChange} />
            {product.errors.price && product.touched.productName && <h3>{product.errors.price}</h3>}

            <Input size="lg" label="Brand" name='brand' onChange={product.handleChange} value={product.values.brand} />
            {product.errors.brand && product.touched.brand && <h3>{product.errors.brand}</h3>}

            <Input type='file' name="productImage" size="lg" label="Product Image" onChange={(e) => {
              const image = e.target.files[0];
              product.setFieldValue('productImage', image);
              const res = ['image/png', 'image/jpg', 'image/jpeg'].includes(image.type)
              if (res) {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.addEventListener('load', () => {
                  product.setFieldValue('imageReview', reader.result);
                })
              } else {
                product.setFieldValue('imageReview', null);
              }



            }} />
            {product.errors.productImage && product.touched.productImage && <h3>{product.errors.productImage}</h3>}

            {
              product.values.imageReview != null && <div className='h-[200px] w-[300px] rounded-md overflow-hidden mx-auto'>
                <img src={`${product.values.imageReview}`} alt="" className='h-[100%] object-cover w-[100%]' />
              </div>
            }



            <Select label="Select Categories" name='categories' onChange={(e) => { product.setFieldValue('categories', e) }}>
              <Option value='Mens wear'>Mens wear</Option>
              <Option value='Womens wear'>Womens wear</Option>
              <Option value='Trending'>Trending</Option>
            </Select>

            <Input type='number' size="lg" label="Stock" name='stock' min={0} onChange={product.handleChange} value={product.values.stock} />
            {product.errors.stock && product.touched.stock && <h3>{product.errors.stock}</h3>}


            <Textarea label='Product Description' name='productDesc' onChange={product.handleChange} value={product.values.productDesc} />

            {product.errors.productDesc && product.touched.productDesc && <h3>{product.errors.productDesc}</h3>}
          </div>

          {isLoading ? <Button disabled className="mt-6 relative py-2 flex justify-center" fullWidth>
            <div className='h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin'>
            </div>
          </Button> : <Button type='submit' className="mt-6" fullWidth>
            Create
          </Button>}

        </form>
      </Card>
    </div >
  )
}

export default AddProudct