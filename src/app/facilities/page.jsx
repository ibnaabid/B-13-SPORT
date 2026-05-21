"use client";
import { useState, useEffect } from "react";
import CardDesign from "./CardDesign";

const sports = ["football", "cricket", "Badminton", "Basketball", "river", "Tennis"];

const FacilitiesCard = () => {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const loadFacilities = async () => {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/facilities?search=${search}&sport=${sport}`
        );
        const datas = await res.json();
        setFacilities(Array.isArray(datas) ? datas : []);
      } catch (error) {
        console.error(error);
      }
    };
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
        <p className="text-center text-slate-500 mt-24">No facilities found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((data) => (
            <CardDesign key={data._id} data={data} /> // ✅ props দিয়ে পাঠাচ্ছে
          ))}
        </div>
      )}
    </div>
  );
};

export default FacilitiesCard;