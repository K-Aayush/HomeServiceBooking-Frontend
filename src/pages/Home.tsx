import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";

const Home = () => {
  return (
    <div className="mx-6 md:mx-16">
      <Hero />
      <CategoryList />
    </div>
  );
};

export default Home;
