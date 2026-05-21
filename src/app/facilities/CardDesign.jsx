"use client";
import Image from "next/image";
import Link from "next/link";

const CardDesign = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 
    hover:border-teal-500/30 transition-all group">

      <div className="relative h-[180px] w-full overflow-hidden">
        <Image
          src={data.imageUrl || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={data.sportName || "Facility"}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 right-3 bg-teal-900 text-teal-300 
        text-xs font-medium px-3 py-1 rounded-full">
          ${data.price}/hr
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-sm font-medium text-white">{data.sportName}</h2>
        <p className="text-xs text-slate-400 line-clamp-2">{data.description}</p>
        <Link href={`/facilities/${data._id}`}>
          <button className="mt-2 w-full py-2 rounded-lg border border-teal-500/30 
          text-teal-400 text-xs font-medium hover:bg-teal-500/10 transition-all">
            View facility →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardDesign;