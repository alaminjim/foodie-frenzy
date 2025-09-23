import { Helmet } from "react-helmet";
import OurMenu from "../../Components/MenuSection/OurMenu";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Foodie | Menu</title>
        <meta name="description" content="Contact page of my website" />
      </Helmet>
      <OurMenu></OurMenu>
    </div>
  );
};

export default Menu;
