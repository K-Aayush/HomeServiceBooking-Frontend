import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <h2 className="font-bold text-[46px] text-center">
        Find Home <span className="text-primary">Service/Repair</span> <br />
        Near You
      </h2>
      <h2 className="text-xl text-gray-400">
        Explore Best Home Service & Repair Near you
      </h2>
      <div className="flex gap-4 items-center mt-4">
        <Input placeholder="Search" className="rounded-full md:w-[350px]" />
        <Button className="rounded-full h-12">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
