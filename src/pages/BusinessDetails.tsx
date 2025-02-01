import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { PopularBusinessListType } from "../lib/type";
import BusinessInfo from "../components/BusinessInfo";

const BusinessDetails = () => {
  const { businessDetailsid } = useParams();

  //converting the default businessDetailsid string to number
  const numeric = Number(businessDetailsid);

  //Extracting the business data from context
  const { business } = useContext(AppContext);

  // storing the businessData in state
  const [businessData, setBusinessData] =
    useState<PopularBusinessListType | null>(null);

  // fetching the business data by id
  const fetchBusinessData = async () => {
    const data = business.filter((business) => business.id === numeric);
    if (data.length !== 0) {
      setBusinessData(data[0]);
      console.log(data[0]);
    }
  };

  //calling the data in overall page
  useEffect(() => {
    if (business.length > 0) {
      fetchBusinessData();
    }
  }, [businessDetailsid, business]);
  return (
    <div className="py-8 md:py-20 px-10 md:px-26 lg:px-36 mx-6 md:mx-16">
      <BusinessInfo business={businessData} />
    </div>
  );
};

export default BusinessDetails;
