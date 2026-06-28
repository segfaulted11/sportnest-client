import Hero from "./components/Hero";
import FeaturedFacilities from "./components/FeaturedFacilities";
import WhyChooseUs from "./components/WhyChooseUs";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";

function Home() {
  return (
    <>
      <Hero />

      <FeaturedFacilities />

      <WhyChooseUs />
      <HowItWorks />
      <Stats />
    </>
  );
}

export default Home;
