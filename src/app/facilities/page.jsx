import Image from "next/image";
import CardDesign from "./CardDesign";


const FacilitiesCard = async () => {
    const res = await fetch ("http://localhost:5000/add",{
        cache:"no-store"
    })
    const data = await res.json()
    
    

    return (
        <div>
             <div className="text-2xl text-center font-extrabold text-gray-800 mt-7">
                <h2>All Facilites</h2>
            </div>
            
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 py-5 mt-4">
                {
                    data.map(fac => <CardDesign key={fac._id}
                        data={fac}
                    >

                    </CardDesign> )
                }
            </div>
        </div>

    );
};

export default FacilitiesCard;