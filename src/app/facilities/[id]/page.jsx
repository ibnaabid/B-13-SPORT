import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import BookCard from "../BookCard";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const DynamicView = async ({ params }) => {
  const { id } = await params;

  const {token} = await auth.api.getToken({
    headers: await headers(),
  });

  console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add/${id}`, {
    cache: "no-store",
    headers:{
      authorization: `Bearer ${token}`
    }
   
  });

  const data = await res.json();
  console.log(data)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 items-start">

        {/* LEFT */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">

          {/* IMAGE */}
          <div className="relative h-[280px] w-full">
            <Image
              src={data?.imageUrl || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e"}
             height={300}
             width={300}
             alt={data?.sportName || "Facility"}
             
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 right-4 bg-teal-500 text-teal-950 
            text-sm font-medium px-4 py-1.5 rounded-full">
              {data.price}/hr
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{data?.sportName || "sport"}</h1>
              <div className="mt-2 h-0.5 w-16 rounded-full bg-teal-500" />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {data.description}
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-500 mb-1">Price</p>
                <p className="text-lg font-bold text-teal-400">${data.price}/hr</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <p className="text-lg font-bold text-emerald-400">Available</p>
              </div>
            </div>

            <p className="text-xs text-slate-500">{data.facilityDate}</p>

            <Link href="/facilities">
              <Button className="border border-white/10 bg-white/5 text-white 
              text-sm hover:bg-white/10 transition-all">
                ← Go Back
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <BookCard data={data} />

      </div>
    </div>
  );
};

export default DynamicView;