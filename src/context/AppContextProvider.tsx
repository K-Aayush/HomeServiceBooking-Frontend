import { AppContext } from "./AppContext";
import { useCallback, useEffect, useState } from "react";
import { PopularBusinessList } from "../lib/data";
import { PopularBusinessListType } from "../lib/type";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
  });

  const [isSearched, setIsSearched] = useState<boolean>(false);

  //get all business list
  const [business, setBusiness] = useState<PopularBusinessListType[]>([]);

  //get business list by category
  const [businessByCategory, setBusinessByCategory] = useState<
    PopularBusinessListType[]
  >([]);

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
