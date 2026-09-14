import Hero from "../../components/Hero/Hero";
import PopularSkill from "../../components/popularSkill/PopularSkill";
import TopMessage from "../../components/topMessage/TopMessage";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <TopMessage></TopMessage>
      <PopularSkill></PopularSkill>
    </div>
  );
};

export default Home;
