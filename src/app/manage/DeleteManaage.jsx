
"use client"
import {AlertDialog, Button} from "@heroui/react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteManaage = ({data}) => {
    console.log(data)

     const router = useRouter()
    


    const deleteHandler=async()=>{
        const res= await fetch (`http://localhost:5000/manage/${data?._id}`,{
            method:"DELETE"
        })
        const allBookingDel = await res.json()
       
     
       
        if(!allBookingDel){
              <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">All Booking Facilities</h2>
        <p className="text-gray-400">You delete booked !</p>
      </div>
        }
           toast.success("Deleting Facility successfully !")
           router.refresh()

    }

    


    return (
        <div>
            
         <AlertDialog>
              <Button variant="danger">Delete</Button>
              <AlertDialog.Backdrop>
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-[400px]">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="danger" />
                      <AlertDialog.Heading>Cancel Adding permanently?</AlertDialog.Heading>
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
                        Delete Facility
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
                    
                </div>
    );
};

export default DeleteManaage;