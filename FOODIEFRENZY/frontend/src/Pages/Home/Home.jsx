import { Helmet } from "react-helmet";
import AboutHome from "../../Components/AboutHome/AboutHome";
import Banner from "../../Components/Banner/Banner";
import OurHomeMenu from "../../Components/OurHomeMenu/OurHomeMenu";
import SpecialOffer from "../../Components/SpecialOffer";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Foodie-Frenzy</title>
        <meta name="description" content="Contact page of my website" />
      </Helmet>
      <Banner></Banner>
      <SpecialOffer></SpecialOffer>
      <AboutHome></AboutHome>
      <OurHomeMenu></OurHomeMenu>
    </div>
  );
};

export default Home;
