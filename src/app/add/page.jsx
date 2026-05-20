"use client";

import { Check } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";

const AddFacility = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res= await fetch("http://localhost:5000/add",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    })
    const Alldata = await res.json()

    console.log(Alldata);
    toast.success("Add Facilities successfully")
    router.push("/facilities")
    

    
  };

  return (
    <div className="flex min-h-screen animate-accordion-down animate__animated items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6">

      <Form
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md"
        validationBehavior="native"
        onSubmit={onSubmit}
      >

        {/* TITLE */}
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Add <span className="text-cyan-400">Facility</span>
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* SPORT NAME */}
          <div className="md:col-span-2">
            <TextField name="sportName" isRequired>
              <Label className="text-white">Sport Name</Label>
              <Input
                placeholder="Football Turf"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <FieldError className="text-red-400" />
            </TextField>
          </div>

          {/* PRICE */}
          <TextField name="price" type="number" isRequired>
            <Label className="text-white">Price (Per Hour)</Label>
            <Input
              type="number"
              placeholder="500"
              className="bg-white/10 text-white placeholder:text-gray-400"
            />
            <FieldError className="text-red-400" />
          </TextField>

          {/* DURATION */}
          <TextField name="duration" isRequired>
            <Label className="text-white">Duration</Label>
            <Input
              placeholder="2 Hours"
              className="bg-white/10 text-white placeholder:text-gray-400"
            />
            <FieldError className="text-red-400" />
          </TextField>

          {/* DATE */}
          <div className="md:col-span-2">
            <TextField name="facilityDate" type="date" isRequired>
              <Label className="text-white">Facility Date</Label>
              <Input
                type="date"
                className="bg-white/10 text-white"
              />
              <FieldError className="text-red-400" />
            </TextField>
          </div>

          {/* IMAGE */}
          <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
              <Label className="text-white">Image URL</Label>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <FieldError className="text-red-400" />
            </TextField>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <Label className="text-white">Description</Label>
            <TextArea
              name="description"
              placeholder="Describe facility details..."
              className="bg-white/10 mt-8 px-4 text-white placeholder:text-gray-400"
            />
          </div>

        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-bold text-black transition hover:scale-105 hover:bg-cyan-400"
        >
          <Check />
          <span className="ml-2">Add Facility</span>
        </Button>

      </Form>
    </div>
  );
};

export default AddFacility;