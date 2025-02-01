import { BusinessInfoProps } from "../lib/type";

const BusinessInfo = ({ business }: BusinessInfoProps) => {
  return (
    <div>
      <img src={business?.images[0]} alt="images" width={300} height={300} />
    </div>
  );
};

export default BusinessInfo;
