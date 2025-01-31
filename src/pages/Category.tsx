import { useParams } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar";
import BusinessList from "../components/BusinessList";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Category = () => {
  const { id } = useParams();
  const { businessByCategory, fetchBusinessByCategory } =
    useContext(AppContext);

  useEffect(() => {
    if (id) {
      fetchBusinessByCategory(id);
    }
  }, [id, fetchBusinessByCategory]);

  return (
    <div className="mx-6 md:mx-16 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="hidden md:block">
          <CategorySidebar categoryList={`${id}`} />
        </div>
        <div className="md:col-span-3 ">
          <BusinessList
            title={`${id}`}
            businessList={businessByCategory}
            pagehref="business_category_title"
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
