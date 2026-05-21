import Image from "next/image";
import DeleteManaage from "./DeleteManaage";
import Edit from "./Edit";
import EditForm from "./Edit";

const ManageFac = ({ data }) => {
  console.log(data)
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
      
      {/* IMAGE */}
      <div className="relative h-[180px] w-full">
        <Image
          src={data.imageUrl}
          fill
          alt={data.sportName}
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-teal-500 text-teal-950 
        text-sm font-medium px-3 py-1 rounded-lg">
          ${data.price}/hr
        </span>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-3">
        <h3 className="text-base font-medium text-white">{data.sportName}</h3>
        <p className="text-sm text-slate-400 line-clamp-2">{data.description}</p>
        <p className="text-xs text-slate-500">{data.facilityDate}</p>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-1">
          <EditForm data={data} />
          <DeleteManaage data={data} />
        </div>
      </div>
    </div>
  );
};

export default ManageFac;