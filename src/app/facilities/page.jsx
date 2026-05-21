"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

const sports = ["football", "cricket", "Badminton", "Basketball","river", "Tennis"];

const CardDesign = () => {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [facilities, setFacilities] = useState([]);

  const {data:token}= authClient.token()
  console.log(token)

  const loadFacilities = async () => {
    const res = await fetch(
      `http://localhost:5000/facilities?search=${search}&sport=${sport}`,
      {
        headers: { authorization: `Bearer ${token?.token}`}, 
      }
    );
    const datas = await res.json();
    setFacilities(Array.isArray(datas) ? datas : []);
  };

  useEffect(() => {
    loadFacilities();
  }, [search, sport]); 

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen">

      {/* SEARCH */}
      <div className="flex items-center gap-3 bg-slate-900 border border-white/10 
      rounded-xl px-4 mb-4 focus-within:border-teal-500/50 transition-all">
        <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search facility..."
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent py-3 text-white 
          placeholder:text-slate-500 outline-none text-sm"
        />
      </div>

      {/* FILTER CHIPS */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setSport("")}
          className={`px-4 py-1.5 rounded-full text-sm border transition-all
          ${sport === ""
            ? "bg-teal-500 text-teal-950 border-teal-500"
            : "bg-slate-900 text-slate-400 border-white/10 hover:border-teal-500/40"
          }`}
        >
          All
        </button>
        {sports.map((s) => (
          <button
            key={s}
            onClick={() => setSport(s)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all
            ${sport === s
              ? "bg-teal-500 text-teal-950 border-teal-500"
              : "bg-slate-900 text-slate-400 border-white/10 hover:border-teal-500/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* CARDS */}
      {facilities.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-slate-500">
          <svg className="w-12 h-12 mb-3 opacity-30" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">No facilities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((data) => (
            <div key={data._id} className="overflow-hidden rounded-2xl border 
            border-white/10 bg-slate-900 hover:border-teal-500/30 transition-all group">

              {/* IMAGE */}
              <div className="relative h-[180px] w-full overflow-hidden">
                <Image
                  src={data.imageUrl}
                  fill
                  alt={data.sportName}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 right-3 bg-teal-900 text-teal-300 
                text-xs font-medium px-3 py-1 rounded-full">
                  ${data.price}/hr
                </span>
              </div>

              {/* BODY */}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CardDesign;