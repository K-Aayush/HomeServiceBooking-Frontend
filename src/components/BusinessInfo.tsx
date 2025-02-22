import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import { BusinessDetailsProps } from "../lib/type";
import { Button } from "./ui/button";

const BusinessInfo = ({ business }: BusinessDetailsProps) => {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row ">
      <img
        src={business?.images[0].url}
        alt={business?.name}
        width={150}
        height={200}
        className="rounded-full h-[150px] object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="items-center justify-between w-full md:flex">
        {/* left sife */}
        <div className="flex flex-col items-baseline gap-3 mt-4 md:mt-0">
          <h2 className="px-3 py-1 text-lg bg-purple-100 rounded-full text-primary">
            {business?.category}
          </h2>
          <h2 className="text-4xl font-bold">{business?.name}</h2>
          <h2 className="flex items-center gap-2 text-lg text-gray-500">
            <MapPin />
            {business?.address}
          </h2>
          <h2 className="flex items-center gap-2 text-lg text-gray-500">
            <Mail />
            {business?.email}
          </h2>
        </div>

        {/* right side */}
        <div className="flex flex-col items-baseline gap-5 mt-4 md:mt-0 md:items-end">
          <Button>
            <Share />
          </Button>
          <h2 className="flex gap-2 text-xl text-primary">
            <User /> {business?.contactPerson}
          </h2>
          <h2 className="flex gap-2 text-xl text-gray-500">
            <Clock /> Available 8:00 AM to 10:00 PM
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
