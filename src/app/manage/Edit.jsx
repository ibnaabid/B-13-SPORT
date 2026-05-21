"use client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { authClient } from "../lib/auth-client";

const EditForm = ({ data }) => {
  const router = useRouter();

 
  const onSubmit = async (e) => {
  e.preventDefault();

  // const { data: token } = authClient.token();

  // console.log("TOKEN:", token);

  // if (!token) {
  //   toast.error("No token found. Please login again.");
  //   return;
  // }

  const formData = new FormData(e.currentTarget);
  const updatedData = Object.fromEntries(formData.entries());

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${data?._id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      // authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const result = await res.json();

  if (res.ok) {
    toast.success("Updated successfully!");
    router.refresh();
  } else {
    toast.error("Update failed");
    console.log(result);
  }

  };

  return (
    <Modal>
      <Button variant="secondary">Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Facility</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
             
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField className="w-full" name="sportName" type="text">
                    <Label>Sport Name</Label>
              
                    <Input defaultValue={data?.sportName} placeholder="Sport name" />
                  </TextField>

                 

                      <TextField className="w-full" name="image" type="url">
                    <Label>Image Url</Label>
                    <Input defaultValue={data?.imageUrl} placeholder="https//:unplash///" />
                  </TextField>

                  <TextField className="w-full" name="description" type="text">
                    <Label>Description</Label>
                    <Input defaultValue={data?.description} placeholder="Description" />
                  </TextField>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">Cancel</Button>
                   
                    <Button type="submit" slot="close">Update</Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditForm;