import React from "react";
import { BusinessDetailsProps } from "../lib/type";

const BusinessDescription = ({ business }: BusinessDetailsProps) => {
  return (
    <div>
      <h2 className="font-bold text-2xl">Description</h2>
      <p className="mt-4 text-gray-600">{business?.about}</p>

      <h2 className="font-bold text-2xl mt-8">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {business?.images.map((item, index) => (
          <img
            src={item}
            key={index}
            alt="image"
            width={700}
            height={200}
            loading="lazy"
            decoding="async"
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessDescription;
