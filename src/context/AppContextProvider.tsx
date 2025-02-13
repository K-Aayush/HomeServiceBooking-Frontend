import { AppContext } from "./AppContext";
import { useCallback, useEffect, useState } from "react";
import { PopularBusinessList } from "../lib/data";
import { PopularBusinessListType, requiterDataProps } from "../lib/type";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({
    title: "",
  });

  const [isSearched, setIsSearched] = useState<boolean>(false);

  //show requiter login context
  const [showRequiterLogin, setShowRequiterLogin] = useState(false);

  //get all business list
  const [business, setBusiness] = useState<PopularBusinessListType[]>([]);

  //get business list by category
  const [businessByCategory, setBusinessByCategory] = useState<
    PopularBusinessListType[]
  >([]);

  //get requiter token
  const [requiterToken, setRequiterToken] = useState<string | null>(null);
  const [requiterData, setRequiterData] = useState<requiterDataProps[]>([]);

  //function to fetch businessdata
  const fetchBusiness = () => {
    setBusiness(PopularBusinessList);
  };

  //function to fetch business by category
  const fetchBusinessByCategory = useCallback((categoryName: string) => {
    const filteredBusinessList = PopularBusinessList.filter(
      (business) =>
        business.category.name.toLowerCase() === categoryName.toLowerCase()
    );
    setBusinessByCategory(filteredBusinessList);
  }, []);

  useEffect(() => {
    fetchBusiness();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    business,
    setBusiness,
    businessByCategory,
    fetchBusinessByCategory,
    showRequiterLogin,
    setShowRequiterLogin,
    requiterToken,
    setRequiterToken,
    requiterData,
    setRequiterData,
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
