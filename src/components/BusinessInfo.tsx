import { Mail, MapPin } from "lucide-react";
import { BusinessInfoProps } from "../lib/type";

const BusinessInfo = ({ business }: BusinessInfoProps) => {
  return (
    <div className="md:flex-row gap-4 items-center flex flex-col ">
      <img
        src={business?.images[0]}
        alt={business?.name}
        width={150}
        height={200}
        className="rounded-full h-[150px] object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="flex flex-col mt-4 md:mt-0 items-baseline gap-3">
        <h2 className="text-primary bg-purple-100 rounded-full px-3 py-1 text-lg">
          {business?.category.name}
        </h2>
        <h2 className="text-4xl font-bold">{business?.name}</h2>
        <h2 className="flex items-center gap-2 text-lg text-gray-500">
          <MapPin />
          {business?.address}
        </h2>
        <h2 className="flex gap-2 items-center text-lg text-gray-500">
          <Mail />
          {business?.email}
        </h2>
      </div>
    </div>
  );
};

export default BusinessInfo;
