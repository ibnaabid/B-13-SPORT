"use client"
import {AlertDialog, Button} from "@heroui/react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

const DeleteBnt = ({data}) => {

    const router = useRouter()

 
    
   

    const deleteHandler=async()=>{
      
        const res= await fetch (`http://localhost:5000/booking/${data?._id}`,{
            method:"DELETE",
           
            
        })

        const allBookingDel = await res.json()
       
           toast.success("booking Canceled successfully !")
           router.refresh()

    }



    return (
        <div> 
            <AlertDialog>
      <Button variant="danger">Cancel Booking</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently Canceled <strong>My Awesome booking</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={deleteHandler} slot="close" variant="danger">
                Delete Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
            
        </div>
    );
};

export default DeleteBnt;