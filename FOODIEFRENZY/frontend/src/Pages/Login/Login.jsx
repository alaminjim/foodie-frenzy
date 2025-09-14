import { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = ({ setShowLoginModal }) => {
  const { createUserLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUserLogin(email, password);
      const loginUser = result.user;
      setUser(loginUser);
      Swal.fire({
        title: "Login Successful",
        text: "User LoggedIn",
        icon: "success",
        confirmButtonText: "Cool",
      });
      navigate("/");
      setShowLoginModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  return (
    <div>
      {/* Login form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-amber-200 mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-[#2D1B0E]/80 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-amber-200 mb-1">Password</label>
          <input
            name="password"
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-[#2D1B0E]/80 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg shadow-md transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
