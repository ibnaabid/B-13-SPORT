import Design from "./Design";

const PopularSection = () => {
   const sports = [
  
  {
    name: "Cricket",
        id:1,
    query: "cricket stadium",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
  },
  {
    name: "Badminton",
    id:2,
    query: "badminton court indoor",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
  },
 
  {
    name: "Basketball",
    id:3,
    query: "basketball court indoor",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf",
  },
  {
    name: "Swimming",
    id:4,
    query: "swimming pool sports",
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
  },
];
    return (
       <div>
         <h2 className="text-3xl font-bold mt-3 text-shadow-olive-600 text-center">Popular Sports</h2>

 
        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 py-5 mt-4">
            {
                sports.map(p => <Design key={p.id}
                    sports={p}
                ></Design>)
            }
        </div>
              </div>
    );
};

export default PopularSection;