import { AppContext } from "./AppContext";
import { useCallback, useEffect, useState } from "react";
import { PopularBusinessList } from "../lib/data";
import {
  PopularBusinessListType,
  requiterDataProps,
  tokenCheck,
} from "../lib/type";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //show requiter login context
  const [showRequiterLogin, setShowRequiterLogin] = useState(false);

  //get all business list
  const [business, setBusiness] = useState<PopularBusinessListType[]>([]);

  //get business list by category
  const [businessByCategory, setBusinessByCategory] = useState<
    PopularBusinessListType[]
  >([]);

  //get requiter token
  const [requiterToken, setRequiterToken] = useState<string | null>(
    localStorage.getItem("requiterToken")
  );
  const [requiterData, setRequiterData] = useState<requiterDataProps | null>(
    null
  );

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

  //fetch requiterdata
  useEffect(() => {
    const fetchData = async () => {
      if (requiterToken) {
        try {
          const { data } = await axios.get<tokenCheck>(
            `${backendUrl}/api/requiter/me`,
            { headers: { Authorization: requiterToken } }
          );

          if (data.success) {
            setRequiterData(data.requiter);
          } else {
            toast.error(data.message);
            logout();
          }
        } catch (error) {
          console.error("User data fetch error:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [requiterToken, backendUrl]);

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
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
