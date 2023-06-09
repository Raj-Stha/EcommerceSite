import React from 'react'
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDeleteProductMutation } from '../features/productApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';



const Popup = ({ setPopup, prodDetail, popup }) => {
  const nav = useNavigate();

  const userToken = useSelector((state) => state.userInfo.userDetail);
  const [deleteProduct, { isloading }] = useDeleteProductMutation();
  console.log(userToken);
  const deleteProd = async () => {
    try {
      const result = await deleteProduct({ prodDetail, token: userToken.token }).unwrap();
      setPopup(false);

      toast.success("Deleted Successfully");
    }
    catch (e) {
      toast.error(e.data.message);
    }

  }

  return (
    <div className="">
      <Dialog open={popup} >
        <DialogHeader> Do you want  to delete the product ?</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setPopup(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            deleteProd();

          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  );

}

export default Popup