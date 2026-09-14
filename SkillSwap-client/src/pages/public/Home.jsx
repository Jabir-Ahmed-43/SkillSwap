import CallToAction from "../../components/Call-To-Action/CallToAction";
import FeaturedMentors from "../../components/featuredMentors/FeatureMentors";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/how-it-works/HowItWorks";
import PopularSkill from "../../components/popularSkill/PopularSkill";
import TopMessage from "../../components/topMessage/TopMessage";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <TopMessage></TopMessage>
      <PopularSkill></PopularSkill>
      <FeaturedMentors></FeaturedMentors>
      <HowItWorks></HowItWorks>
      <CallToAction />
    </div>
  );
};

export default Home;
