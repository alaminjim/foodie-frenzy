import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

const SocialLogin = ({ closeModal }) => {
  const { googleLogin, setUser } = useContext(AuthContext);

  const handleGoogle = () => {
    googleLogin()
      .then((result) => {
        const users = result.user;
        setUser(users);
        if (closeModal) return closeModal();
        toast.success("Login successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      {/* Google login button */}
      <button
        onClick={handleGoogle}
        className="w-full py-2 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-amber-50 rounded-lg shadow-md  transition font-medium"
      >
        <FcGoogle className="text-xl" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
