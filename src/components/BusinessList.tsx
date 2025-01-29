import { PopularBusinessList } from "../lib/data";

const BusinessList = () => {
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold">Popular Business</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {PopularBusinessList.map((item, index) => (
          <div key={index}>
            <img
              src={item.images[0]}
              alt={item.name}
              width={500}
              height={200}
              className="object-cover h-[150px] md:h-[200px] rounded-lg"
            />
            <div className="flex flex-col items-baseline">
              <h2 className="py-1 bg-purple-200 text-primary rounded-full px-2 text-sm">
                {item.cateory.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessList;
