import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";
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

  const [business, setBusiness] = useState<PopularBusinessListType[]>([]);

  //function to fetch businessdata
  const fetchBusiness = () => {
    setBusiness(PopularBusinessList);
  };

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
