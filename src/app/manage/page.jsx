import { auth } from "../lib/auth";
import ManageFac from "./ManageFac";

const ManageFacility = async() => {


    // const token = await auth.api.getToken();
    // console.log(token)

      const res = await fetch (`${process.env.SERVER_URL}/facilities`,{
        cache:"no-store",
        // headers:{
        //      authorization:`Bearer ${token?.token}`
        // }
    })
    const data = await res.json()

    console.log(data)
    




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