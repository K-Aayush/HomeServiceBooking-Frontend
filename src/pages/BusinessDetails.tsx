import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { PopularBusinessListType } from "../lib/type";
import BusinessInfo from "../components/BusinessInfo";
import BusinessDescription from "../components/BusinessDescription";
import SuggestedBusinessList from "../components/SuggestedBusinessList";
import Loader from "../components/Loader";

const BusinessDetails = () => {
  const { businessDetailsid } = useParams();

  //scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [businessDetailsid]);

  //converting the default businessDetailsid string to number
  const numeric = Number(businessDetailsid);

  //Extracting the data from context
  const { business, businessByCategory, fetchBusinessByCategory } =
    useContext(AppContext);

  // storing the businessData in state
  const [businessData, setBusinessData] =
    useState<PopularBusinessListType | null>(null);

  // fetching the business data by id
  const fetchBusinessData = async () => {
    const data = business.filter((business) => business.id === numeric);
    if (data.length !== 0) {
      setBusinessData(data[0]);
    }
  };

  //calling the data in overall page
  useEffect(() => {
    if (business.length > 0) {
      fetchBusinessData();
    }
  }, [businessDetailsid, business]);

  useEffect(() => {
    if (businessData?.category.name) {
      fetchBusinessByCategory(businessData?.category.name);
    }
  }, [businessData, fetchBusinessByCategory]);
  return businessData ? (
    <div className="py-8 md:py-20 px-10 md:px-26 lg:px-36 mx-6 md:mx-16 min-h-screen">
      <BusinessInfo business={businessData} />

      <div className="grid grid-cols-4 mt-16">
        <div className="col-span-4 md:col-span-3">
          <BusinessDescription business={businessData} />
        </div>
        <div className="md:block hidden">
          <SuggestedBusinessList
            business={businessByCategory.filter(
              (b) => b.id !== businessData.id
            )}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default BusinessDetails;
