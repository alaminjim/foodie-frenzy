import { Helmet } from "react-helmet";
import CartPage from "../../Components/Cart/CartPage";

const Cart = () => {
  return (
    <div>
      <Helmet>
        <title>Foodie | Cart</title>
        <meta name="description" content="Contact page of my website" />
      </Helmet>
      <CartPage></CartPage>
    </div>
  );
};

export default Cart;
