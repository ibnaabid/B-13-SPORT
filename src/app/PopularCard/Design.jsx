import Image from "next/image";

const Design = ({ sports }) => {
  return (
    <div className="animate__animated animate__fadeInUp card w-full max-w-sm bg-base-100 shadow-xl hover:scale-105 transition-all duration-500">

      {/* IMAGE */}
      <figure className="relative h-48 w-full overflow-hidden">
        <Image
          src={sports.image}
          alt={sports.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </figure>

      {/* CONTENT */}
      <div className="card-body">
        <h2 className="card-title text-green-500">
          {sports.name}
        </h2>

        <p className="text-red-400 text-center font-bold border-2 rounded-2xl w-[200px] py-1 transition-all duration-300 hover:bg-red-400 hover:text-white">
          {sports.query}
        </p>
      </div>

    </div>
  );
};

export default Design;