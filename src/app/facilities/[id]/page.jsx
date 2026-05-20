
import { Button, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import BookCard from "../BookCard";

const DynamicView = async ({ params }) => {
 
   
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/add/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 items-start">

        {/* LEFT SIDE */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg animate__animated animate__fadeInLeft">

          {/* IMAGE */}
          <div className="relative overflow-hidden">
            <Image
              src={data.imageUrl}
              height={500}
              width={700}
              alt={data.sportName}
              className="h-[450px] w-full object-cover transition-transform duration-700 hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

            {/* PRICE BADGE */}
            <div className="absolute bottom-5 right-5 rounded-2xl bg-cyan-500 px-5 py-2 text-lg font-black text-black shadow-lg">
              ${data.price}/hr
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-6 p-8">

            <div>
              <h1 className="text-4xl font-black tracking-tight text-cyan-400">
                {data.sportName}
              </h1>

              <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            </div>

            <p className="text-lg leading-8 text-gray-300">
              {data.description}
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-gray-400">
                  Price
                </p>

                <h2 className="mt-1 text-2xl font-bold text-green-400">
                  ${data.price}
                </h2>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-gray-400">
                  Availability
                </p>

                <h2 className="mt-1 text-2xl font-bold text-emerald-400">
                  Open
                </h2>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">

              <Link href="/facilities">
                <Button
                  className="border border-white/10 bg-white/5 px-6 font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  Go Back
                </Button>
              </Link>

            

            </div>

          </div>
        </div>

      <BookCard data={data}></BookCard>

            </div>   
                   

          </div>
  )
}

export default DynamicView;