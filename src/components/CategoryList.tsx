import { BusinessCategories } from "../lib/data";

const CategoryList = () => {
  return (
    <div className="mx-4 md:mx-22 lg:mx-52 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {BusinessCategories.map((item, index) => (
        <div className="flex flex-col items-center justify-center gap-2">
          <img src={item.icon} alt="icon" width={35} height={35} />
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
