import { Link } from "react-router-dom";
import { BusinessCategories } from "../lib/data";

const CategorySidebar = () => {
  return (
    <div>
      <h2 className="text-lg mb-3 font-bold text-primary">Categories</h2>
      <div>
        {BusinessCategories.map((item, index) => (
          <Link
            to={`/category/${item.name}`}
            key={index}
            className="flex items-center gap-2 p-3 border rounded-lg mb-3 md:mr-10 cursor-pointer hover:bg-purple-50 hover:text-primary hover:border-primary hover:shadow-md"
          >
            <img
              src={item.icon}
              alt="icon"
              width={30}
              height={30}
              loading="lazy"
              decoding="async"
            />
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
