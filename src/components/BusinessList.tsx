import { useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BusinessListProps } from "../lib/type";
import noImage from "../assets/no-image.png";
import { Link } from "react-router-dom";

const BusinessList = ({ businessList, title, pagehref }: BusinessListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  //calculate total pages
  const totalpages = Math.ceil(businessList.length / 8);

  //function to go back in previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //function to go into next page
  const handleNextPage = () => {
    if (currentPage < totalpages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold scroll-mt-0" id={pagehref}>
        {title}
      </h2>

      {/* business listing */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {businessList.length > 0
          ? businessList
              .slice((currentPage - 1) * 8, currentPage * 8)
              .map((item, index) => (
                <Link
                  to={`/businessDetails/${item.id}`}
                  key={index}
                  className="shadow-md rounded-lg hover:shadow-lg hover:shadow-primary cursor-pointer hover:scale-105 transition-all ease-in-out"
                >
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      width={500}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className="object-cover h-[150px] md:h-[200px] rounded-lg shadow-sm transition-opacity duration-300 ease-in-out"
                    />
                  ) : (
                    <img
                      src={noImage}
                      alt="No image available"
                      className="w-[80%] h-auto object-cover rounded-lg shadow-sm mx-auto"
                    />
                  )}

                  <div className="flex flex-col items-baseline p-3 gap-1">
                    <h2 className="py-1 bg-purple-200 text-primary rounded-full px-2 text-sm">
                      {item.category.name}
                    </h2>
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <h2 className="text-primary">{item.contactPerson}</h2>
                    <h2 className="text-gray-500 text-sm">{item.address}</h2>
                    <Button className="mt-3">Book now</Button>
                  </div>
                </Link>
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
      {businessList.length > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-10">
          <a onClick={handlePreviousPage} href={`#${pagehref}`}>
            <button
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
          </a>
          {Array.from({ length: totalpages }).map((_, index) => (
            <a key={index} href={`#${pagehref}`}>
              <button
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 items-center justify-center border border-gray-300 text-xl ${
                  currentPage === index + 1
                    ? "bg-purple-200 text-primary font-semibold"
                    : "text-gray-500"
                }`}
              >
                {index + 1}
              </button>
            </a>
          ))}
          <a onClick={handleNextPage} href={`#${pagehref}`}>
            <button
              disabled={currentPage === totalpages}
              className="disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default BusinessList;
