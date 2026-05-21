"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

const BookCard = ({ data }) => {
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning");
  const [loading, setLoading] = useState(false);

  const BookingHandler = async (e) => {
    e.preventDefault();
    const userInfo = session?.user;

    if (!userInfo) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);

    try {
      // ✅ token সঠিকভাবে নেওয়া
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      console.log("Token:", token);

      if (!token) {
        toast.error("Authentication failed. Please login again.");
        setLoading(false);
        return;
      }

      const booking = {
        userid: userInfo?.id,
        userName: userInfo?.name,        // ✅ capital N
        userImage: userInfo?.image || "", // ✅ capital I
        userEmail: userInfo?.email,       // ✅ capital E
        facilityName: data?.sportName,
        price: data?.price,
        bookingDate: date,
        timeSlot: timeSlot,
      };

      console.log("Booking data:", booking);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`, // ✅ সরাসরি token string
        },
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      console.log("Result:", result);

      if (res.ok) {
        toast.success("Booking Successful!");
      } else {
        toast.error(result?.message || "Booking failed, please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
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
          <Input value={data?.sportName || ""} readOnly className="rounded-xl" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Booking Date
          </label>
          <Input
            type="date"
            className="rounded-xl"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Time Slot
          </label>
          <select
            className="w-full rounded-xl border border-white/10 bg-slate-900 
            px-4 py-3 text-white outline-none focus:border-cyan-400"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
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
          disabled={loading}
          className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 
          to-blue-500 text-lg font-black text-black shadow-lg transition-all 
          duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
};

export default BookCard;