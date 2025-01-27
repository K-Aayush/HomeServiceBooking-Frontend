import { AppContext } from "./AppContext";
import { useState } from "react";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
  });

  const [isSearched, setIsSearched] = useState<boolean>(false);

  const value = { searchFilter, setSearchFilter, isSearched, setIsSearched };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
