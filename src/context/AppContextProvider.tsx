import { AppContext } from "./AppContext";
import { useCallback, useEffect, useState } from "react";
import { PopularBusinessList } from "../lib/data";
import { PopularBusinessListType, requiterDataProps } from "../lib/type";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

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

  //Logout function
  const logout = () => {
    setRequiterToken(null);
    localStorage.removeItem("requiterToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

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
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
