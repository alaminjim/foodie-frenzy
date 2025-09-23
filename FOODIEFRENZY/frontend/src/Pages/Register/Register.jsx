/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const Register = ({ setShowRegisterModal }) => {
  const { createUserRegister, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const result = await createUserRegister(email, password);

    const currentUser = result?.user;

    setUser(currentUser);

    Swal.fire({
      title: "Register Successful",
      text: "New User Registered",
      icon: "success",
      confirmButtonText: "Cool",
    });

    form.reset();
    setShowRegisterModal(false);
    navigate("/"); // Redirect after register
  };

  return (
    <div>
      <Helmet>
        <title>Foodie | Register</title>
        <meta name="description" content="Contact page of my website" />
      </Helmet>
      <form
        className="space-y-2.5 md:space-y-3 lg:space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-amber-200 mb-1 font-semibold">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="w-full px-5 py-3 rounded-lg bg-[#2D1B0E]/90 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-amber-200 mb-1 font-semibold">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full px-5 py-3 rounded-lg bg-[#2D1B0E]/90 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-amber-200 mb-1 font-semibold">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="w-full px-5 py-3 rounded-lg bg-[#2D1B0E]/90 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-lg shadow-md shadow-amber-600/40 hover:from-amber-300 hover:to-amber-500 transition-all font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
