import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  return (
    <div className="grid grid-cols-4">
      <div className="bg-blue-100">category</div>
      <div className="col-span-3 bg-red-100">BusinessCategories</div>
    </div>
  );
};

export default Category;
