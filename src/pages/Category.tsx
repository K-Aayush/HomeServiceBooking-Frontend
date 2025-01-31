import { useParams } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar";

const Category = () => {
  const { id } = useParams();
  return (
    <div className="mx-6 md:mx-16 mt-8">
      <div className="grid grid-cols-4">
        <div className="">
          <CategorySidebar />
        </div>
        <div className="col-span-3 ">BusinessCategories {id}</div>
      </div>
    </div>
  );
};

export default Category;
