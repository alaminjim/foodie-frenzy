import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Login from "../Pages/Login/Login";
import SocialLogin from "../Pages/Social/SocialLogin";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    }
  }, [loading, user]);

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background blur */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowLoginModal(false);
                navigate("/");
              }}
            ></div>

            {/* Modal */}
            <div
              className="relative bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] rounded-xl p-8 w-full max-w-[480px] border-4 border-amber-700/30 shadow-[0_0_30px] shadow-amber-500/30 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/");
                }}
                className="absolute top-3 right-3 text-amber-500 hover:text-amber-300 text-3xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-amber-400 mb-4 text-center">
                Foodie-Frenzy Login
              </h2>

              {/* Login form */}
              <Login
                onSuccess={() => {
                  setShowLoginModal(false);
                  navigate(location.pathname);
                }}
              />

              <div className="my-4 flex items-center">
                <hr className="flex-grow border-amber-700" />
                <span className="px-3 text-amber-300 text-sm">OR</span>
                <hr className="flex-grow border-amber-700" />
              </div>

              <SocialLogin
                closeModal={() => {
                  setShowLoginModal(false);
                  navigate("/");
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return children;
};

export default PrivateRoute;
