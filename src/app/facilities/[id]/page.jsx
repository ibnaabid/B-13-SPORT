import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import BookCard from "../BookCard";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const DynamicView = async ({ params }) => {

  const { id } = await params;

  const token = await auth.api.getToken({
    headers: await headers()
  });

  console.log(token);

  const res = await fetch(
    `http://localhost:5000/add/${id}`,
    {
      cache:"no-store",

      headers:{
        authorization:`Bearer ${token}`
      }
    }
  );

  const data = await res.json();

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">

        {/* LEFT */}

        <div className="rounded-3xl bg-white/5 p-5">

          <Image
            src={data.imageUrl}
            width={700}
            height={500}
            alt={data.sportName}
            className="rounded-xl"
          />

          <h1 className="text-4xl font-bold mt-5">

            {data.sportName}

          </h1>

          <p>

            {data.description}

          </p>

          <h2>

            ${data.price}

          </h2>

          <Link href="/facilities">

            <Button>

              Go Back

            </Button>

          </Link>

        </div>

        {/* RIGHT */}

        <BookCard
          data={data}
        />

      </div>

    </div>

  );

};

export default DynamicView;