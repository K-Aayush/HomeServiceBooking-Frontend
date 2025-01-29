import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { AppContext } from "../context/AppContext";
import { Skeleton } from "./ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BusinessList = () => {
  const { business } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold" id="popular_business">
        Popular Business
      </h2>

      {/* business listing */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {business.length > 0
          ? business
              .slice((currentPage - 1) * 8, currentPage * 8)
              .map((item, index) => (
                <div
                  key={index}
                  className="shadow-md rounded-lg hover:shadow-lg hover:shadow-primary cursor-pointer hover:scale-105 transition-all ease-in-out"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    width={500}
                    height={200}
                    className="object-cover h-[150px] md:h-[200px] rounded-lg"
                  />
                  <div className="flex flex-col items-baseline p-3 gap-1">
                    <h2 className="py-1 bg-purple-200 text-primary rounded-full px-2 text-sm">
                      {item.cateory.name}
                    </h2>
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <h2 className="text-primary">{item.contactPerson}</h2>
                    <h2 className="text-gray-500 text-sm">{item.address}</h2>
                    <Button className="mt-3">Book now</Button>
                  </div>
                </div>
              ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="flex flex-col space-y-3">
                <Skeleton className="w-full h-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
      </div>

      {/* pagination */}
      {business.length > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-10">
          <a href="#popular_business">
            <ChevronLeft />
          </a>
          {Array.from({ length: Math.ceil(business.length / 8) }).map(
            (_, index) => (
              <a href="#popular_business">
                <button
                  className={`w-10 h-10 items-center justify-center border border-gray-300 text-xl ${
                    currentPage === index + 1
                      ? "bg-purple-200 text-primary font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {index + 1}
                </button>
              </a>
            )
          )}
          <a href="#popular_business">
            <ChevronRight />
          </a>
        </div>
      )}
    </div>
  );
};

export default BusinessList;
