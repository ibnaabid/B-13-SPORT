import { auth } from "../lib/auth";
import ManageFac from "./ManageFac";

const ManageFacility = async() => {


    const token = await auth.api.getToken();
    console.log(token)
      const res = await fetch ("http://localhost:5000/add",{
        cache:"no-store",
        headers:{
             authorization:`Bearer ${token}`
        }
    })
    const data = await res.json()
    




    return (
        <div>
            
            
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 py-5 mt-4">
                {
                    data.map(fac => <ManageFac key={fac._id}
                        data={fac}
                    >

                    </ManageFac> )
                }
            </div>
        </div>
    );
};

export default ManageFacility;