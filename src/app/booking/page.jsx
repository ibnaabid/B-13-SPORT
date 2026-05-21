
import Image from "next/image";
import { authClient } from "../lib/auth-client";
import { headers } from "next/headers";
import { auth } from "../lib/auth";
import DeleteBnt from "./DeleteBnt";

const FacilityBook = async () => {

  const session = await auth.api.getSession({
     headers: await headers(),
   });

   const token = await auth.api.getToken({
    headers: await headers()
   })

     console.log(token);

  const userInfo = session?.user;
  console.log(userInfo)

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-xl font-bold">Please log in to view your bookings.</p>
      </div>
    );
  }

  const res = await fetch(`http://localhost:5000/booking/${userInfo?.id}`, {
    cache: "no-store",
    headers:{
       authorization:`Bearer ${token?.token}`
    }
  });
  const bookingList = await res.json();

  console.log(bookingList)

  
  if (!bookingList || bookingList.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">All Booking Facilities</h2>
        <p className="text-gray-400">You haven't booked any facilities yet!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-12 text-white">
      <h2 className="text-4xl font-black text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        All Booking Facilities
      </h2>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-2 items-start">
        {bookingList?.map((data) => (
          <div 
            key={data._id} 
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg"
          >
            {/* IMAGE CONTAINER */}
            <div className="relative overflow-hidden h-[300px] w-full">
              <Image
              
                src={data.userImage && data.userImage !== "undefined" ? data.userImage : "https://images.unsplash.com/photo-1541252260730-0412e8e2108e"} 
                height={500}
                width={700}
                alt={data.facilityName || "Facility Image"}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent"></div>

           
              <div className="absolute bottom-5 right-5 rounded-xl bg-cyan-400 px-4 py-1.5 text-base font-black text-slate-950 shadow-lg">
                ${data.price}/hr
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="space-y-4 p-6">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-cyan-400">
                  {data.facilityName}
                </h1>
                <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </div>

           <h2 className="border border-amber-50 rounded-3xl text-center text-red-500 bg-amber-200 font-bold ">pending</h2>
              <div className="text-sm text-gray-400 space-y-1">
                <p><span className="text-gray-500">Booked by:</span> {data?.userName}</p>
                <p><span className="text-gray-500">Email:</span> {data?.userEmail}</p>
              </div>
               <DeleteBnt data={data}></DeleteBnt>
            </div>
              
          </div>
        ))}
      </div>
   
    </div>
  );
};

export default FacilityBook;