"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const sportsCategories = ["Football", "Cricket", "Badminton", "Basketball", "Tennis"];

const AllFacilities = () => {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    // 🛠️ ফিক্সড: ব্যাকএন্ড যেহেতু 'type' বোঝে, তাই আমরা '&type=' দিয়ে স্টেট পাঠাচ্ছি
    fetch(`http://localhost:5000/add?search=${search}&type=${sport}`)
      .then((res) => res.json())
      .then((data) => setFacilities(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching:", err));
  }, [search, sport]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-black mb-8">
          Explore All <span className="text-cyan-400">Facilities</span>
        </h1>

        {/* সার্চ ও ফিল্টার ইনপুট */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search facility by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />

          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="sm:w-48 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 text-gray-300"
          >
            <option value="">All Sports</option>
            {sportsCategories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* কার্ড লিস্ট */}
        {facilities.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No facilities found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((item) => (
              <div key={item._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="relative h-48 w-full bg-slate-800">
                  <Image
                    src={item.imageUrl || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e"}
                    alt={item.facilityName || "Sport"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-cyan-400 uppercase bg-cyan-500/10 px-2.5 py-1 rounded-md">
                    {item.facilityType}
                  </span>
                  <h3 className="text-xl font-bold mt-2">{item.facilityName}</h3>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <p className="text-lg font-black">${item.price}/hr</p>
                    <Link href={`/facility/${item._id}`}>
                      <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-4 py-2 rounded-xl text-sm">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllFacilities;