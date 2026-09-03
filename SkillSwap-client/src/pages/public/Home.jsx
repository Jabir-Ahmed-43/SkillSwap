import skillPhoto from "../../assets/skillphoto.jpg";
import PopularSkill from "../../components/popularSkill/PopularSkill";
import TopMessage from "../../components/topMessage/TopMessage";

const Home = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen font-inter ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            alt="skill-photo-preview"
            src={skillPhoto}
            className="max-w-lg rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Learn From People <br></br>
              <span className="text-primary">Who've Been There.</span>
            </h1>
            <p className="py-6">
              Connect with experienced mentors, learn practical skills, and grow
              faster with personalized 1-on-1 guidance.
            </p>
            <div className="space-x-3">
              <button className="btn btn-primary rounded-2xl">
                Get Started
              </button>
              <button className="btn rounded-2xl">Become a Mentor</button>
            </div>
          </div>
        </div>
      </div>
      <TopMessage></TopMessage>
      <PopularSkill></PopularSkill>
    </div>
  );
};

export default Home;
