"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CardDesign = () => {

  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [facilities, setFacilities] = useState([]);

  const loadFacilities = async () => {

    const res = await fetch(
      `http://localhost:5000/facilities?search=${search}&sport=${sport}`
    );

    const datas = await res.json();

    setFacilities(datas);

  };

  useEffect(()=>{

    loadFacilities();

  },[search,sport]);

  return (

    <div>

      <input
        type="text"
        placeholder="Search sport..."
        onChange={(e)=>
          setSearch(e.target.value)
        }
      />

      <select
        onChange={(e)=>
          setSport(e.target.value)
        }
      >

        <option value="">
          All
        </option>

        <option value="Football">
          Football
        </option>

        <option value="Cricket">
          Cricket
        </option>

      </select>

      <div className="grid grid-cols-3 gap-4">

      {

      facilities.map((data)=>(

      <div key={data._id}>

      <Image
      src={data.imageUrl}
      width={500}
      height={300}
      alt=""
      />

      <h2>

      {data.sportName}

      </h2>

      <Link
      href={`/facilities/${data._id}`}
      >

      View

      </Link>

      </div>

      ))

      }

      </div>

    </div>

  );

};

export default CardDesign;