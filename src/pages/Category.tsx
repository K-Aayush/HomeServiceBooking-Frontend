import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  return <div>Categoryid: {id}</div>;
};

export default Category;
