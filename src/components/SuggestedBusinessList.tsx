import { NotebookPen } from "lucide-react";
import { SuggestedBusinessDetailsProps } from "../lib/type";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const SuggestedBusinessList = ({ business }: SuggestedBusinessDetailsProps) => {
  return (
    <div className="pl-10">
      <Button className="flex gap-2 w-full">
        <NotebookPen /> Book Appointment
      </Button>
      <h2 className="font-bold text-lg mb-3 mt-3">Similar Business</h2>
      <div className="">
        {business.map((item, index) => (
          <Link
            to={`/businessDetails/${item.id}`}
            key={index}
            className="flex gap-2 mb-4 rounded-lg p-2 hover:border hover:border-primary hover:shadow-md cursor-pointer"
          >
            <img
              src={item.images[0]}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h2 className="font-bold">{item.name}</h2>
              <h2 className="text-primary">{item.contactPerson}</h2>
              <h2 className="text-gray-400">{item.address}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedBusinessList;
