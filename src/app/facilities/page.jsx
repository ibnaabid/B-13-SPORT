// FacilitiesCard.jsx
"use client";
import { useState, useEffect } from "react";
import CardDesign from "./CardDesign";

const FacilitiesCard = () => {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");

  const loadFacilities = async () => {
    const res = await fetch(
      `http://localhost:5000/facilities?search=${search}&sport=${sport}`
    );
    const data = await res.json();
    setFacilities(data);
  };

  // Page load এ এবং search/sport বদলালে auto fetch
  useEffect(() => {
    loadFacilities();
  }, [search, sport]);

  return (
    <div className="px-4 py-8">

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search facility..."
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-green-900
          bg-white/5 text-red-500 placeholder:text-green-400 outline-none 
          transition-all"
        />

        {/* Filter */}
        <select
          onChange={(e) => setSport(e.target.value)}
          className="px-4 py-2 rounded-xl border border-white/10 
          bg-slate-900 text-white outline-none focus:border-cyan-400"
        >
          <option value="">All Sports</option>
          <option value="Football">Football</option>
          <option value="Cricket">Cricket</option>
          <option value="Badminton">Badminton</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
        </select>
      </div>

      {/* CARDS */}
      {facilities.length === 0 ? (
        <p className="text-center text-red-500">No facilities found!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => (
            <CardDesign key={fac._id} data={fac} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FacilitiesCard;