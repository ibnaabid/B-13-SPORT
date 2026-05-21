"use client";

import { Button, Input } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

const BookCard = ({ data }) => {
  
  const { data: session } = authClient.useSession();
 
  

  

  const BookingHandler = async (e) => {
    
    e.preventDefault();
     const userInfo = session?.user;    
    if (!userInfo) {
      toast.error("Please login first");
      return;
    }
    
    
    const {data:token}= await authClient.token();
      console.log(token)

  
    const booking = {
      userid: userInfo?.id,
      username: userInfo?.name,
      userimage: userInfo?.image || "user Image",
      useremail: userInfo?.email,
      facilityName: data?.sportName,
      price: data?.price,
    };

    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token?.token}`, 
      },
      body: JSON.stringify(booking),
    });

    const promise = await res.json()

    console.log(promise)
    if (res.ok) {
      toast.success("Booking Successful!");
    } else {
      toast.error("Booking failed, please try again.");
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-white">
          Book This
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}Facility
          </span>
        </h2>
        <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
      </div>

      <form onSubmit={BookingHandler} className="space-y-6">

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Facility Name
          </label>
          <Input
            value={data?.sportName || ""}
            readOnly
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Booking Date
          </label>
          <Input type="date" className="rounded-xl" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Time Slot
          </label>
          <select className="w-full rounded-xl border border-white/10 bg-slate-900 
          px-4 py-3 text-white outline-none focus:border-cyan-400">
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
          <p className="text-sm text-gray-300">Total Price</p>
          <h2 className="mt-1 text-4xl font-black text-cyan-400">
            ${data?.price || 0}
          </h2>
        </div>

        <Button
          type="submit"
          className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 
          to-blue-500 text-lg font-black text-black shadow-lg transition-all 
          duration-300 hover:scale-[1.02]"
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  );
};

export default BookCard;