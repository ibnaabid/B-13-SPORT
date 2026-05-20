import Image from "next/image";
import Link from "next/link";


const CardDesign = ({data}) => {
    return (
        <div>  
         <div>
           
            <div className="card animate__animated animate__fadeInBottomLeft bg-base-100 w-96 shadow-sm">
  <figure>
   <Image
   src={data.imageUrl}
   height={400}
   width={600}
   alt={data.sportName}  
   >

   </Image>
  </figure>
  <div className="card-body">
    <h2 className="card-title font-extrabold text-violet-400">{data.sportName}</h2>
    <p>{data.description}</p>
    <p className="text-2xl text-gray-700">{data.price}</p>
    <div className="card-actions justify-between">
        <h2 className="text-green-500 font-bold">{data.facilityDate}</h2>

       <Link href={`/facilities/${data._id}`}>
             <button className="btn btn-primary">View Facility</button></Link>


    </div>
  </div>
</div>
        </div>
            
        </div>
    );
};

export default CardDesign;