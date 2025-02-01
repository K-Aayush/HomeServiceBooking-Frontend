import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { PopularBusinessListType } from "../lib/type";

const BusinessDetails = () => {
  const { businessDetailsid } = useParams();

  //converting the default businessDetailsid string to number
  const numeric = Number(businessDetailsid);

  //Extracting the business data from context
  const { business } = useContext(AppContext);

  // storing the businessData in state
  const [businessData, setBusinessData] =
    useState<PopularBusinessListType | null>(null);

  const fetchBusinessData = async () => {
    const data = business.filter((business) => business.id === numeric);
    if (data.length !== 0) {
      setBusinessData(data[0]);
      console.log(data[0]);
    }
  };

  useEffect(() => {
    if (business.length > 0) {
      fetchBusinessData();
    }
  }, [businessDetailsid, business]);
  return <div>BusinessDetails</div>;
};

export default BusinessDetails;
