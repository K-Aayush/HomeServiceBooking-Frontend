import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import BusinessList from "../components/BusinessList";

const Home = () => {
  return (
    <div className="mx-6 md:mx-16">
      <Hero />
      <CategoryList />
      <BusinessList />
    </div>
  );
};

export default Home;
